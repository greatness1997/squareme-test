import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Home/HomeScreen';


const Stack = createNativeStackNavigator();

const HomeStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default HomeStack

