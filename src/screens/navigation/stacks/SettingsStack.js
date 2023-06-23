import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../../mainScreen/Settings/Settings';
import HelpCenter from '../../mainScreen/Settings/HelpCenter';
import ChangePassword from '../../mainScreen/Settings/ChangePassword';
import SendResetCode from '../../mainScreen/Settings/SendResetCode2';




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
            <Stack.Screen name='Help' component={HelpCenter} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='ResetCode2' component={SendResetCode} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default SettingsStack

