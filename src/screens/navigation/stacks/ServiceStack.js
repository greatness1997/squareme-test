import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../../mainScreen/Profile/Profile';
import Service from '../../mainScreen/Service';





const Stack = createNativeStackNavigator();

const ServiceStack = () => {


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
            <Stack.Screen name='All' component={Service} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default ServiceStack

