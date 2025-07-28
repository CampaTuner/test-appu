import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DetailsHeader from '../../components/DetailsHeader';
import COLORS from '../../constants/colors';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import FONTS from '../../constants/fonts';
import Button from '../../components/Button';
import getCurrentLocation from '../../utils/location';
import { setLoading, setMessage } from '../../redux/slices/uiSlice';
import { useAuth } from '../../hooks/auth/useAuth';
import { setCitizen } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/Feather';
const UserInfoScreen = () => {
    const { citizen } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { updateAddress } = useAuth()

    const [location, setLocation] = useState({
        state: '',
        district: '',
        address: '',
        city: '',
        pincode: '',
        coordinates: [0, 0],
    });

    const isLocationFilled = Object.values(location).every(
        (val) => val !== '' && val !== null
    );

    const handleGetLocation = async () => {
        try {
            dispatch(setLoading(true));
            const details = await getCurrentLocation();
            setLocation({
                state: details.state,
                district: details.district,
                address: details.address,
                city: details.city,
                pincode: details.postcode,
                coordinates: details.coordinates,
            });
        } catch (error) {
           dispatch(setMessage({ type: 'eorror', text: 'Error getting location' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUpdateLocation = async () => {
        const { state, district, address, city, pincode, coordinates } = location;

        if (!state || !district || !address || !city || !pincode || !coordinates) {
            dispatch(setMessage({ type: 'error', text: 'Please fill all the fields.' }));
            return;
        }

        let response = await updateAddress(location)
        if (response) {
            dispatch(setCitizen({
                citizen: {
                    ...citizen,
                    location: location,
                    isLocationUpdated: true
                },
            }));
            dispatch(setMessage({ type: 'success', text: 'Location updated successfully.' }));
        }
    };

    useEffect(() => {
        if (citizen.location && citizen.isLocationUpdated) {
            setLocation({
                state: citizen.location.state || '',
                district: citizen.location.district || '',
                address: citizen.location.address || '',
                city: citizen.location.city || '',
                pincode: citizen.location.pincode || '',
                coordinates: citizen.location.coordinates || [0, 0],
            });
        }
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <DetailsHeader title="User Details" />

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <View style={styles.inputGroup}>
                    <Input value={citizen.name} title="Name" editable={false} inputStyle={{ color: 'gray' }} />
                    <Input value={citizen.phone} title="Phone" editable={false} inputStyle={{ color: 'gray' }} />
                    <Input value={citizen.email} title="Email" editable={false} inputStyle={{ color: 'gray' }} />
                </View>
            </View>

            <View style={[styles.card, { marginVertical: 20 }]}>
                <Text style={styles.sectionTitle}>Home Location</Text>

                <KeyboardAvoidingView style={styles.inputGroup}>
                    <Input editable={!citizen.isLocationUpdated} title="State" placeholder={"Enter State"} value={location.state} onChangeText={(text) => setLocation({ ...location, state: text })} />
                    <Input editable={!citizen.isLocationUpdated} title="District" placeholder={"Enter District"} value={location.district} onChangeText={(text) => setLocation({ ...location, district: text })} />
                    <Input editable={!citizen.isLocationUpdated} title="Address" placeholder={"Enter Home Address"} value={location.address} onChangeText={(text) => setLocation({ ...location, address: text })} />
                    <Input editable={!citizen.isLocationUpdated} title="City" placeholder={"Enter City"} value={location.city} onChangeText={(text) => setLocation({ ...location, city: text })} />
                    <Input editable={!citizen.isLocationUpdated} title="Pincode" placeholder={"Enter Pincode"} value={location.pincode} onChangeText={(text) => setLocation({ ...location, pincode: text })} />

                </KeyboardAvoidingView>

                {
                    !citizen.isLocationUpdated && (
                        <View style={styles.buttonGroup}>

                            {!isLocationFilled ? (
                                <Button title="Get Current Location" handlePress={handleGetLocation} />
                            )
                                : (
                                    <View style={styles.btnContainer}>
                                        <View style={styles.row}>
                                            <Icon name="alert-triangle" size={15} color={'orange'} style={styles.icon} />
                                            <Text style={styles.noteText}>
                                                You can update your location only once.
                                            </Text>
                                        </View>

                                        <Button title="Update Location" handlePress={handleUpdateLocation} />
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </View>
        </ScrollView>
    );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginBottom: 16,
    },
    inputGroup: {
        gap: 12,
    },
    buttonGroup: {
        marginTop: 20,
        gap: 12,
    },
    btnContainer: {
        marginVertical: 16,
        marginTop: 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        marginRight: 8,
    },
    noteText: {
        color: 'orange',
        fontSize: 14,
    },
});
