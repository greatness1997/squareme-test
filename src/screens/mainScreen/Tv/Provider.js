import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { gotv, dstv } from "../../../constants/images"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {s} from 'react-native-size-matters'

const Provider = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: "row", marginTop: s(40), marginLeft: s(15) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(95) }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Electricity</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: s(35), marginLeft: s(20) }}>Choose a provider to continue</Text>
            <View style={{ flexDirection: "row", padding: s(8), marginTop: s(10), marginLeft: s(15), width: "100%", }}>
                <TouchableOpacity onPress={() => navigation.navigate("ElectricityValidation", {image: gotv, name: "gotv"})}>
                    <Image
                        source={gotv}
                        style={{ height: 100, width: 100, resizeMode: "contain" }}
                    />
                     <Text style={{ alignSelf: "center", marginLeft: "10%", fontWeight: "bold" }}>GOTV</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ElectricityValidation", {image: dstv, name: "dstv"})}>
                    <Image
                        source={dstv}
                        style={{ height: 100, width: 100, resizeMode: "contain", marginLeft: s(20) }}
                    />
                    <Text style={{ alignSelf: "center", marginLeft: "15%", fontWeight: "bold" }}>DSTV</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Provider

