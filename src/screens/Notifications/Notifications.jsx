import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNotification } from '../../hooks/notification/useNotification';
import COLORS from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FONTS from '../../constants/fonts';
import { animation } from '../../constants';
import LottieView from 'lottie-react-native';
import RenderItem from './RenderItem';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

const Notifications = () => {
  const { getNotifications, deleteNotifications } = useNotification();
  const [refreshing, setRefreshing] = useState(false);
  const { notifications } = useSelector(state => state.notification);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async (refresh = false) => {
    setLoading(true);
    await getNotifications();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNotifications();
    setRefreshing(false);
  }

  const handleDelete = async () => {
    setLoading(true);
    await deleteNotifications();
    setLoading(false);
  }


  useEffect(() => {
    fetchNotifications();
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        {
          notifications.length > 0 && <Button title={"Clear All"} buttonStyle={styles.clearButton} textStyles={{ fontSize: 13 }} handlePress={handleDelete} />
        }
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => <RenderItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary, COLORS.secondary, COLORS.green_400]}
            progressBackgroundColor={COLORS.background}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <LottieView
              source={animation.no_data}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.empty}>No notifications available.</Text>
          </View>
        }
      />

      {loading && <Loading visible={loading} />}

    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  icon: {
    paddingBottom: 3,
  },
  headerText: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  clearButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    minHeight: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  emptyView: {
    marginTop: '50%',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
});
