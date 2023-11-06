import React from 'react'
import { View, ScrollView, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { eko, ikeja, abuja, ibadan, jos, port, kano, kaduna, enugu, benin } from "../../../constants/images"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { s } from 'react-native-size-matters'


const Provider = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: "row", marginTop: s(40), marginLeft: s(15) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} color="black" />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(95) }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Electricity</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: s(35), marginLeft: s(20), color: "black" }}>Choose a provider to continue</Text>
            <ScrollView>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: s(8), marginTop: s(20), width: "100%" }}>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: eko, name: "ekedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={eko} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Eko</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: ikeja, name: "ikedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={ikeja} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Ikeja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: abuja, name: "aedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={abuja} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Abuja</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: s(8), marginTop: s(0), width: "100%" }}>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: ibadan, name: "ibedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={ibadan} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Ibadan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: port, name: "phedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={port} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Portharcourt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: enugu, name: "eedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={enugu} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Enugu</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: s(8), marginTop: s(0), width: "100%" }}>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: kano, name: "kedco" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={kano} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Kano</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: jos, name: "jedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={jos} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Jos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: benin, name: "bedc" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={benin} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Benin</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexWrap: "wrap", justifyContent: "space-evenly", padding: s(8), marginTop: s(0), width: "100%" }}>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ElectricityValidation", { image: kaduna, name: "kadec" })}>
                        <View style={[styles.provider, styles.boxShadow]}>
                            <Image source={kaduna} />
                        </View>
                        <Text style={{ marginTop: s(5), fontWeight: "600" }}>Kaduna</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    provider: {
        width: s(100),
        height: s(70),
        backgroundColor: "white",
        borderRadius: s(10),
        alignItems: 'center',
        justifyContent: "center"
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: s(5),
    },
})

export default Provider

