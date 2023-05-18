import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../mainScreen/HomeSreen';
import Validate from '../../mainScreen/Transfer/Validate';
import Summary from '../../mainScreen/Transfer/Summary';

import PinVerify from '../../mainScreen/Transfer/TransferPin'
import Completed from '../../mainScreen/Transfer/Completed';
import Provider from '../../mainScreen/Electricity/Provider';
import ElectricityValidation from '../../mainScreen/Electricity/ElectricityValidation';
import SelectNetwork from '../../mainScreen/Airtime&Data/SlectNetwork';
import AirtimeOrData from '../../mainScreen/Airtime&Data/AirtimeOrData'
import PaymentMethod from '../../mainScreen/PaymentMethod'
import AirtimeVerify from '../../mainScreen/Airtime&Data/AirtimeVerify';
import DataVerify from '../../mainScreen/Airtime&Data/DataVerify';


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
            <Stack.Screen name='Completed' component={Completed} />
            <Stack.Screen name='Provider' component={Provider} />
            <Stack.Screen name='ElectricityValidation' component={ElectricityValidation} />
            <Stack.Screen name='Airtime&Data' component={SelectNetwork} />
            <Stack.Screen name='AirtimeOrData' component={AirtimeOrData} />
            <Stack.Screen name='paymentmethod' component={PaymentMethod} />
            <Stack.Screen name='TransferPin' component={PinVerify} />
            <Stack.Screen name='AirtimeVerify' component={AirtimeVerify} />
            <Stack.Screen name='DataVerify' component={DataVerify} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeStack

