import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { s } from "react-native-size-matters";
import { flag } from "../../../component/images";


const SignUp = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20) }}>
                <MaterialCommunityIcon name="arrow-left" size={25} color="black" />
                <Text style={{ fontSize: s(18), fontWeight: "600", color: "black" }}>Enter Your Phone Number</Text>
                <Text></Text>
            </View>

            <View style={{ paddingLeft: 60, paddingRight: 60, marginTop: s(20), alignItems: "center" }}>
                <Text style={{ fontSize: s(15), fontWeight: "600", color: "#4f4f4f", textAlign: "center" }}>
                    We’ll send an SMS with a code to
                    verify your phone number
                </Text>
            </View>

            <View style={{ flexDirection: "row", padding: s(20), alignItems: "center", marginTop: s(30) }}>
                <View style={styles.countryCode}>
                    <Image source={flag} style={{ width: s(20), height: s(30), marginRight: s(3), resizeMode: "contain" }} />
                    <Text style={{ fontSize: s(14), fontWeight: "600", color: "#828282" }}>+234</Text>
                    <MaterialCommunityIcon name="chevron-down" size={20} color="#828282" />
                </View>

                <View style={styles.number}>
                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor="#979797"
                        keyboardType="numeric"
                        style={{ marginLeft: s(10) }}
                    />
                </View>
            </View>

            <View style={styles.referal}>
                <Text style={{ fontSize: s(14), fontWeight: "500", color: "#9F56D4" }}>Have a referral ID?</Text>
                <MaterialIcons name="wallet-giftcard" size={s(20)} color="#9F56D4" />
            </View>

            <View style={{ marginTop: "80%" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Phone")} style={[styles.buttonContainer, { backgroundColor: "#000A4A" }]}>
                    <Text style={{ color: "white", fontWeight: "500" }}>Proceed</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: s(13), fontWeight: "500", color: "grey", alignSelf: "center", marginTop: s(10) }}>Already have an account?  <Text style={{ color: "#9F56D4" }}>Login here</Text></Text>
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
        width: "90%",
        height: s(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        marginLeft: s(20)
    },
});

export default SignUp;
