import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageThree, imageSqm } from "../../component/images";
import { s } from "react-native-size-matters";
import Tabs from "../../component/Tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Octicons from "react-native-vector-icons/Octicons"

const KeyPad = ({ navigation }) => {
    const [displayedValue, setDisplayedValue] = useState("0");

    const handleNumberPress = (num) => {
        setDisplayedValue(displayedValue === "0" ? num : displayedValue + num);
    };

    const handleDecimalPress = () => {
        if (!displayedValue.includes(".")) {
            setDisplayedValue(displayedValue + ".");
        }
    };

    const handleDeletePress = () => {
        setDisplayedValue(displayedValue.slice(0, -1));
    };

    return (
        <>
            <View style={styles.container}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(20), marginBottom: s(20), padding: s(20) }}>
                    <TouchableOpacity onPress={() => console.log('QR Code pressed')}>
                        <MaterialIcons name="qr-code-scanner" size={s(22)} color="white" />
                    </TouchableOpacity>

                    <View style={{ width: s(120), height: s(60), backgroundColor: "#020d36", borderRadius: s(10), justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: s(11), fontWeight: "400" }}>Wallet Balance</Text>
                        <Text style={{ color: "white", fontSize: s(16), fontWeight: "600" }}>₦ 5,200</Text>
                    </View>

                    <TouchableOpacity onPress={() => console.log('Bell pressed')}>
                        <Octicons name="clock" size={s(22)} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" , justifyContent: "center", marginBottom: s(25) }}>
                    <Text style={styles.naira}>₦</Text>
                    <Text style={styles.display}>{displayedValue}</Text>
                </View>

                <View style={styles.numPadContainer}>
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity key={num} style={styles.numPad} onPress={() => handleNumberPress(num.toString())}>
                            <Text style={styles.number}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.numPadContainer}>
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity key={num} style={styles.numPad} onPress={() => handleNumberPress(num.toString())}>
                            <Text style={styles.number}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.numPadContainer}>
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity key={num} style={styles.numPad} onPress={() => handleNumberPress(num.toString())}>
                            <Text style={styles.number}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.numPadContainer}>
                    <TouchableOpacity style={styles.numPad} onPress={handleDecimalPress}>
                        <Text style={styles.number}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numPad} onPress={() => handleNumberPress("0")}>
                        <Text style={styles.number}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.numPad} onPress={handleDeletePress}>
                        <MaterialCommunityIcons name="chevron-left" color="white" size={s(18)} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: s(30) }}>
                    <View style={[styles.buttonContainer, { backgroundColor: "#28283a" }]}>
                        <Text style={{ color: "#747474", fontWeight: "500" }}>Request</Text>
                    </View>
                    <View style={[styles.buttonContainer, { backgroundColor: "#28283a" }]}>
                        <Text style={{ color: "#747474", fontWeight: "500" }}>Send</Text>
                    </View>
                </View>
                <Tabs navigation={navigation} keyPad={true} style={{ bottom: s(-30) }} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000221",
    },
    display: {
        color: "white",
        fontSize: s(60),
        fontWeight: "400",
        alignSelf: "center",
        marginLeft: s(5)
    },
    numPadContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: s(10)
    },
    numPad: {
        justifyContent: "center",
        alignItems: "center",
        width: s(60),
        height: s(60),
        borderRadius: s(40)
    },
    number: {
        color: "#BDBDBD",
        fontSize: s(20),
        fontWeight: "400"
    },
    naira: {
        color: "white",
        fontSize: s(30),
        fontWeight: "400"
    },
    buttonContainer: {
        width: s(120),
        height: s(42),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        marginHorizontal: s(10)
    }
});

export default KeyPad;
