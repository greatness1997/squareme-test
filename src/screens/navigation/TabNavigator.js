import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const activeTintColor = "black"


import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import colors from '../../component/Colors';

import HomeStack from './stacks/HomeStack';


const TabNavigator = () => {



    const hiddenTabRoutes = [
        
    ];

    const isTabBarVisible = (route) => {
        const routeName = route.state
          ? route.state.routes[route.state.index].name
          : route.params?.screen || 'Home';
    
        return !hiddenTabRoutes.includes(routeName);
      };

    return (
        <Tab.Navigator
          initialRouteName="Schedule"
          screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: 'white', height: Platform.OS === "ios" ? 100 : 60 },
            tabBarActiveTintColor: colors.color1,
            tabBarInactiveTintColor: colors.color2,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Schedule') {
                iconName = 'calendar-clock';
              } else if (route.name === 'Wallet') {
                iconName = 'wallet';
              } else if (route.name === 'Chatroom') {
                iconName = 'chat';
              } else if (route.name === 'Profile') {
                iconName = 'account';
              }
    
    
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarVisible: isTabBarVisible(route),
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      );
    
}

const styles = StyleSheet.create({

})

export default TabNavigator

