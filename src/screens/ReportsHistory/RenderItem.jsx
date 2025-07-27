import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import COLORS from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { getIconByStatus } from './utils';



const RenderItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => navigation.navigate("ReportDetails", { id: item._id })}>
            <View style={styles.row}>
                {getIconByStatus(item.status)}
                <Text style={styles.type}>{item.type} Waste</Text>
            </View>
            <Text style={styles.municipality}>{item.assignedToMunicipality?.name || 'N/A'}</Text>
            <Text style={styles.address} numberOfLines={1}>{item.location?.address || 'Unknown Address'}</Text>
            <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
        </TouchableOpacity>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        // elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    address: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
    },
    municipality: {
        fontSize: 16,
        color: 'white',
        marginTop: 6,
    },
    timestamp: {
        fontSize: 12,
        color: COLORS.primary,
        marginTop: 4,
    },
});
