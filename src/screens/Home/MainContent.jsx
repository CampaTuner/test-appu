import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../../constants';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

const MainContent = () => {
    const navigate = useNavigation();
    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Explore new added Features ✨ </Text>
            {/* 🔹 Two Feature Cards Row */}
            <View style={styles.featureRow}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigate.navigate('Report')} style={styles.featureCard}>
                    <Image source={icons.dumpster} style={styles.icon} />
                    <Text style={styles.cardTitle}>Scan &{'\n'}Discover</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigate.navigate('Report')} style={styles.featureCard}>
                    <Image source={icons.discover} style={styles.icon} />
                    <Text style={styles.cardTitle}>Search &{'\n'}Discover</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.fullWidthCard} onPress={() => setShowAlert(true)}>
                <Image source={icons.rewards} style={styles.rewardIcon} />
                <View style={styles.rewardTextContainer}>
                    <Text style={styles.rewardTitle}>Get Reward & Earn</Text>
                    <Text style={styles.rewardSubtitle}>
                        Upload waste after it’s done and earn green points.
                    </Text>
                </View>
            </TouchableOpacity>
            <CustomAlert visible={showAlert} message="This Features are'nt Available!" onClose={() => setShowAlert(false)} />
        </View>
    );
};

export default MainContent;


const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 20,
    },
    wrapper: {
        marginTop: 20,
        paddingHorizontal: 0,
    },
    featureRow: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
    },
    featureCard: {
        backgroundColor: '#2b2b30',
        flex: 1,
        gap: 10,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        elevation: 3,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 14,
        textAlign: 'left',
        color: 'white',
        fontFamily: FONTS.medium,
        lineHeight: 15,
    },
    fullWidthCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2b2b30',
        borderRadius: 16,
        padding: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    rewardIcon: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginRight: 15,
    },
    rewardTextContainer: {
        flex: 1,

    },
    rewardTitle: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginBottom: 1,
    },
    rewardSubtitle: {
        fontSize: 13,
        fontFamily: FONTS.medium,
        color: 'white',
        lineHeight: 18,
    },
});
