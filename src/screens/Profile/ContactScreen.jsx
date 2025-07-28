import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DetailsHeader from '../../components/DetailsHeader';

const ContactScreen = () => {
    const openDial = () => Linking.openURL('tel:+919064230170');
    const openEmail = () => Linking.openURL('mailto:support@ecoshudhra.in');

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <DetailsHeader title="Contact Us" />

            <View style={styles.card}>
                <Text style={styles.heading}>We're here to help!</Text>
                <Text style={styles.subText}>
                    Reach out to us with your queries, suggestions, or feedback. We aim to respond within 24 hours.
                </Text>

                <View style={styles.contactItem}>
                    <Ionicons name="call-outline" size={22} color={COLORS.primary} />
                    <TouchableOpacity onPress={openDial}>
                        <Text style={styles.contactText}>+91 90642 30170</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contactItem}>
                    <MaterialIcons name="email" size={22} color={COLORS.primary} />
                    <TouchableOpacity onPress={openEmail}>
                        <Text style={styles.contactText}>support@ecoshudhra.org</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contactItem}>
                    <Ionicons name="location-outline" size={22} color={COLORS.primary} />
                    <Text style={styles.contactText}>
                        PGJ2+P6V, Thakurnagar - Panchpota Rd, Uttar Seethi, Kolkata, West Bengal 700124, India
                    </Text>
                </View>

            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Keep Your City Clean</Text>
                <Text style={styles.signature}>Crafted with ❤️ in Kolkata, India</Text>
            </View>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.background,
    },
    card: {
        backgroundColor: '#1e1e1e',
        margin: 16,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        elevation: 4,
        gap: 20,
    },
    heading: {
        fontSize: 20,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    subText: {
        color: 'gray',
        fontSize: 14,
        fontFamily: FONTS.regular,
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    contactText: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: FONTS.medium,
        flexShrink: 1,
    },
    signature: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        fontFamily: FONTS.medium,
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'center',
        opacity: 0.7,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 20,
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        color: '#808080',
        fontFamily: FONTS.bold,
        fontSize: 40,
        lineHeight: 50,
    },
    signature: {
        paddingTop: 25,
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        fontFamily: FONTS.medium,
    }

});
