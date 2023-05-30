import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../../mainScreen/Profile/Profile';




const Stack = createNativeStackNavigator();

const ProfileStack = () => {


    return (
        <Stack.Navigator
            // initialRouteName="Home"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerTitle: '',
                headerBackTitleVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default ProfileStack

