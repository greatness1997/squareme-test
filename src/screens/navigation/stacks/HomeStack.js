import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../mainScreen/HomeSreen';
import Provider from '../../mainScreen/Electricity/Provider';
import ElectricityValidation from '../../mainScreen/Electricity/ElectricityValidation';
import SelectNetwork from '../../mainScreen/Airtime&Data/SlectNetwork';
import Airtime from '../../mainScreen/Airtime&Data/Airtime'
import Data from '../../mainScreen/Airtime&Data/Data'
import AirtimeVerify from '../../mainScreen/Airtime&Data/AirtimeVerify';
import DataVerify from '../../mainScreen/Airtime&Data/DataVerify';
import LottieView from '../../../components/LottieView';
import AirtimeSummary from '../../mainScreen/Airtime&Data/AirtimeSummary'
import AirtimeCompleted from '../../mainScreen/Airtime&Data/AirtimeCompleted'
import DataSummary from '../../mainScreen/Airtime&Data/DataSummary';
import DataCompleted from '../../mainScreen/Airtime&Data/DataCompleted';
import ElectricitySummary from '../../mainScreen/Electricity/ElectricitySummary';
import ElectricityCompleted from '../../mainScreen/Electricity/ElectricityCompleted';
import ProviderTV from '../../mainScreen/Tv/Provider';
import TvValidation from '../../mainScreen/Tv/TvValidation';
import StartimesValidation from '../../mainScreen/Tv/Startimes';
import TvSummary from '../../mainScreen/Tv/TvSummary';
import TvCompleted from '../../mainScreen/Tv/TvCompleted';
import Notification from '../../mainScreen/Notification';
import StartimesSum from '../../mainScreen/Tv/StartimesSum';
import StartimesCompleted from '../../mainScreen/Tv/StartimesCompleted';
import VirtualAccount from '../../mainScreen/Profile/AgentOnboarding/VirtualAccount';
import WalletHistory from '../../mainScreen/WalletHistory';
import WalletHistoryList from '../../mainScreen/WalletHistoryList';
import TextBooks from '../../mainScreen/Books/TextBooks';
import AddBooks from '../../mainScreen/Books/AddBooks';
import ViewBooks from '../../mainScreen/Books/ViewBooks';


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
            <Stack.Screen name='Provider' component={Provider} />
            <Stack.Screen name='ElectricityValidation' component={ElectricityValidation} />
            <Stack.Screen name='Airtime&Data' component={SelectNetwork} />
            <Stack.Screen name='Airtime' component={Airtime} />
            <Stack.Screen name='Data' component={Data} />
            <Stack.Screen name='AirtimeVerify' component={AirtimeVerify} />
            <Stack.Screen name='DataVerify' component={DataVerify} />
            <Stack.Screen name='AirtimeSummary' component={AirtimeSummary} />
            <Stack.Screen name='AirtimeCompleted' component={AirtimeCompleted} />
            <Stack.Screen name='DataSummary' component={DataSummary} />
            <Stack.Screen name='ElectricitySummary' component={ElectricitySummary} />
            <Stack.Screen name='DataCompleted' component={DataCompleted} />
            <Stack.Screen name='ElectricityComplete' component={ElectricityCompleted} />
            <Stack.Screen name='ProviderTv' component={ProviderTV} />
            <Stack.Screen name='TvValidation' component={TvValidation} />
            <Stack.Screen name='TvSummary' component={TvSummary} />
            <Stack.Screen name='TvCompleted' component={TvCompleted} />
            <Stack.Screen name='StartimesValidation' component={StartimesValidation} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='StartimesSum' component={StartimesSum} />
            <Stack.Screen name='StartimesCompleted' component={StartimesCompleted} />
            <Stack.Screen name='VirtualAccount' component={VirtualAccount} />
            <Stack.Screen name='WalletHistory' component={WalletHistory} />
            <Stack.Screen name='WalletHistoryList' component={WalletHistoryList} />
            <Stack.Screen name='TextBooks' component={TextBooks} />
            <Stack.Screen name='AddBooks' component={AddBooks} />
            <Stack.Screen name='ViewBooks' component={ViewBooks} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeStack

