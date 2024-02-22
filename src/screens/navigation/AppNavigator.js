import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingStack from './stacks/LandingStack';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {


    return (
        <Stack.Navigator
            initialRouteName="Landing"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Landing" component={LandingStack} />
            <Stack.Screen name="Login" component={AuthStack} />
            <Stack.Screen name="Home" component={HomeStack} />
            {/* <Stack.Screen name="Home" component={TabNavigator} /> */}
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

