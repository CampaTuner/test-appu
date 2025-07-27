import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';

import {
    setCitizen,
    logoutCitizen
} from '../../redux/slices/authSlice';

import {
    setMessage,
    setLoading,
} from "../../redux/slices/uiSlice"

import {
    loginCitizenService,
    registerCitizenService,
    validateOtpService,
    logoutCitizenService,
    resendOtpCitizenService,
    resetPasswordCitizenService,
    addAddressCitizenService,
} from "../../services/authService";


export const useAuth = () => {
    const dispatch = useDispatch();

    const register = async (credentials) => {
        if (!credentials.email.trim() || !credentials.password.trim() || !credentials.name.trim() || !credentials.phone.trim()) {
            dispatch(setMessage({ text: "All fields are required.", type: 'error' }));
            return false;
        }
        try {
            dispatch(setLoading(true));
            await registerCitizenService(credentials);
            return true;
        } catch (error) {
            const msg = error?.response?.data?.message || 'Registration failed';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const login = async (credentials) => {
        if (!credentials.email.trim() || !credentials.password.trim()) {
            dispatch(setMessage({ text: "Email and password are required", type: 'error' }));
            return false;
        }

        try {
            dispatch(setLoading(true));
            await loginCitizenService(credentials);
            return true;
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || 'Login failed';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const validateOtp = async (otp, email, type) => {
        if (!otp.trim() || otp.length !== 6) {
            dispatch(setMessage({ text: "Enter a Valid 6 digit OTP", type: 'error' }));
            return false;
        }

        try {
            dispatch(setLoading(true));
            const response = await validateOtpService(otp, email);
            const { token, citizen } = response;

            if (type === 'login') {
                await AsyncStorage.setItem('token', token);
                dispatch(setCitizen({ citizen, token }));
                return true;
            }
            return token;
        } catch (error) {
            const msg = error?.response?.data?.message || 'OTP validation failed';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout = async () => {
        dispatch(setLoading(true));
        try {
            await logoutCitizenService();
        } catch (error) {
            useDispatch(setMessage({ text: "Logout failed but proceeding locally", type: 'error' }));
        } finally {
            dispatch(logoutCitizen());
            dispatch(setLoading(false));
        }
    };

    const resendOtp = async (email) => {
        try {
            dispatch(setLoading(true));
            await resendOtpCitizenService(email);
            dispatch(setMessage({ text: "OTP resent successfully", type: 'success' }));
            return true;
        } catch (error) {
            console.log(error);

            const msg = error?.response?.data?.message || 'Failed to resend OTP';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const resetPassword = async (email, newPassword, token) => {
        try {
            dispatch(setLoading(true));
            await resetPasswordCitizenService(email, newPassword, token);
            dispatch(setMessage({ text: "Password reset successfully", type: 'success' }));
            return true;
        } catch (error) {
            console.log(error.response);

            const msg = error?.response?.data?.message || 'Failed to reset password';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };
    const updateAddress = async (address) => {
        try {
            console.log(address);
            dispatch(setLoading(true));
            await addAddressCitizenService(address);
            dispatch(setMessage({ text: "Address updated successfully", type: 'success' }));
            return true;
        } catch (error) {
            console.log(error.response.data);
            const msg = error?.response?.data?.message || 'Failed to update address';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };


    return {
        register,
        login,
        validateOtp,
        logout,
        resendOtp,
        resetPassword,
        updateAddress

    }
}