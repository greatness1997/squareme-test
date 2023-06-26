
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { color } from "../constants/color"
import { Print, LogoBlue } from '../constants/images'
import AppButton from './AppButtonBlue'
import { s } from 'react-native-size-matters'
import moment from 'moment'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ViewShot from 'react-native-view-shot';
import Share from "react-native-share"

import "intl"
import "intl/locale-data/jsonp/en";


const ElectricityCard = ({ data }) => {
    const [showShareButton, setShowShareButton] = useState(true);

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    const ref = useRef();

    const captureImage = async () => {
        try {
            const uri = await ref.current.capture();
            await CameraRoll.save(uri, { type: 'photo', album: 'MyAppAlbum' })
            Alert.alert('Saved to Library');
        } catch (error) {
            console.log(error)
            Alert.alert('Failed to Library')
        }
    };

    const shareImage = async () => {
        try {
            const uri = await ref.current.capture();
            await Share.open({ url: uri })
        } catch (error) {
            console.log(error)
        }
    }

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <>
            <ViewShot ref={ref} >
                <View style={styles.container}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(5) }}>
                        <Text style={{ fontSize: s(13), fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.data.name}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.data.account}</Text>
                    </View>
                    <View style={{ marginTop: s(10) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Token</Text>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.data.token}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(15) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Units</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{data.data.units}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Amount</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{`₦${format.format(data.data.amount)}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Date</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{date}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Time</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{time}</Text>
                        </View>
                    </View>
                    <Image source={LogoBlue} style={{ marginTop: 15, alignSelf: "center" }} />
                </View>
            </ViewShot>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={styles.print} onPress={() => { setShowShareButton(false), shareImage() }}>
                    <Image source={Print} style={{ width: s(15), height: s(15) }} />
                </TouchableOpacity>
                <Text style={{ color: color.colorSeven, fontSize: s(11), fontWeight: "500" }}>Print Receipt</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: s(290),
        backgroundColor: "white",
        // alignItems: "center",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20
    },
    print: {
        width: s(35),
        height: s(35),
        borderWidth: 2,
        borderColor: color.colorSeven,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(40),
        marginTop: s(10),
        marginBottom: 10
    },

})

export default ElectricityCard