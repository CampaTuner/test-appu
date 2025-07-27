import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const Input = ({ title, value, editable=true, placeholder, handleChangeText, inputStyle, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = title === 'Password';

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        {editable ? (
          <TextInput
            style={[styles.input, inputStyle]}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={isPassword && !showPassword}
            multiline={false}
            scrollEnabled={false}
            textAlign="left"
            {...props}
          />
        ) : (
          <Text
            numberOfLines={1}
            style={[styles.input, inputStyle, { color: '#7b7b8b' }]}
            ellipsizeMode="tail"
          >
            {value}
          </Text>
        )}


        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#E5E5E5',
    fontWeight: '500',
    marginBottom: 6,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1C',
    borderWidth: 2,
    borderColor: '#2A2A2E',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    marginLeft: 8,
  },
});
