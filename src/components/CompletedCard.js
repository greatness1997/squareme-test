
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { color } from "../constants/color"
import { Print } from '../constants/images'
import AppButton from './AppButtonBlue'
import {s} from 'react-native-size-matters'
import moment from 'moment'



const CompletedCard = ({ data }) => {

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    return (
        <>
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(20) }}>
                    <Text style={{ fontSize: s(13), fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.data.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.data.account}</Text>
                </View>
                <View style={{ marginTop: s(20) }}>
                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>RRN</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.RN}</Text>
                    </View> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(15) }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Bank</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{data.summaryData.res.banks}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Amount</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{data.summaryData.res.amount}</Text>
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
                        <TouchableOpacity style={styles.print}>
                            <Image source={Print} />

                        </TouchableOpacity>
                    <Text style={{ color: color.colorSeven, fontSize: s(13), fontWeight: "500" }}>Print Reciept</Text>
                    </View>

                </View>
               
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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

export default CompletedCard