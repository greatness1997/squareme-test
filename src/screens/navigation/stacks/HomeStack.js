import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../mainScreen/HomeCreen';
import Validate from '../../mainScreen/Transfer/Validate';
import Summary from '../../mainScreen/Transfer/Summary';


const Stack = createNativeStackNavigator();

const HomeStack = () => {


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
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='TransferValidate' component={Validate} options={{ tabBarVisible: false }} />
            <Stack.Screen name='TransferSummary' component={Summary} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeStack

