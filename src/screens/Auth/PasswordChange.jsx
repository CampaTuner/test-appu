import React, { useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import { useAuth } from '../../hooks/auth/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMessage } from '../../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';

const PasswordChange = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { email, token } = route.params || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword } = useAuth();

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            return dispatch(setMessage({ type: 'error', text: 'Please fill all fields' }));
        }

        if (newPassword !== confirmPassword) {
            return dispatch(setMessage({ type: 'error', text: 'Passwords do not match' }));
        }

        const success = await resetPassword(email, newPassword, token);

        if (success) {
            await AsyncStorage.removeItem('token');
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inner}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Change Password</Text>

                            <Input
                                title="New Password"
                                placeholder="Enter new password"
                                value={newPassword}
                                handleChangeText={setNewPassword}
                                otherStyles={styles.inputSpacing}
                                secureTextEntry
                            />

                            <Input
                                title="Confirm New Password"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                handleChangeText={setConfirmPassword}
                                otherStyles={styles.inputSpacing}
                                secureTextEntry
                            />

                            <View style={styles.buttonWrapper}>
                                <Button title="Update Password" handlePress={handleChangePassword} />
                            </View>

                            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                                <Text style={styles.cancelText}>Cancel and go back</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default PasswordChange;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    inner: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    form: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 26,
        color: '#fff',
        alignSelf: 'center',
        marginBottom: 32,
    },
    inputSpacing: {
        marginBottom: 16,
    },
    buttonWrapper: {
        marginTop: 10,
        marginBottom: 20,
    },
    cancelText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.primary,
        textAlign: 'center',
        marginTop: 8,
    },
});

