import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../../constants'
import FONTS from '../../constants/fonts'
import COLORS from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const Categories = () => {
    const navigate = useNavigation();

    let categories = [
        { id: 1, name: 'Organic', image: icons.organic, link: "Report" },
        { id: 2, name: 'Inorganic', image: icons.inorganic, link: "Report" },
        { id: 3, name: 'Mixed', image: icons.mixed, link: "Report" },
    ]

    return (
        <View>
            <Text style={styles.sectionTitle}>Upload Wastes by Category 🗑</Text>
            <View style={styles.categoryGrid}>
                {categories.map((item, index) => (
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigate.navigate({
                        name: 'Report',
                        params: { type: item.name },
                        key: `Report-${item.name}`, // ← ensures unique screen
                    })}
                        key={index} style={styles.categoryCard}>
                        <Image source={item.image} style={styles.categoryIcon} />
                        <Text style={styles.categoryLabel}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 20,
    },
    categoryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    categoryCard: {
        width: '30%',
        height: 100,
        backgroundColor: COLORS.green_400,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        marginBottom: 5,
        borderRadius: 8,
    },
    categoryLabel: {
        fontSize: 12,
        fontFamily: FONTS.semiBold,
        color: 'white',
        textAlign: 'center',
    },
})