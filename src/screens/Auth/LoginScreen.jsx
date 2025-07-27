import {
  Image,
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
import { images } from '../../constants';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';

import { useAuth } from '../../hooks/auth/useAuth'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


  const handleLogin = async () => {
    let response = await login({ email, password })
    if (response) {
      navigation.replace('Otp', { email, type: 'login' });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

            <Image source={images.login} style={styles.image} resizeMode='cover' />

            <View style={styles.form}>
              <Text style={styles.title}>Welcome Back 👋</Text>

              <Input
                title="Email"
                placeholder="Enter email"
                value={email}
                handleChangeText={setEmail}
                otherStyles={styles.inputSpacing}
                keyboardType='email-address'
              />

              <Input
                title="Password"
                placeholder="Enter password"
                value={password}
                handleChangeText={setPassword}
                otherStyles={styles.inputSpacing}
                keyboardType='default'
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ForgetPassword')}
              >
                <Text style={styles.forget_password}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <Button title="Login" handlePress={handleLogin} />
              </View>

              <View style={styles.bottom}>
                <Text style={styles.bottom_first}>Don't have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.replace('Register')}
                >
                  <Text style={styles.bottom_last}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    justifyContent: 'center',
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: "30%",
    marginBottom: 30,
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 32,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  forget_password: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    textAlign: 'right',
    marginVertical: 8,
  },
  buttonWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_first: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#aaa',
  },
  bottom_last: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
  },
});
