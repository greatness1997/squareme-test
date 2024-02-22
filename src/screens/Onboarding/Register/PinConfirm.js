import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { s } from "react-native-size-matters";
import { flag } from "../../../component/images";

const PinConfirm = ({ navigation }) => {

    const [pin, setPin] = useState('');

    const handleNumberPress = (num) => {
        if (pin.length < 6) {
            setPin(pin + num);
        }
    };

    const handleDecimalPress = () => {
        if (!displayedValue.includes(".")) {
            setDisplayedValue(displayedValue + ".");
        }
    };

    const handleDeletePress = () => {
        setPin(pin.slice(0, -1));
    };

    useEffect(() => {
        if (pin.length === 6) {
            // Navigate to the other screen
            // For example:
            navigation.navigate('PinSuccess');
        }
    }, [pin, navigation]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", padding: s(20), marginTop: s(20) }}>
                <MaterialCommunityIcon name="arrow-left" size={25} color="black" />
                <Text style={{ fontSize: s(18), fontWeight: "600", color: "black", marginLeft: s(20) }}>Confirm Pin</Text>
                <Text></Text>
            </View>

            <View style={{ paddingLeft: s(30), paddingRight: s(30), marginTop: s(20) }}>
                <Text style={{ fontSize: s(15), fontWeight: "600", color: "#4f4f4f" }}>
                Input your six digit PIN again
                </Text>
            </View>

            <View style={styles.pinContainer}>
                {[...Array(6)].map((_, index) => (
                    <View key={index} style={styles.pinBox}>
                        <Text style={styles.pinText}>{pin[index]}</Text>
                    </View>
                ))}
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
                    <Text style={[styles.number1]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numPad} onPress={() => handleNumberPress("0")}>
                    <Text style={styles.number}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numPad} onPress={handleDeletePress}>
                    <MaterialCommunityIcon name="chevron-left" color="#BDBDBD" size={s(20)} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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
        color: "#000A4A",
        fontSize: s(20),
        fontWeight: "400"
    },
    number1: {
        color: "#BDBDBD",
        fontSize: s(25),
        fontWeight: "400"
    },
    naira: {
        color: "white",
        fontSize: s(20),
        fontWeight: "400"
    },

    pinContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: s(50),
        marginBottom: s(60)
    },
  
    pinBox: { 
        width: s(40), 
        height: s(50), 
        backgroundColor: "#f2f8ff", 
        borderRadius: s(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: s(2),
    },
    pinText: {
        color: "#000A4A",
        fontSize: s(18),
        fontWeight: 'bold'
    },
});

export default PinConfirm;
