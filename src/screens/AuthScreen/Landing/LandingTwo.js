import React, { useEffect, useRef } from "react";
import { Image, View, Animated, SafeAreaView, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Logo, adds2 } from "../../../constants/images";

const LandingTwo = ({ navigation }) => {

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

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.logoContainer}>
                    <View style={styles.logoWrapper}>
                        <Image source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.logoWrapper2}>
                        <Image source={adds2} style={styles.logo2} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Payment Simplified</Text>
                    <Text style={styles.text2}>
                    Simplify payments on-the-go with our powerful fintech app. Say goodbye to complex transactions and hello to effortless payments, making your life easier one tap at a time. 
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}>
                            <Text style={{ color: "white", paddingLeft: 20, marginTop: 0, fontSize: 15, fontWeight: "600" }}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("LandingThree")}>
                            <Text style={{ color: "white", paddingRight: 20, marginTop: 0, fontSize: 15, fontWeight: "600"}}>Next</Text>
                        </TouchableOpacity>

                    </View>
                </View>
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
        marginTop: 20
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },
    logo2: {
        width: 260,
        height: 260,
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
        marginBottom: 0,
        padding: 20
    },
})

export default LandingTwo