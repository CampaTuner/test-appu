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
    ScrollView,
    Image
} from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/uiSlice';
import { useAuth } from '../../hooks/auth/useAuth';

const ForgetPasswordScreen = ({ navigation }) => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { resendOtp: sendOtp } = useAuth()
    const [email, setEmail] = useState('');


    const handleForgetPassword = async () => {
        if (!email) {
            return dispatch(setMessage({ text: 'Please enter your email', type: 'error' }));
        }
        let response = await sendOtp(email);
        if (response) {
            navigate.replace('Otp', { email, type: 'forgetPassword' });
        }
        return

    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inner}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <Image source={images.forgetpassword} style={styles.image} resizeMode='cover' />

                        <View style={styles.form}>
                            <Text style={styles.title}>Forgot Password?</Text>
                            <Text style={styles.description}>
                                Enter your email address below and we'll send you instructions to reset your password.
                            </Text>

                            <Input
                                title="Email"
                                placeholder="Enter your email"
                                value={email}
                                handleChangeText={setEmail}
                                otherStyles={styles.inputSpacing}
                                keyboardType="email-address"
                            />

                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Send OTP"
                                    handlePress={handleForgetPassword}
                                />
                            </View>

                            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                                <Text style={styles.backToLogin}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    inner: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: "40%",
        marginBottom: 30,
        alignSelf: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 30,
    },
    form: {
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
        marginBottom: 24,
    },
    inputSpacing: {
        marginBottom: 20,
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    backToLogin: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.primary,
        textAlign: 'center',
    },
});
