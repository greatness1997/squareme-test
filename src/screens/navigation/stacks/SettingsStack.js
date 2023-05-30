import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../../mainScreen/Settings/Settings';




const Stack = createNativeStackNavigator();

const SettingsStack = () => {


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
            <Stack.Screen name='Settings' component={Settings} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default SettingsStack

