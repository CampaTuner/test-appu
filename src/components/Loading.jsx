import { View, Modal, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';

const { width, height } = Dimensions.get('window');

const Loading = ({ visible }) => {
    if (!visible) return null;
    console.count("loadin");
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent={true}
        >
            <View style={styles.fullScreen}>
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </View>
        </Modal>
    );
};

export default Loading;

const styles = StyleSheet.create({
    fullScreen: {
        width,
        height: height + 50,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlay: {
        backgroundColor: COLORS.green_400,
        padding: 25,
        borderRadius: 16,
        elevation: 5,
    },
});
