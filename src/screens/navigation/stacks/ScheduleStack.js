import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Request from '../../Schedule/Request';
import PickUp from '../../Schedule/PickUp';


const Stack = createNativeStackNavigator();

const ScheduleStack = () => {


    return (
        <Stack.Navigator
            initialRouteName="Schedule"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <Stack.Screen name="Schedule" component={Request} />
            <Stack.Screen name="PickUp" component={PickUp} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({

})

export default ScheduleStack

