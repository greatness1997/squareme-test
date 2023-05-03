import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const activeTintColor = "black"

import HomeStack from './stacks/HomeStack';
import History from '../mainScreen/History';
import Settings from '../mainScreen/Settings';
import Profile from '../mainScreen/Profile';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const TabNavigator = () => {

    

    const hiddenTabRoutes = ['TransferValidate', 'TransferSummary'];

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor,
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="home" color="#120549" size={30} />
                    ),
                    headerShown: false,
                    tabBarStyle: ((route) => {
                      const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                      if (hiddenTabRoutes.includes(routeName)) {
                        return { display: "none" }
                      }
                      return
                    })(route),
                  })}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="chart-box" color="#120549" size={30} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="cog" color="#120549" size={30} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="account-circle" color="#120549" size={30} />
                    ),
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default TabNavigator

