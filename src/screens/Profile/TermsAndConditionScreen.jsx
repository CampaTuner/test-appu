import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import DetailsHeader from '../../components/DetailsHeader';

const TermsAndConditionScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <DetailsHeader title="Terms & Conditions" />
            <View style={styles.content}>
                <Text style={styles.title}>1. Introduction</Text>
                <Text style={styles.text}>
                    Welcome to our application. By accessing or using the app, you agree to be bound by these Terms and Conditions.
                </Text>

                <Text style={styles.title}>2. User Responsibilities</Text>
                <Text style={styles.text}>
                    You agree not to misuse the app, submit false reports, or violate any applicable laws.
                </Text>

                <Text style={styles.title}>3. Data Usage</Text>
                <Text style={styles.text}>
                    We collect data to enhance user experience. Your information is protected under our privacy practices.
                </Text>

                <Text style={styles.title}>4. Termination</Text>
                <Text style={styles.text}>
                    We reserve the right to suspend or terminate accounts that violate our terms without prior notice.
                </Text>

                <Text style={styles.title}>5. Updates</Text>
                <Text style={styles.text}>
                    Terms may be updated occasionally. Continued use implies acceptance of revised terms.
                </Text>
            </View>
        </ScrollView>
    );
};

export default TermsAndConditionScreen;

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
        paddingLeft : 16,
        fontSize: 14,
        color: COLORS.white,
        fontFamily: FONTS.medium,
        lineHeight: 22,
    },
});
