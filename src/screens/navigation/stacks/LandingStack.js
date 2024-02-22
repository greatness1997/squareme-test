import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPageOne from '../../Onboarding/LandingPageOne';
import LandingPageTwo from '../../Onboarding/LandingPageTwo';
import LandingPageThree from '../../Onboarding/LandingPageThree';


const Stack = createNativeStackNavigator();

const LandingStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="landing"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="landing" component={LandingPageOne} />
            <Stack.Screen name="landingtwo" component={LandingPageTwo} />
            <Stack.Screen name="landingthree" component={LandingPageThree} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default LandingStack

