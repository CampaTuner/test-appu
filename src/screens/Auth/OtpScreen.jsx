import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ScrollView
} from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import { useAuth } from '../../hooks/auth/useAuth'

const OtpScreen = ({ navigation, route }) => {
    const { email, type } = route.params || {};
    const [otp, setOtp] = useState('');
    const { validateOtp, resendOtp } = useAuth()

    const handleVerify = async () => {
        const token = await validateOtp(otp, email, type)
        if (type === 'forgetPassword') {
            navigation.replace('PasswordChange', { email, token })
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
                            <Text style={styles.title}>Enter OTP</Text>

                            {email && (
                                <Text style={styles.description}>
                                    A 6-digit code has been sent to <Text style={styles.email}>{email}</Text>
                                </Text>
                            )}

                            <Input
                                title="OTP"
                                placeholder="XXXXXX"
                                maxLength={6}
                                value={otp}
                                handleChangeText={setOtp}
                                otherStyles={styles.inputSpacing}
                                keyboardType="numeric"
                            />

                            <Button title="Verify OTP" handlePress={handleVerify} />

                            <TouchableOpacity onPress={async () => await resendOtp(email)} activeOpacity={0.7}>
                                <Text style={styles.resend}>
                                    Didn't get the code? <Text style={styles.resendBold}>Resend</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    );
};

export default OtpScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    inner: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    form: {
        marginTop: '50%',
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 8,
    },
    email: {
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    inputSpacing: {
        marginTop: 20,
        marginBottom: 20,
    },
    resend: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 16,
    },
    resendBold: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
    },
});

