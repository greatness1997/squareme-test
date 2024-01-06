import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const activeTintColor = "black"

import HomeStack from './stacks/HomeStack';
import HistoryStack from './stacks/HistoryStack';
import ServiceStack from './stacks/ServiceStack';
import ProfileStack from './stacks/ProfileStack';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';


const TabNavigator = () => {



    const hiddenTabRoutes = [
        'TransferValidate',
        'TransferSummary',
        'Completed',
        'Provider',
        'ElectricityValidation',
        'Airtime&Data',
        'AirtimeOrData',
        'paymentmethod',
        'GuarantorDetails',
        'PersonalDetails',
        'ProfileEdit',
        'Help',
        'ChangePassword',
        'ResetCode2',
        "UploadDoc",
        'ProviderTv',
        'VirtualAccount',
        'TvValidation',
        'StartimesValidation',
        'TvSummary',
        'Notification',
        'StartimesSum',
        'ResetCode2',
        'ResetCode3',
        'ChangePassword',
        'ChangePin',
        'AirtimeSummary',
        'DataSummary',
        'ElectricitySummary',
        'WalletHistory',
        'WalletHistoryList',
        'HistoryReceipt',
        'liveChat',
        'Settings',
        'AddBooks'
    ];

    const isTabBarVisible = (route) => {
        const routeName = route.state
          ? route.state.routes[route.state.index].name
          : route.params?.screen || 'Home';
    
        return !hiddenTabRoutes.includes(routeName);
      };

    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: 'black', height: Platform.OS === "ios" ? 100 : 60 },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'All') {
                iconName = 'cart-variant';
              } else if (route.name === 'History') {
                iconName = 'chart-box';
              } else if (route.name === 'Profile') {
                iconName = 'account-circle';
              }
    
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarVisible: isTabBarVisible(route),
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="All" component={ServiceStack} options={{ headerShown: false }} />
          <Tab.Screen name="History" component={HistoryStack} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      );
    
}

const styles = StyleSheet.create({

})

export default TabNavigator

