import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {


    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

