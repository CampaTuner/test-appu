import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DropdownItem = ({label, selected}) => {
    return (
        <View style={[styles.itemContainer, selected && styles.selectedContainer]}>
            <Text style={[styles.itemText, selected && styles.selectedText]}>{label}</Text>
            {selected && <AntDesign name="checkcircle" size={16} color="#4CAF50" />}
        </View>
    );
};

export default DropdownItem;

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#1a1a1d',
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedContainer: {
        backgroundColor: '#2b2b30',
    },
    itemText: {
        fontSize: 14,
        color: '#eee',
    },
    selectedText: {
        color: '#4CAF50',
        fontWeight: '600',
    },
});
