import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingOne from '../../AuthScreen/Landing/LandingOne';
import LandingTwo from '../../AuthScreen/Landing/LandingTwo';
import LandingThree from '../../AuthScreen/Landing/LandingThree';
import Splash from '../../AuthScreen/Landing/SplashScreen';

const Stack = createNativeStackNavigator();

const LandingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerTitle: '',
                headerBackTitleVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name='SplashScreen' component={Splash} />
            <Stack.Screen name='LandingOne' component={LandingOne} />
            <Stack.Screen name='LandingTwo' component={LandingTwo} />
            <Stack.Screen name='LandingThree' component={LandingThree} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default LandingStack

