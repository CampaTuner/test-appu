import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import DetailsHeader from '../../components/DetailsHeader';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <DetailsHeader title="Privacy Policy" />
            <View style={styles.content}>
                <Text style={styles.title}>1. Information Collection</Text>
                <Text style={styles.text}>
                    We collect personal information including name, phone number, email, and location data to provide our services.
                </Text>

                <Text style={styles.title}>2. Usage of Information</Text>
                <Text style={styles.text}>
                    Data is used to enable garbage reporting, personalize your experience, and improve our services.
                </Text>

                <Text style={styles.title}>3. Data Sharing</Text>
                <Text style={styles.text}>
                    We do not share your data with third parties except as required by law or to provide core services.
                </Text>

                <Text style={styles.title}>4. Security</Text>
                <Text style={styles.text}>
                    Your data is stored securely, and we use industry-standard practices to protect it.
                </Text>

                <Text style={styles.title}>5. User Rights</Text>
                <Text style={styles.text}>
                    You may request data deletion or access by contacting our support team.
                </Text>
            </View>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginTop: 16,
        marginBottom: 4,
    },
    text: {
        paddingLeft: 16,
        fontSize: 14,
        color: COLORS.white,
        fontFamily: FONTS.medium,
        lineHeight: 22,
    },
});
