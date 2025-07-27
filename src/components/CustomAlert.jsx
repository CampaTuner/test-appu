import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';

const { width, height } = Dimensions.get('window');

const CustomAlert = ({ visible, onClose, message = "Coming Soon!" }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            statusBarTranslucent={true} // important for full height
        >
            <View style={styles.fullScreen}>
                <View style={styles.container}>
                    <Text style={styles.icon}>⚠️</Text>
                    <Text style={styles.title}>Coming Soon</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Okay, Got it!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: height + 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    container: {
        backgroundColor: '#1f1f1f',
        borderRadius: 20,
        padding: 28,
        width: '80%',
        alignItems: 'center',
        elevation: 8,
    },
    icon: {
        fontSize: 40,
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: '#bbbbbb',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontWeight: '600',
        fontSize: 16,
    },
});
