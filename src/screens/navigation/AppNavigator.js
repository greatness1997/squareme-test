import React from 'react'
import { StyleSheet } from 'react-native'
import TabNavigator from './TabNavigator'
import AuthSatck from './stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="login" component={AuthSatck} />
            <Stack.Screen name="Home" component={TabNavigator} />
            
            
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default AppNavigator

