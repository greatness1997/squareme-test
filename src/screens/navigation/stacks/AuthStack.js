import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../AuthScreen/Login';
import Register from '../../AuthScreen/Register';

const Stack = createNativeStackNavigator();

const AuthSatck = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerTitle: '',
                headerBackTitleVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default AuthSatck

