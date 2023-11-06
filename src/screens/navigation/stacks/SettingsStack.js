import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from '../../mainScreen/Settings/Settings';
import HelpCenter from '../../mainScreen/Settings/HelpCenter';
import ChangePassword from '../../mainScreen/Settings/ChangePassword';
import ChangePin from '../../mainScreen/Settings/ChangePin';
import SendResetCode from '../../mainScreen/Settings/SendResetCode2';
import SendResetCode3 from '../../mainScreen/Settings/SendResetCode3';
import LiveChat from '../../mainScreen/Settings/LiveChat';




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
            <Stack.Screen name='ChangePin' component={ChangePin} />
            <Stack.Screen name='ResetCode2' component={SendResetCode} />
            <Stack.Screen name='ResetCode3' component={SendResetCode3} />
            <Stack.Screen name='liveChat' component={LiveChat} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default SettingsStack

