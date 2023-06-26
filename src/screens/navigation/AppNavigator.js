import React from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import AuthSatck from './stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingOne from '../AuthScreen/Landing/LandingOne';
import LandingStack from './stacks/LandingStack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
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
            <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

