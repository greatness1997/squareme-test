
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { color } from "../constants/color"
import { Print } from '../constants/images'
import AppButton from './AppButtonBlue'



const CompletedCard = ({ data }) => {

    return (
        <>
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.No}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>RRN</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.RN}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Sequence</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.seq}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Time</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.time}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Date</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.date}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={styles.print}>
                            <Image source={Print} />

                        </TouchableOpacity>
                    <Text style={{ color: color.colorSeven, fontSize: 15, fontWeight: "500" }}>Print Reciept</Text>
                    </View>

                </View>
               
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 380,
        backgroundColor: "white",
        // alignItems: "center",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 40,
        padding: 20
    },
    print: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: color.colorSeven,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10
    },
    
})

export default CompletedCard