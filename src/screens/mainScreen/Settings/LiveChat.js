import React, { useState } from 'react'
import { StyleSheet, Linking, Alert, Text, View, ImageBackground, TouchableWithoutFeedback, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { airtel, mtn, glo, whatsapp, livechat, call, mail } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { s } from 'react-native-size-matters'
import { WebView } from 'react-native-webview';


const LiveChat = ({ navigation }) => {

    return (
        <>
            <View style={{ backgroundColor: "#00ab41", width: "100%", height: s(80), justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcon name="arrow-left" color="white" size={25} style={{ marginTop: s(20), marginLeft: s(10) }} />
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, width: "100%", marginBottom: s(20) }}>
                <WebView source={{ uri: 'https://tawk.to/chat/654536c4f2439e1631eb769f/1heb5rs9u' }}  />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: "90%",
        height: s(70),
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,

    },
    serviceContainer1: {
        width: "90%",
        height: s(70),
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        marginTop: s(8)
    },
    serviceContainer2: {
        width: "90%",
        height: s(50),
        borderRadius: 10,
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: s(8)
    }
})

export default LiveChat

