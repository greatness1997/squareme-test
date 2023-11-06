import React, { useRef, useState, useEffect } from 'react'
import { Image, View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native'


import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { color } from '../constants/color';
import "intl"
import "intl/locale-data/jsonp/en";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ViewShot from 'react-native-view-shot'
import Share from "react-native-share"
import moment from 'moment';

import { LogoBlue } from '../constants/images'

import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { mtn, airtel, nineMobile, glo } from "../constants/images"
import { ikedc, bedc, kadc, ekedc, eedc, abdc, kdc, phdc, aa, ibedc } from "../constants/images"


const HistoryReceipt = ({ navigation, route }) => {
    const { item } = route.params
    console.log(item)
    const [showShareButton, setShowShareButton] = useState(true);
    const ref = useRef();

    const date = moment(item.createdAt).format('DD MMM, YYYY')

    const time = moment(item.createdAt).format('h:mm A')

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
    }

    const shareImage = async () => {
        try {
            const uri = await ref.current.capture();
            await Share.open({ url: uri })
        } catch (error) {
            console.log(error)
        }
    }

    const airtime = [
        "mtnvtu",
        "airtelvtu",
        "glovtu",
        "9mobilevtu"
    ]

    const data = [
        "mtndata",
        "airteldata",
        "glodata",
        "9mobiledata"
    ]

    const electricity = [
        "ekedc",
        "ikedc",
        "ibedc",
        "eedc",
        "kedco",
        "phedc",
        "aedc",
        "kadec",
        "jedc"
    ]

    const cabletv = [
        "multichoice",
        "startimes",
    ]

    const transfer = [
        "transfer"
    ]

    const withrawal = [
        "withdrawal"
    ]

    return (
        <>
            <View style={{ flex: 1, marginTop: s(30), marginLeft: s(15), width: "90%" }}>

                <View style={{ marginBottom: s(20), marginTop: 0, alignItems: "center", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(10) }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left" size={s(22)} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: s(16), fontWeight: "600", color: "black" }}>Transaction Details</Text>
                    <Text></Text>
                </View>

                {/* summary container */}
                <ViewShot ref={ref} >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={{ fontSize: s(14), fontWeight: "bold", color: "#0b44bd" }}>{`₦${format.format(item.amount)}`}</Text>
                            <Text style={{ fontWeight: "bold", color: "#b1b1b1", marginTop: s(5), fontSize: s(12) }}>{date} {time}</Text>
                        </View>
                        <View style={{ marginTop: s(30), padding: s(0) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(10) }}>
                                {item.product === "withdrawal" ? <MaterialCommunityIcons name="credit-card-minus" size={s(25)} color="#896cfa" /> : item.product === "transfer" ? <Ionicons name="paper-plane" size={s(25)} color="#896cfa" /> : null}
                                {item.product === "mtnvtu" ? <Image source={mtn} style={{ width: s(30), height: s(30) }} /> : item.product === "glovtu" ? <Image source={glo} style={{ width: s(30), height: s(30) }} /> :
                                    item.product === "airtelvtu" ? <Image source={airtel} style={{ width: s(30), height: s(30) }} /> : item.product === "9mobilevtu" ? <Image source={nineMobile} style={{ width: s(30), height: s(30) }} />
                                        : null}
                                {item.product === "mtndata" ? <Image source={mtn} style={{ width: s(30), height: s(30) }} /> : item.product === "glodata" ? <Image source={glo} style={{ width: s(30), height: s(30) }} /> :
                                    item.product === "airteldata" ? <Image source={airtel} style={{ width: s(30), height: s(30) }} /> : item.product === "9mobiledata" ? <Image source={nineMobile} style={{ width: s(30), height: s(30) }} />
                                        : null}
                                {item.product === "ekedc" ? <Image source={ekedc} style={{ width: s(30), height: s(30) }} /> : item.product === "ikedc" ? <Image source={ikedc} style={{ width: s(30), height: s(30) }} /> :
                                    item.product === "ibedc" ? <Image source={ibedc} style={{ width: s(30), height: s(30) }} /> : item.product === "eedc" ? <Image source={eedc} style={{ width: s(30), height: s(30) }} /> : item.product === "phedc" ? <Image source={phdc} style={{ width: s(30), height: s(30) }} /> : item.product === "aedc" ? <Image source={abdc} style={{ width: s(30), height: s(30) }} /> :
                                        item.product === "jedc" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(25)} color="#896cfa" /> : item.product === "kedco" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(25)} color="#896cfa" /> : item.product === "kadec" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(25)} color="#896cfa" />
                                            : null}
                                {airtime.includes(item.product) ? <Text style={{ color: "#626562" }}>Airtime Purchase</Text> : data.includes(item.product) ? <Text style={{ color: "#626562" }}>Data Purchase</Text> : electricity.includes(item.product) ? <Text style={{ color: "#626562" }}>Electricity Purchase</Text> : cabletv.includes(item.product) ? <Text style={{ color: "#626562" }}>Cable TV Purchase</Text> : transfer.includes(item.product) ? <Text style={{ color: "#626562" }}>Fund Transfer</Text> : withrawal.includes(item.product) ? <Text style={{ color: "#626562" }}>withdrawal Made</Text> : null}
                                <Text style={{ color: item.status === "failed" ? "red" : "#00a020" }}>{item.status}</Text>
                            </View>
                            <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.5, marginTop: s(12) }}></View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                <Text style={{ color: "#aaaaaa" }}>Amount</Text>
                                <Text style={{ color: "#626562" }}>{`₦${format.format(item.amount)}`}</Text>
                            </View>
                            <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.5, marginTop: s(12) }}></View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                <Text style={{ color: "#aaaaaa" }}>Product</Text>
                                <Text style={{ color: "#626562" }}>{item.product}</Text>
                            </View>
                            <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.5, marginTop: s(12) }}></View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                <Text style={{ color: "#aaaaaa" }}>Beneficiary</Text>
                                <Text style={{ color: "#626562" }}>{item.account}</Text>
                            </View>
                            <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.5, marginTop: s(12) }}></View>

                            {item.product === "transfer" ? (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                    <Text style={{ color: "#aaaaaa" }}>Beneficiary Name</Text>
                                    <Text style={{ color: "#626562", flex: 1, marginLeft: s(10) }} numberOfLines={3} ellipsizeMode="tail">
                                        {item.response.beneficiaryAccountName || item.response.name}
                                    </Text>
                                </View>
                            ) : airtime.includes(item.product) ? (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                    <Text style={{ color: "#aaaaaa" }}>Description</Text>
                                    <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                        {item.response.transactionMessage || item.description}
                                    </Text>
                                </View>
                            ) : data.includes(item.product) ? (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                    <Text style={{ color: "#aaaaaa" }}>Description</Text>
                                    <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                        {item.response.transactionMessage || item.description}
                                    </Text>
                                </View>) : electricity.includes(item.product) ? (
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                        <Text style={{ color: "#aaaaaa" }}>Token</Text>
                                        <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                            {item.status === "successful" ? item.response.token : null}
                                        </Text>
                                    </View>) : cabletv.includes(item.product) ? (
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                            <Text style={{ color: "#aaaaaa" }}>Description</Text>
                                            <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                                {item.description}
                                            </Text>
                                        </View>) : (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                    <Text style={{ color: "#aaaaaa" }}>Description</Text>
                                    <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                        {item.description}
                                    </Text>
                                </View>)}
                            <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.7, marginTop: s(12) }}></View>

                            {electricity.includes(item.product) && (<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                <Text style={{ color: "#aaaaaa" }}>Units</Text>
                                <Text style={{ color: "#626562", flex: 1, marginLeft: s(10), }} numberOfLines={3} ellipsizeMode="tail">
                                    {item.status === "successful" ? item.response.units : null}
                                </Text>
                            </View>
                            )}
                            {electricity.includes(item.product) && <View style={{ backgroundColor: "#e0e0e0", width: "100%", height: 0.5, marginTop: s(12) }}></View>}

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(12) }}>
                                <Text style={{ color: "#aaaaaa" }}>Reference</Text>
                                <Text style={{ color: "#626562" }}>{item.reference}</Text>
                            </View>

                        </View>
                        <Image source={LogoBlue} style={{ marginTop: s(30), alignSelf: "center" }} />

                    </View>

                </ViewShot>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: s(25), marginBottom: s(10), position: "absolute", top: "80%", marginLeft: "5%" }}>
                <TouchableOpacity onPress={() => { setShowShareButton(false), shareImage() }} style={styles.print}>
                    <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#1b2d56" }}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => captureImage()} style={styles.done}>
                    <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#ffffff" }}>Print</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}




const styles = StyleSheet.create({
    container: {
        padding: s(15),
        backgroundColor: "#f2f1f6",
        height: "85%",
        width: "100%"
    },
    header: {
        backgroundColor: "#e5f1fd",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: s(7)
    },
    print: {
        backgroundColor: "#ffffff",
        width: "45%",
        padding: s(15),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(50),
        borderWidth: s(1),
        borderColor: '#1b2d56'
    },
    done: {
        backgroundColor: "#1b2d56",
        width: "45%",
        padding: s(15),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(50),
        borderWidth: s(1),
        borderColor: '#1b2d56'
    }
});

export default HistoryReceipt