import React from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { color } from "../constants/color"
import "intl"
import "intl/locale-data/jsonp/en";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



const SummaryCard = ({ data }) => {

    const fullName = data.tranRes.name; // "OTOKINA GREATNESS OMOKHAFE"

    const names = fullName.split(" "); // Split the full name by spaces

    const firstName = names[0]; // "OTOKINA"
    const lastName = names.slice(1, -1).join(" "); // "GREATNESS"
    const surname = names[names.length - 1];

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    const amount = parseFloat(data.res.amount); // Assuming `data.res.amount` is a number

    const updatedAmount = amount + 10; // Adding 10 to the amount

    const formattedAmount = format.format(updatedAmount);

    return (
        <>
            <View style={{ alignItems: "center", marginBottom: 10}}>
                <View style={{ width: 70, height: 70, backgroundColor: "lightgrey", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name="bank" size={35} color="#110449" />
                </View>
            </View>

            <View style={styles.container}>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.tranRes.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.tranRes.account}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Amount</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{`₦${format.format(data.res.amount)}`}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>Fee</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{`₦${format.format(10)}`}</Text>
                    </View>
                </View>
                <View style={{ width: "100%", height: 0.5, backgroundColor: color.colorFour, marginTop: 20 }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "400", color: color.colorFour }}>Total</Text>
                    <View style={{ width: 150, height: 50, backgroundColor: "#00000029", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorSeven }}>{`₦${formattedAmount}`}</Text>
                    </View>

                </View>


            </View>

            <View style={{ marginTop: 20, }}>
                <Text style={{ color: color.colorSeven, fontSize: 16, fontWeight: "600" }}>Save Beneficiary?</Text>
                <Switch
                    style={{ marginTop: 10 }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 300,
        backgroundColor: "white",
        // alignItems: "center",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
        padding: 20,
        position: "relative"
    }
})

export default SummaryCard