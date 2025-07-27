import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import requestCameraPermission from '../../utils/requestCameraPermission';
import requestLocationPermission from '../../utils/requestLocationPermission';
import getCurrentLocation from '../../utils/location';

import Input from '../../components/Input';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import { images } from '../../constants';
import { setMessage } from '../../redux/slices/uiSlice';
import { setLoading } from '../../redux/slices/garbageSlice';
import { setCitizen } from '../../redux/slices/authSlice';
import { uploadToCloudinary } from '../../utils/cloudinaryUpload';
import { useGarbage } from '../../hooks/garbage/useGarbage';
import Loading from '../../components/Loading';


const wasteTypes = ['Organic', 'Inorganic', 'Mixed'];

const initialState = {
  garbageUrl: '',
  description: '',
  location: { coordinates: [], address: '' },
  type: '',
};

const ReportScreen = () => {
  const scrollRef = useRef(null)
  const route = useRoute();
  let type = route.params?.type;

  const dispatch = useDispatch();
  const { citizen } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.garbage);

  const { garbageReport } = useGarbage();

  const [reportData, setReportData] = useState(initialState);
  const [photoUri, setPhotoUri] = useState(null);

  const [cameraPermission, setCameraPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  const updateReportField = (key, value) => {
    setReportData(prev => ({ ...prev, [key]: value }));
  };

  const updateLocation = (locationData) => {
    setReportData(prev => ({
      ...prev,
      location: {
        coordinates: locationData.coordinates,
        address: locationData.address,
      },
    }));
  };

  const initialAccess = async () => {
    try {
      setReportData(initialState);
      setPhotoUri(null);

      const camPerm = await requestCameraPermission();
      const locPerm = await requestLocationPermission();
      setCameraPermission(camPerm);
      setLocationPermission(locPerm);

      if (!locPerm) {
        return dispatch(setMessage({ type: 'error', text: 'Location permission denied' }));
      }

      const location = await getCurrentLocation();
      updateLocation(location);
    } catch (err) {
      dispatch(setMessage({ type: 'error', text: err.message || 'Location fetch failed' }));
    }
  };

  const onRefresh = async () => {
    console.log("fff");

    if (!locationPermission) {
      return dispatch(setMessage({ type: 'error', text: 'Location permission denied' }));
    }

    setReportData(prev => ({
      ...prev,
      location: { coordinates: [], address: '' },
    }));
    const location = await getCurrentLocation();
    updateLocation(location);
  };

  // Reset state when screen focuses
  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
      initialAccess();

      return () => {
        setReportData(initialState);
        setPhotoUri(null);
      };
    }, [type])
  );

  // In case you still need it on `type` change directly
  useEffect(() => {
    if (type) {
      setReportData(prev => ({ ...prev, type }));
    }
  }, [type]);



  const openCamera = async () => {
    if (!cameraPermission) {
      return dispatch(setMessage({ type: 'error', text: 'Camera permission not granted' }));
    }

    const result = await launchCamera({ mediaType: 'photo', cameraType: 'back', quality: 0.8 });
    if (result?.assets?.[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleReport = async () => {
    const { description, type, location } = reportData;

    if (!description.trim() || !type || location.coordinates.length < 2 || !photoUri) {
      return dispatch(setMessage({ type: 'error', text: 'Please complete all fields.' }));
    }

    if (description.trim().length <= 10) {
      return dispatch(setMessage({ type: 'error', text: 'Description must be at least 10 characters.' }));
    }

    if (citizen.todaysReportCount >= 1000) {
      return dispatch(setMessage({ type: 'error', text: 'Daily report limit (5) reached.' }));
    }

    try {
      dispatch(setLoading(true));
      const imageUrl = await uploadToCloudinary(photoUri);

      await garbageReport({ ...reportData, garbageUrl: imageUrl });

      dispatch(setCitizen({
        ...citizen,
        todaysReportCount: (citizen.todaysReportCount || 0) + 1,
      }));

      setReportData({
        ...initialState,
        location: reportData.location, // Preserve location data
      });
      setPhotoUri(null);
    } catch (err) {
      dispatch(setMessage({ type: 'error', text: 'Error submitting report.' }));
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.outer}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={images.garbage_report} style={styles.bannerImage} resizeMode="cover" />

        <View style={styles.card}>
          <Text style={styles.heading}>Report Garbage</Text>

          {/* Location Display */}
          <View style={styles.location}>
            <View style={styles.locationInput}>
              <Input
                title="Garbage Location"
                value={
                  reportData.location.address
                    ? reportData.location.address
                    : !locationPermission
                      ? "🚫 Location permission denied"
                      : "⌛ Fetching location..."
                }
                editable={false}
              />
            </View>
            <Button
              title="🔍"
              buttonStyle={{ marginTop: 10, borderWidth: 2, borderColor: COLORS.green_200 }}
              handlePress={onRefresh}
            />
          </View>


          {/* Description */}
          <Input
            title="Description"
            placeholder="Enter description..."
            value={reportData.description}
            onChangeText={(text) =>
              setReportData((prev) => ({ ...prev, description: text }))
            }
          />

          {/* Waste Type */}
          <Text style={styles.sectionTitle}>Select Waste Type</Text>
          <View style={styles.radioContainer}>
            {wasteTypes.map(option => (
              <TouchableOpacity key={option} style={styles.radio} onPress={() => updateReportField('type', option)}>
                <View style={styles.radioCircle}>
                  {reportData.type === option && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Capture Image */}
          <Button
            title={photoUri ? "🔁 Retake Image" : "📷 Capture Image"}
            buttonStyle={{ backgroundColor: COLORS.green_200 }}
            handlePress={openCamera}
          />

          {photoUri && (
            <Image source={{ uri: photoUri }} style={styles.imagePreview} resizeMode="cover" />
          )}

          {/* Submit */}
          <Button
            title="Submit Report"
            buttonStyle={{ marginTop: 15, backgroundColor: COLORS.green_200 }}
            handlePress={handleReport}
          />
        </View>
      </ScrollView>
      <Loading visible={loading} />
    </KeyboardAvoidingView >
  );
};

export default ReportScreen;
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingBottom: 100,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderRadius: 0,
    marginBottom: 10,
  },
  card: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: 'center',
  },
  location: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 5,
  },
  locationInput: {
    flex: 1,
  },
  grayText: {
    color: 'gray',
  },
  fakeInput: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1C',
    borderWidth: 2,
    borderColor: '#2A2A2E',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'white',
  },
  radioContainer: {
    marginVertical: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: 'white',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
});

