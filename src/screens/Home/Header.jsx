import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Header = ({ avatar }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Left Section: Logo + Title */}
            <View style={styles.leftContainer}>
                <Image source={images.primaryLogo} style={styles.logo} />
                <Text style={styles.title}>EcoShudhra</Text>
            </View>

            {/* Right Section: Notification + Avatar */}
            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate("Profile")} style={styles.rightContainer}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily: FONTS.extraBold,
        paddingTop: 3,
    },
    logo: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
