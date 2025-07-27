import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useGarbage } from '../../hooks/garbage/useGarbage';
import RenderItem from './RenderItem';
import COLORS from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { animation } from '../../constants';
import LottieView from 'lottie-react-native';
import FONTS from '../../constants/fonts';
import { setAllGarbages, setLoading } from '../../redux/slices/garbageSlice';
import Loading from '../../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportsHistory = () => {
  const dispatch = useDispatch();
  const { garbageHistory } = useGarbage()

  let { allGarbages, loading } = useSelector(state => state.garbage);
  const [refreshing, setRefreshing] = useState(false);

  const [query, setQuery] = useState({
    type: '',
    status: '',
    sort: '',
  })

  // initial data
  const getHistory = async () => {
    dispatch(setLoading(true))
    const reports = await garbageHistory();
    dispatch(setAllGarbages(reports))
    dispatch(setLoading(false))
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const reports = await garbageHistory();
    dispatch(setAllGarbages(reports))
    setRefreshing(false);
  }


  // filtered data
  const fetchFilteredData = async () => {
    const params = new URLSearchParams();

    if (query.status && query.status !== 'All') {
      params.append('status', query.status);
    }
    if (query.type && query.type !== 'All') {
      params.append('type', query.type);
    }

    if (query.sort && query.sort !== 'All') {
      params.append('sort', query.sort);
    }
    const queryString = params.toString();
    dispatch(setLoading(true))
    const reports = await garbageHistory(queryString);
    dispatch(setAllGarbages(reports))
    dispatch(setLoading(false))
  }


  useEffect(() => {
    fetchFilteredData()
  }, [query])

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.container}>
        <Header query={query} setQuery={setQuery} />

        <FlatList
          data={allGarbages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={allGarbages.length === 0 ? styles.emptyList : styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary, COLORS.secondary, COLORS.green_400]}
              progressBackgroundColor={COLORS.background}
            />
          }
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyView}>
                <LottieView
                  source={animation.no_data}
                  autoPlay
                  loop
                  style={{ width: 200, height: 200 }}
                />
                <Text style={styles.empty}>No Reports available.</Text>
              </View>
            )
          }
        />
      </View>
      {loading && <Loading visible={loading} />}
    </SafeAreaView>
  );
};

export default ReportsHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  list: {
    paddingBottom: 85,
  },
  emptyView: {
    marginTop: '50%',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: "gray",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});
