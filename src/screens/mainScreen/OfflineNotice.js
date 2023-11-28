import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo'
import { LottieNetwork } from '../../components/LottieView';
import { s, vs } from "react-native-size-matters"
import { LogoBlue } from '../constants/images';

const OfflineNotice = () => {
    const netInfo = useNetInfo()

    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
        return (
            <>
                <StatusBar barStyle={Platform.select({ android: 'dark-content', ios: 'dark-content' })} />
                <View style={styles.container}>
                    {/* <Image source={LogoBlue} style={{ resizeMode: 'contain', width: s(70), height: vs(70) }} /> */}
                    <LottieNetwork style={{ width: s(300), height: s(300) }} />
                    <Text style={{ color: "black", fontWeight: "500", fontSize: s(13), textAlign: "center", paddingLeft: s(40), paddingRight: s(40) }}>Server can't be reached, Check your Internet Connection</Text>
                </View>
            </>
        );

    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontWeight: 'bold'
    }
})

export default OfflineNotice