import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { gotv, dstv, startimes } from "../../../constants/images"
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
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cable Tv</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: s(35), marginLeft: s(20) }}>Choose a provider to continue</Text>
            <View style={{ flexDirection: "row", paddingRight: s(10), marginTop: s(15), marginLeft: s(15), width: "100%", }}>
                <TouchableOpacity onPress={() => navigation.navigate("TvValidation", {image: gotv, name: "gotv"})}>
                    <Image
                        source={gotv}
                        style={{ height: 80, width: 100, resizeMode: "cover" }}
                    />
                     <Text style={{ alignSelf: "center", marginLeft: "10%", marginTop: 10, fontWeight: "bold" }}>GOTV</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("TvValidation", {image: dstv, name: "dstv"})}>
                    <Image
                        source={dstv}
                        style={{ height: 80, width: 110, resizeMode: "cover", marginLeft: s(20), marginTop: 0 }}
                    />
                    <Text style={{ alignSelf: "center", marginLeft: "15%", marginTop: 10, fontWeight: "bold" }}>DSTV</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("StartimesValidation", {image: startimes, name: "startimes"})}>
                    <Image
                        source={startimes}
                        style={{ height: 80, width: 110, resizeMode: "cover", marginLeft: s(20) }}
                    />
                    <Text style={{ alignSelf: "center", marginLeft: "15%", marginTop: 10, fontWeight: "bold" }}>STARTIMES</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Provider

