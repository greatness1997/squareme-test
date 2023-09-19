import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import History from '../../mainScreen/History/History';
import HistoryReceipt from '../../../components/HistoryReceipt';




const Stack = createNativeStackNavigator();

const HistoryStack = () => {


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
            <Stack.Screen name='History' component={History} />
            <Stack.Screen name='HistoryReceipt' component={HistoryReceipt} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HistoryStack

