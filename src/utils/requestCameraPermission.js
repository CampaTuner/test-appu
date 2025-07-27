import { PermissionsAndroid, Platform } from 'react-native';

const requestCameraPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            // TODO :  iOS handled via Info.plist
            return true;
        }
    } catch (err) {
        console.error('Camera permission error:', err);
        return false;
    }
};

export default requestCameraPermission;
