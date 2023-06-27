import React, { useEffect, useRef } from "react";
import { Image, View, Animated, SafeAreaView, Platform, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import { Logo, ads1 } from "../../../constants/images";
import SwipeButton from "../../../components/SwipeButton";

const LandingThree = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    // useEffect(( ) => {
    //     setTimeout(() => {
    //         startAnimation()
    //         // navigation.navigate("login")
    //     }, 3000)
    // }, [])

    // const startAnimation = () => {
    //     Animated.timing(animation, {
    //         toValue: 1,
    //         duration:500,
    //         useNativeDriver: true
    //     }).start();
    // }

    const next = () => {
        navigation.navigate("login")
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                <View style={styles.logoContainer}>
                    <View style={styles.logoWrapper}>
                        <Image source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.logoWrapper2}>
                        <Image source={ads1} style={styles.logo2} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Seamless Payment</Text>
                    <Text style={styles.text2}>
                    Experience the magic of seamless payments with our innovative mobile app. Say goodbye to hassles and delays, and say hello to effortless transactions that fit right into your busy lifestyle. Embrace the future of payments and unlock a world of convenience today!
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={{ color: "white", paddingLeft: 20, marginTop: 10, fontSize: 15, fontWeight: "600" }}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={{ color: "white", paddingRight: 20, marginTop: 10, fontSize: 15, fontWeight: "600"}}>Next</Text>
                        </TouchableOpacity>
                        
                    </View>
                    { Platform.OS === "android" ? null : <SwipeButton title="Swipe to Login" onSwipeEnd={() => next()} style={{ marginLeft: 20, marginTop: 30, height: 65 }} />}
                </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#060C27",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    logoWrapper: {
        alignItems: "center",
    },
    logoWrapper2: {
        alignItems: "center",
        marginTop: 5
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain"
    },
    logo2: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: "10%",
        marginLeft: 20
    },
    text2: {
        color: "white",
        fontSize: 13,
        fontWeight: "400",
        marginBottom: 5,
        padding: 20
    },
})

export default LandingThree