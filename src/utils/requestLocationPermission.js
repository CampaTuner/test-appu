import { PermissionsAndroid, Platform } from 'react-native';

const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // TODO : iOS handled via Info.plist
            return true;
        }
    } catch (err) {
        console.error('Location permission error:', err);
        return false;
    }
};

export default requestLocationPermission;
