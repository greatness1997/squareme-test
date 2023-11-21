import React, { useEffect, useRef } from "react";
import { Image, Dimensions, TouchableOpacity, View, Animated, SafeAreaView, Text, StyleSheet } from "react-native";
import { Logo, splash3 } from "../../../constants/images";
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import AppButton from "../../../components/AppButtonBlue";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LandingFour = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    // useEffect(( ) => {
    //     setTimeout(() => {
    //         startAnimation()
    //         navigation.navigate("LandingTwo")
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

        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: "black", fontSize: s(15), fontWeight: "500", marginBottom:s(10) }}>Ready...</Text>
            <TouchableOpacity onPress={next()} style={{ marginTop: s(0), width: s(60), height: s(60), backgroundColor: "#49001b", borderRadius: s(50), justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="arrow-right" size={s(30)} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        // width: "100%"
    },
    image: {
        width: windowWidth,
        height: windowHeight / 1.8,
    },
    text: {
        color: "white",
        fontSize: s(13),
        fontWeight: "bold",
        marginTop: 20,
    },
    text2: {
        color: "white",
        fontSize: s(12),
        fontWeight: "400",
        marginBottom: 5,
        marginTop: s(10),
        lineHeight: s(20)
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain"
    },
})

export default LandingFour