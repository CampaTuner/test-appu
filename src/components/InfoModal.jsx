import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const InfoModal = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Home');
  };
  
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Permission Required</Text>
          <Text style={styles.message}>
            Please go to settings and enable camera and location permissions to upload garbage.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: COLORS.green_400,
    padding: 20,
    borderRadius: 16,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
