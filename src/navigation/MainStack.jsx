import React, { useEffect, useRef, memo } from 'react';
import { StyleSheet, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import HomeScreen from '../screens/Home/HomeScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ReportsHistory from '../screens/ReportsHistory/ReportsHistory';
import Notifications from '../screens/Notifications/Notifications';

import COLORS from '../constants/colors';
import TabButton from '../components/TabButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportDetails from '../screens/ReportsHistory/ReportDetails';
import UserInfoScreen from '../screens/Profile/UserInfoScreen';
import ContactScreen from '../screens/Profile/ContactScreen';
import TermsAndConditionScreen from '../screens/Profile/TermsAndConditionScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabArr = [
    {
        route: 'Home',
        label: 'Home',
        type: Ionicons,
        activeIcon: 'home',
        inActiveIcon: 'home-outline',
        component: HomeScreen,
    },
    {
        route: 'Report',
        label: 'Report',
        type: MaterialCommunityIcons,
        activeIcon: 'file-document-edit',
        inActiveIcon: 'file-document-edit-outline',
        component: ReportScreen,
    },
    {
        route: 'History',
        label: 'History',
        type: MaterialCommunityIcons,
        activeIcon: 'history',
        inActiveIcon: 'history',
        component: ReportsHistory,
    },
    {
        route: 'Notifications',
        label: 'Alerts',
        type: Ionicons,
        activeIcon: 'notifications',
        inActiveIcon: 'notifications-outline',
        component: Notifications,
    },
    {
        route: 'Profile',
        label: 'Profile',
        type: FontAwesome6,
        activeIcon: 'user',
        inActiveIcon: 'user',
        component: ProfileScreen,
    },

];

const BottomTabs = () => {
    return <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
        }}
    >
        {TabArr.map((item, index) => (
            <Tab.Screen
                key={index}
                name={item.route}
                component={item.component}
                options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => <TabButton {...props} item={item} />,
                }}
            />
        ))}
    </Tab.Navigator>
}


const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Tabs" component={BottomTabs} />
        <Stack.Screen name="ReportDetails" component={ReportDetails} options={{ title: 'Report Details' }} />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{ title: 'User Info' }} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ title: 'Contact Details' }} />
        <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} options={{ title: 'Terms And Conditions' }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
    </Stack.Navigator>

);

export default MainStack;

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        borderTopWidth: 0,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    }
});
