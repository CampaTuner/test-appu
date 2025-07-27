import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../constants/colors';
import FONTS from '../../constants/fonts';
const SuccessReports = ({ reports }) => {

    return (
        <View>
            <Text style={styles.sectionTitle}>Your Previous Resolved Reports 🧾</Text>
            <View style={styles.reportsSection}>
                {
                    reports?.length > 0 ? reports?.slice(0, 5).map((report, id) => (
                        <TouchableOpacity key={id} style={styles.reportCard} activeOpacity={0.9}>
                            <AntDesign name="checkcircle" size={20} color="#4CAF50" style={styles.reportIcon} />
                            <View style={{ backgroundColor: '' }}>
                                <Text numberOfLines={1} style={styles.reportTitle}>{report.description}</Text>
                                <Text style={styles.reportDate}>{new Date(report.createdAt).toLocaleString()}</Text>
                            </View>
                        </TouchableOpacity>
                    )) : <View style={styles.noReports}><Text style={styles.noReportsText}>No reports found</Text></View>
                }
            </View>
        </View>
    )
}

export default SuccessReports

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 10,
    },
    reportsSection: {
        marginTop: 10,
    },
    reportCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#2b2b30',
        borderRadius: 10,
        padding: 12,
        paddingRight: 50,
        marginBottom: 12,
        width: '100%',
        elevation: 2,
    },
    reportIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    reportTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: "white",
    },
    reportDate: {
        fontSize: 12,
        color: COLORS.primary,
        marginTop: 4,
    },
    noReports: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    noReportsText: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: 'gray',
    }
})