import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../../mainScreen/Profile/Profile';
import ScreenOne from '../../mainScreen/Profile/AgentOnboarding/ScreenOne';
import ScreenTwo from '../../mainScreen/Profile/AgentOnboarding/ScreenTwo';
import ProfileEdit from '../../mainScreen/Profile/ProfileEdit';
import ChangePassword from '../../mainScreen/Settings/ChangePassword';
import UploadDoc from '../../mainScreen/Profile/AgentOnboarding/UploadDoc';
import VirtualAccount from '../../mainScreen/Profile/AgentOnboarding/VirtualAccount';




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
            <Stack.Screen name='PersonalDetails' component={ScreenOne} />
            <Stack.Screen name='GuarantorDetails' component={ScreenTwo} />
            <Stack.Screen name='ProfileEdit' component={ProfileEdit} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='UploadDoc' component={UploadDoc} />
            <Stack.Screen name='VirtualAccount' component={VirtualAccount} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default ProfileStack

