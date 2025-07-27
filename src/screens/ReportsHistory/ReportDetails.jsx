// screens/ReportsHistory/ReportDetails.js
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useGarbage } from '../../hooks/garbage/useGarbage';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/colors';
import { getIconByStatus, getIconByType } from './utils';
import FONTS from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailsHeader from '../../components/DetailsHeader';
import Loading from '../../components/Loading';

const ReportDetails = ({ route }) => {
    const dispatch = useDispatch();
    const { id } = route.params;
    const { garbageDetails } = useGarbage()
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const getDetails = async () => {
        setLoading(true)
        const response = await garbageDetails(id || "");
        setReport(response.data || false);
        setLoading(false)
    };


    useEffect(() => {
        getDetails();
        return () => setReport(null);
    }, [id]);




    return (
        <View style={styles.container}>
            <DetailsHeader title={"Details"} />
            {
                report ? (
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContent}>
                            <View style={styles.topSection}>
                                <Image source={{ uri: report.garbageUrl }} style={styles.image} />
                                <View style={styles.statusBadge}>
                                    {getIconByStatus(report.status)}
                                    <Text
                                        style={[
                                            styles.statusBadgeText,
                                            {
                                                color:
                                                    report.status === 'Pending' ? 'red'
                                                        : report.status === 'In Progress' ? '#FFC107'
                                                            : 'green',
                                            },
                                        ]}
                                    >
                                        {report.status}
                                    </Text>

                                </View>
                            </View>

                            <View style={styles.bottomSection} >
                                <View style={styles.row}>
                                    {getIconByType(report.type)}
                                    <Text style={styles.type}>{report.type} Waste</Text>
                                </View>

                                <View style={styles.dscription}>
                                    <View style={styles.descriptionTop}>
                                        <AntDesign name="filetext1" size={20} color="gray" />
                                        <Text style={styles.type}>Description</Text>
                                    </View>
                                    <Text style={styles.descText}>{report.description}</Text>
                                </View>

                                <View style={styles.metaData}>
                                    <View style={styles.metaDataTop}>
                                        <View style={styles.metaDataLeft}>
                                            <View style={styles.metaDataIcon}>
                                                <AntDesign name="calendar" size={20} color="gray" />
                                                <Text style={styles.type}>Reported At</Text>
                                            </View>
                                            <Text style={styles.metaDataText}>{new Date(report.createdAt).toLocaleString().split(',')[0]}</Text>
                                            <Text style={styles.metaDataText}>{new Date(report.createdAt).toLocaleString().split(' ')[1]}</Text>

                                        </View>
                                        <View style={styles.metaDataRight}>
                                            <View style={styles.metaDataIcon}>
                                                <AntDesign name="enviromento" size={20} color="gray" />
                                                <Text style={styles.type}>Address</Text>
                                            </View>
                                            <Text style={styles.metaDataText}>{report.location.address}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.metaDataTop, { paddingTop: 20, borderBottomWidth: 0, }]}>
                                        <View style={styles.metaDataLeft}>
                                            <View style={styles.metaDataIcon}>
                                                <AntDesign name="calendar" size={20} color="gray" />
                                                <Text style={styles.type}>Reported By</Text>
                                            </View>
                                            <View style={styles.bottomCard}>
                                                <Image source={{ uri: report.reportedBy.avatar }} style={styles.reporterImage} />
                                                <Text style={styles.bottomCardText}>{report.reportedBy.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.metaDataRight}>
                                            <View style={styles.metaDataIcon}>
                                                <AntDesign name="enviromento" size={20} color="gray" />
                                                <Text style={styles.type}>Assigned To</Text>
                                            </View>
                                            <View style={styles.bottomCard}>
                                                <MaterialCommunityIcons name="town-hall" size={40} color="gray" />
                                                <Text style={[styles.bottomCardText, { fontFamily: COLORS.regular }]}>{report.assignedToMunicipality.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>Keep Your City Clean</Text>
                                    </View>
                                    <Text style={styles.signature}>Crafted with ❤️ in Kolkata, India</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                ) : report === false && (
                    <View style={styles.noData}>
                        <Text style={styles.noDataText} >No data available</Text>
                    </View>
                )
            }
            {
                loading && <Loading visible={loading} />
            }
        </View>
    );
};

export default ReportDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,

    },
    scrollContent: {
        // paddingBottom: 30,
    },
    mainContent: {
    },
    topSection: {
        position: 'relative',

    },
    image: {
        width: '100%',
        height: 200,
    },
    statusBadge: {
        position: 'absolute',
        right: 10,
        top: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        color: COLORS.primary,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 7,

    },
    statusBadgeText: {
        fontFamily: FONTS.medium
    },
    bottomSection: {
        width: '100%',
        backgroundColor: COLORS.background,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 20
    },
    type: {
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    dscription: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.3,
        borderColor: 'white'
    },
    descriptionTop: {
        flexDirection: 'row',
        gap: 10,
    },
    descText: {
        marginTop: 5,
        paddingLeft: 30,
        color: 'white',
    },
    metaData: {
        backgroundColor: '',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    metaDataTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 0.3,
        borderColor: 'white'
    },
    metaDataLeft: {
        width: '50%',
    },
    metaDataRight: {
        backgroundColor: '',
        width: '50%',
    },
    metaDataIcon: {
        flexDirection: 'row',
        gap: 10,
    },
    metaDataText: {
        color: 'white',
        fontFamily: FONTS.regular,
        paddingLeft: 30,
    },
    reporterImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    bottomCard: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    bottomCardText: {
        fontFamily: FONTS.bold,
        color: 'white',
    },
    signature: {
        paddingTop: 25,
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
        fontFamily: FONTS.medium,
    },
    noData: {
        flex: 1 / 2,
        alignItems: "center",
        justifyContent: 'center'
    },
    noDataText: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: FONTS.extraLight
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 70,
    },
    footerText: {
        color: '#808080',
        fontFamily: FONTS.bold,
        fontSize: 40,
        lineHeight: 50,
    }

});
