import React from 'react'
import { StyleSheet } from 'react-native'
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
        'Settings'
    ];

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
                        <MaterialCommunityIcons focused={focused} name="home-modern" color="#410018" size={s(28)} />
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
                name="All"
                component={ServiceStack}
                options={{
                    tabBarLabel: 'Service',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="cart-variant" color="#410018" size={s(28)} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="History"
                component={HistoryStack}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="chart-box" color="#410018" size={s(28)} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={({ route }) => ({
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons focused={focused} name="account-circle" color="#410018" size={s(28)} />
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

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default TabNavigator

