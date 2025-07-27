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
import Button from '../../components/Button';
import Input from '../../components/Input';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import { images } from '../../constants';
import { useAuth } from '../../hooks/auth/useAuth';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useAuth();

  const handleRegister = async () => {
    let response = await register({ name, email, phone, password });
    if (response) {
      navigation.replace('Login');
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
            <Image source={images.register} style={styles.image} resizeMode='cover' />

            <View style={styles.form}>
              <Text style={styles.title}>Create Account</Text>

              <Input
                title="Name"
                placeholder="Enter your name"
                value={name}
                handleChangeText={setName}
                otherStyles={styles.inputSpacing}
                keyboardType="default"
              />

              <Input
                title="Email"
                placeholder="Enter your email"
                value={email}
                handleChangeText={setEmail}
                otherStyles={styles.inputSpacing}
                keyboardType="email-address"
              />

              <Input
                title="Phone"
                placeholder="Enter your phone number"
                value={phone}
                handleChangeText={setPhone}
                otherStyles={styles.inputSpacing}
                keyboardType="phone-pad"
              />

              <Input
                title="Password"
                placeholder="Enter password"
                value={password}
                handleChangeText={setPassword}
                otherStyles={styles.inputSpacing}
                keyboardType="default"
              />

              <View style={styles.buttonWrapper}>
                <Button title="Register" handlePress={handleRegister} />
              </View>

              <View style={styles.bottom}>
                <Text style={styles.bottom_first}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')} activeOpacity={0.7}>
                  <Text style={styles.bottom_last}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    height: "15%",
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
    marginBottom: 12,
  },
  inputSpacing: {
    marginBottom: 16,
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
