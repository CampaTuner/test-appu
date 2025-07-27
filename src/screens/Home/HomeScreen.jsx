import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import COLORS from '../../constants/colors';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from './HeroSection';
import MainContent from './MainContent';
import Categories from './Categories';
import SuccessReports from './SuccessReports';
import { useGarbage } from '../../hooks/garbage/useGarbage';
import { Text } from 'react-native-animatable';
import FONTS from '../../constants/fonts';
import { useFocusEffect } from '@react-navigation/native';
import { setSuccessGarbages, setLoading } from '../../redux/slices/garbageSlice';
import Loading from '../../components/Loading';

const HomeScreen = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { garbageHistory } = useGarbage()

  const { citizen } = useSelector((state) => state.auth);
  const { successGarbages, loading } = useSelector((state) => state.garbage);

  const [refreshing, setRefreshing] = useState(false);

  const setTopFiveSuccessReports = async () => {
    let reports = await garbageHistory('status=Resolved');
    const topFive = reports
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
    reports.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).reverse().slice(0, 5);
    dispatch(setSuccessGarbages(topFive))
  }


  const fetchSuccessReports = async () => {
    dispatch(setLoading(true));
    await setTopFiveSuccessReports()
    dispatch(setLoading(false));
  }

  const onRefresh = async () => {
    await setTopFiveSuccessReports()
  }


  useEffect(() => {
    fetchSuccessReports(false)
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [])
  );

  return (
    <View style={styles.screen} >
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <Header avatar={citizen?.avatar} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary, COLORS.secondary, COLORS.green_400]}
            progressBackgroundColor={COLORS.background}
          />
        }
      >

        <View style={styles.mainContent}>
          <HeroSection />
          <MainContent />
          <Categories />
          <SuccessReports reports={successGarbages} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep Your City Clean ❤</Text>
        </View>
      </ScrollView>
      <Loading visible={loading} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 70,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    marginTop: 150,
  },
  footerText: {
    color: '#808080',
    fontFamily: FONTS.bold,
    fontSize: 40,
    lineHeight: 50,
  }
});




