import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import COLORS from '../../constants/colors'
import { Image } from 'react-native-animatable'
import FONTS from '../../constants/fonts'
import Item from './Item'
import { useAuth } from '../../hooks/auth/useAuth'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather';
import { images } from '../../constants'

const options = [
  { icon: 'user', name: 'User Info', location: 'UserInfoScreen', color: 'green' },
  { icon: 'bell', name: 'Notifications', location: 'Notifications', color: 'green' },
  { icon: 'clock', name: 'Report History', location: 'History', color: 'green' },
  { icon: 'mail', name: 'Contact Us', location: 'ContactScreen', color: 'green' },
  { icon: 'file-text', name: 'Terms and Condition', location: 'TermsAndConditionScreen', color: 'green' },
  { icon: 'shield', name: 'Privacy Policy', location: 'PrivacyPolicyScreen', color: 'green' },
  { icon: 'log-out', name: 'Logout', action: '', color: 'red' },
];

const ProfileScreen = () => {
  const scrollRef = useRef(null);
  const { citizen } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleItemPress = async (item) => {
    if (item.name === 'Logout') {
      await logout();
    } else if (item.location) {
      navigation.navigate(item.location);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [])
  );


  return (
    <View style={styles.screen}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={images.banner} style={styles.banner} />
          <Image source={{ uri: citizen.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.info}>
          <View style={styles.row}>
            <Icon name='phone' size={16} color={COLORS.primary} style={styles.iconInline} />
            <Text style={styles.phone}>+91 {" "}{citizen.phone}</Text>
          </View>

          <View style={styles.row}>
            <Icon name='mail' size={16} color={COLORS.primary} style={styles.iconInline} />
            <Text style={styles.email}>{citizen.email}</Text>
          </View>
        </View>

        <Text style={styles.name}>♻️ {' '}{citizen.name}</Text>

        <View style={styles.options}>
          {options.map((item, index) => (
            <Item key={index.toString()} item={item} onPress={() => handleItemPress(item)} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep Your City Clean ❤</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 70,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: 120,
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderColor: COLORS.background,
    borderWidth: 2,
    borderRadius: 50,
    top: 80,
    left: 10,
  },
  info: {
    width: '100%',
    height: 60,
    marginTop: 10,
    marginLeft: 120,
  },
  phone: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  email: {
    fontSize: 15,
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconInline: {
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    paddingLeft: 20,
    paddingTop: 5,
  },
  options: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  footer: {
    paddingTop: 100,
    paddingLeft: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  footerText: {
    color: '#808080',
    fontFamily: FONTS.bold,
    fontSize: 32,
    lineHeight: 40,
  },
});
