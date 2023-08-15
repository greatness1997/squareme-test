import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../AuthScreen/Login';
import Register from '../../AuthScreen/Register';
import Splash from '../../AuthScreen/Landing/SplashScreen';
// import PersistLogin from '../../AuthScreen/PersistLogin';
import AuthOTP from '../../AuthScreen/AuthOTP';
import TransactionPin from '../../AuthScreen/TransactionPin';
import SendResetCode from '../../AuthScreen/SendResetCode';
import ResetPassword from '../../AuthScreen/ResetPassword';
import Document from '../../AuthScreen/Document';
import UserDetail from '../../AuthScreen/UserDetails';
import CompleteDetails from '../../AuthScreen/CompleteDetails';

const Stack = createNativeStackNavigator();

const AuthSatck = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            headerMode={Platform.select({ ios: 'float', android: 'screen' })}
            screenOptions={() => ({
                headerTitle: '',
                headerBackTitleVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='login' component={Login} />
            {/* <Stack.Screen name='PersistLogin' component={PersistLogin} /> */}
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='authOTP' component={AuthOTP} />
            <Stack.Screen name='createPin' component={TransactionPin} />
            <Stack.Screen name='ResetCode' component={SendResetCode} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='Document' component={Document} />
            <Stack.Screen name='UserDetails' component={UserDetail} />
            <Stack.Screen name='CompleteDetails' component={CompleteDetails} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default AuthSatck

