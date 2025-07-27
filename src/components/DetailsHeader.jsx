import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FONTS from '../constants/fonts';

const DetailsHeader = ({ title }) => {

    const navigation = useNavigation();
    const { citizen } = useSelector(state => state.auth)

    return (
        <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.text}>{title}</Text>

            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Tabs', { screen: 'Profile' })} style={styles.profile}>
                <Image source={{ uri: citizen.avatar }} style={styles.avatar} />
            </TouchableOpacity>
        </View >
    )
}

export default DetailsHeader

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    text: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: 'white',

    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#ccc',
    },
})