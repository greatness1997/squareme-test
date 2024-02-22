import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../Auth/Login';
import SignUp from '../../Onboarding/Register/SignUp';
import Phone from '../../Onboarding/Register/Phone';
import Success from '../../Onboarding/Register/Success';
import Pin from '../../Onboarding/Register/Pin';
import PinConfirm from '../../Onboarding/Register/PinConfirm';
import PinSuccess from '../../Onboarding/Register/PinSuccess';

const Stack = createNativeStackNavigator();

const AuthStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="Login"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Phone" component={Phone} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="Pin" component={Pin} />
            <Stack.Screen name="PinConfirm" component={PinConfirm} />
            <Stack.Screen name="PinSuccess" component={PinSuccess} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AuthStack

