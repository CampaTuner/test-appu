import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import * as Haptics from 'react-native-haptic-feedback';

const Button = ({ title, handlePress, buttonStyle, textStyles }) => {

    const handlePressWithHaptics = () => {
        Haptics.trigger("impactHeavy", {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        });
        if (handlePress) {
            handlePress();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePressWithHaptics}
            activeOpacity={0.7}
            style={[styles.button, buttonStyle, styles.shadow]}
        >
            <Text style={[styles.text, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        borderRadius: 16,
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    shadow: {
        elevation: 8,
    },
});
