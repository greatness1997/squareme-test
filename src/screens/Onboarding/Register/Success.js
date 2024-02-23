import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Animated } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { s } from "react-native-size-matters";
import { success } from "../../../component/images";

const Success = ({ navigation }) => {
    const [animation] = useState(new Animated.Value(1)); 

    useEffect(() => {
        animateImage(); 
    }, []);

    const animateImage = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 0.5,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 500, 
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 0.5,
                duration: 500, 
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 500, 
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={success}
                style={[styles.image, { transform: [{ scale: animation }] }]}
            />

            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Verification successful!</Text>
                <Text style={styles.description}>Your phone number has been verified successfully.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Pin")}
                    style={[styles.button, { backgroundColor: "#000A4A" }]}
                >
                    <Text style={styles.buttonText}>Okay!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    image: {
        resizeMode: "contain",
        width: s(200),
        height: s(200),
        alignSelf: "center",
        marginTop: s(60),
    },
    title: {
        fontSize: s(15),
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        marginBottom: s(10),
    },
    description: {
        fontSize: s(13),
        fontWeight: "600",
        color: "#4f4f4f",
        textAlign: "center",
        marginBottom: s(20),
    },
    buttonContainer: {
        marginTop: "65%",
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "90%",
        height: s(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        backgroundColor: "#000A4A",
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
    },
});

export default Success;
