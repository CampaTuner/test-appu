import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const RenderItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.notificationCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ReportDetails', { id: item.redirectId })}
    >
      <View style={styles.topRow}>
        <View style={styles.iconText}>
          <AntDesign name="checkcircle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
          <Text style={styles.statusText}>Resolved</Text>
        </View>
        <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
      <Text style={styles.message} numberOfLines={2}>
        {item.message}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  notificationCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontFamily: FONTS.light,
  },
  message: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: FONTS.regular,
  },
});
