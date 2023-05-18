import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import { airtel, mtn, glo } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'

const SelectNetwork = ({ navigation }) => {

    const [activeBox, setActiveBox] = useState(null)

    // const handleBoxPress = (boxIndex) => {
    //     setActiveBox(boxIndex)
    // }

    const boxStyle = (boxIndex) => ({
        backgroundColor: activeBox === boxIndex ? "#0B44BD14" : "white"
    })

    const handleBoxPress = (boxIndex) => {
        setActiveBox(boxIndex);
    }


    return (
        <>
            <View>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Airtime & Data</Text>
                </View>
            </View>

            <Text style={{ marginTop: 60, marginLeft: 30, fontWeight: '600' }}>Choose your network</Text>


            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 10, marginTop: 0, width: "100%" }}>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle("mtn")]} onPress={() => handleBoxPress("mtn")}>
                    <Image source={mtn} style={{ width: 50, height: 50, marginTop: 5 }} />
                    <Text style={{ paddingTop: 10, fontWeight: "500" }}>MTN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle("glo")]} onPress={() => handleBoxPress("glo")} >
                    <Image source={glo} style={{ width: 50, height: 50, marginTop: 5 }} />
                    <Text style={{ paddingTop: 10, fontWeight: "500" }}>Glo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle("airtel")]} onPress={() => handleBoxPress("airtel")} >
                    <Image source={airtel} style={{ width: 50, height: 50, marginTop: 5 }} />
                    <Text style={{ paddingTop: 10, fontWeight: "500" }}>Airtel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle("mtn")]} onPress={() => handleBoxPress("mtn")} >
                    <Image source={mtn} style={{ width: 50, height: 50, marginTop: 5 }} />
                    <Text style={{ paddingTop: 10, fontWeight: "500" }}>9mobile</Text>
                </TouchableOpacity>
            </View>

            {/* <AppButton title="Confirm" onPress={() => navigation.navigate("AirtimeOrData")} style={{ width: "90%", marginLeft: 20, marginTop: "100%" }} /> */}
            <AppButton title="Confirm" onPress={() => navigation.navigate("AirtimeOrData", { network: activeBox })} style={{ width: "90%", marginLeft: 20, marginTop: "100%" }} />
           


        </>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: 80,
        height: 100,
        borderRadius: 10,
        alignItems: "center",
        padding: 5
    }
})

export default SelectNetwork

