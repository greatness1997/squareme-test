import React, { useState, useRef } from 'react'
import { Modal, Image, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableOpacity } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Complete } from '../../../constants/animation';
import Lottie from "lottie-react-native"



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompletedCard from '../../../components/CompletedCard';
import AppButton from '../../../components/AppButtonBlue';
import { color } from '../../../constants/color';
import { s } from 'react-native-size-matters'

import moment from 'moment'
import { Print } from '../../../constants/images'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ViewShot from 'react-native-view-shot';
import Share from "react-native-share"

import "intl"
import "intl/locale-data/jsonp/en";



const DataCompleted = ({ navigation, route, setModalVisible }) => {

    const [showShareButton, setShowShareButton] = useState(true);
    const ref = useRef();

    const data = route.params

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

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

    return (

        <View style={{ flex: 1, marginTop: s(60), marginLeft: s(15), width: "90%" }}>



            <View style={{ marginBottom: s(20), marginTop: 5, alignItems: "center" }}>

                <Lottie
                    source={Complete}
                    autoPlay
                    loop
                    style={styles.animation}
                />

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(10) }}>
                    <Text style={{ fontSize: s(13), fontWeight: "600", color: "green" }}>Transfer Completed</Text>
                </View>
            </View>

            {/* summary container */}
            <ViewShot ref={ref} >
                <View style={styles.container}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(20) }}>
                        {/* <Text style={{ fontSize: s(13), fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.data.name}</Text> */}
                        <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.data.account}</Text>
                    </View>
                    <View style={{ marginTop: s(20) }}>
                        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>RRN</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.RN}</Text>
                    </View> */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Amount</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{`₦${format.format(data.data.amount)}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Reference</Text>
                            {/* <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{data.data.reference}</Text> */}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Date</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{date}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Time</Text>
                            <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{time}</Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {showShareButton && (
                                <>
                                    <TouchableOpacity style={styles.print} onPress={() => { setShowShareButton(false), shareImage() }}>
                                        <Image source={Print} />
                                    </TouchableOpacity>
                                    <Text style={{ color: color.colorSeven, fontSize: s(13), fontWeight: "500" }}>Print Receipt</Text>
                                </>
                            )}
                        </View>

                    </View>

                </View>
            </ViewShot>

            <AppButton title="Done" style={styles.botton} onPress={() => navigation.navigate("Home")} />

        </View>
    )
}

const styles = StyleSheet.create({

    botton: {
        backgroundColor: color.primary2,
        width: "100%",
        marginTop: s(20)
    },
    animation: {
        position: "relative",
        width: 60,
        height: 60,
        backgrounColor: "green",
    },
    container: {
        width: "100%",
        height: s(320),
        backgroundColor: "white",
        // alignItems: "center",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 10,
        padding: 20
    },
    print: {
        width: s(40),
        height: s(40),
        borderWidth: 2,
        borderColor: color.colorSeven,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(40),
        marginTop: s(20),
        marginBottom: 10
    },
})

export default DataCompleted