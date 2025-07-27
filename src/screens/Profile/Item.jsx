import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

const Item = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.optionItem} activeOpacity={.9} onPress={onPress}>
            <Icon name={item.icon} size={20} color={item.color} style={styles.icon} />
            <Text style={[styles.optionText, item.color && { color: 'gray' }]}>{item.name}</Text>
            <Icon name="chevron-right" size={20} color="#bbb" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
    )
}

export default Item

const styles = StyleSheet.create({

    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#1e1e1e',
        marginTop: 10,
    },
    icon: {
        marginRight: 12,
        width: 30,
        textAlign: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },

})