import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import AuthSatck from './stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingOne from '../AuthScreen/Landing/LandingOne';
import LandingStack from './stacks/LandingStack';
import PersistLogin from '../AuthScreen/PersistLogin';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const [data, setData] = useState({})

    const getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const data = JSON.parse(userData)
            if(userData){
                setData(userData)
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getData()
    },[])

    return (
        <Stack.Navigator
            initialRouteName="LandingOne"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="LandingOne" component={LandingStack} />
            <Stack.Screen name="login" component={AuthSatck} />
            <Stack.Screen name="PersistLogin" component={PersistLogin} />
            <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

