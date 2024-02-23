import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { s } from "react-native-size-matters";
import { flag } from "../../../component/images";


const Phone = ({ navigation }) => {

    const [timer, setTimer] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                // Navigate when timer reaches zero
                navigation.navigate('Success');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, navigation]);

    const renderTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20) }}>
                <MaterialCommunityIcon name="arrow-left" size={25} color="black" />
                <Text style={{ fontSize: s(18), fontWeight: "600", color: "black" }}>Enter Your Phone Number</Text>
                <Text></Text>
            </View>

            <View style={{ paddingLeft: s(20), paddingRight: s(20), marginTop: s(20), alignItems: "center" }}>
                <Text style={{ fontSize: s(15), fontWeight: "600", color: "#4f4f4f", textAlign: "center" }}>
                    Please input the five digit code that was sent
                    to your phone number below
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center", width: "65%", justifyContent: "space-around", marginTop: s(40) }}>
                <View style={{ width: s(40), height: s(50), backgroundColor: "#f2f8ff", borderRadius: s(10) }}></View>
                <View style={{ width: s(40), height: s(50), backgroundColor: "#f2f8ff", borderRadius: s(10) }}></View>
                <View style={{ width: s(40), height: s(50), backgroundColor: "#f2f8ff", borderRadius: s(10) }}></View>
                <View style={{ width: s(40), height: s(50), backgroundColor: "#f2f8ff", borderRadius: s(10) }}></View>
                <View style={{ width: s(40), height: s(50), backgroundColor: "#f2f8ff", borderRadius: s(10) }}></View>
            </View>

            <View style={{ alignSelf: "center", marginTop: s(20) }}>
                <Text style={{ fontSize: s(15), fontWeight: "600", color: "#9f56d4", textAlign: "center" }}>{renderTimer()}</Text>
            </View>

            <View style={{ paddingLeft: s(40), paddingRight: s(40), marginTop: s(20), alignItems: "center" }}>
                <Text style={{ fontSize: s(15), fontWeight: "600", color: "#4f4f4f", textAlign: "center" }}>
                    Having trouble receiving SMS? <Text style={{ color: "#9f56d4" }}>Resend </Text>
                    Or try other options below
                </Text>
            </View>


            <View style={{ marginTop: "70%", flexDirection: "row", justifyContent: "space-between", paddingLeft: s(20), paddingRight: s(20) }}>
                <View style={[styles.buttonContainer1, { backgroundColor: "white" }]}>
                    <Text style={{ color: "#000a4a", fontWeight: "500" }}>Call me</Text>
                </View>
                <View style={[styles.buttonContainer, { backgroundColor: "#000a4a" }]}>
                    <Text style={{ color: "white", fontWeight: "500" }}>WhatsApp</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    countryCode: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "#d0d5dd",
        width: "32%",
        height: s(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginRight: s(10)
    },
    number: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "#d0d5dd",
        width: "66%",
        height: s(50),
        borderRadius: s(5)
    },
    referal: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "#d0d5dd",
        width: "90%",
        alignSelf: "center",
        height: s(50),
        borderRadius: s(5),
        justifyContent: "space-between",
        padding: s(15)
    },

    buttonContainer: {
        width: "48%",
        height: s(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
    },
    buttonContainer1: {
        width: "48%",
        height: s(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        borderWidth: 1,
        borderColor: "#000a4a"
    },
});

export default Phone;
