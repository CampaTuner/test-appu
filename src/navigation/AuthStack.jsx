import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from 'react'
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgetPasswordScreen from "../screens/Auth/ForgetPasswordScreen";
import OtpScreen from "../screens/Auth/OtpScreen";
import PasswordChange from "../screens/Auth/PasswordChange";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Otp' component={OtpScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
            <Stack.Screen name='PasswordChange' component={PasswordChange} />
        </Stack.Navigator>
    )
}

export default AuthStack
