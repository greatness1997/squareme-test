import React, { useEffect, useRef } from "react";
import { Image, View, Animated, SafeAreaView, Text, StyleSheet } from "react-native";
import { Logo } from "../../../constants/images";

const LandingOne = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(( ) => {
        setTimeout(() => {
            startAnimation()
            navigation.navigate("LandingTwo")
        }, 3000)
    }, [])

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration:500,
            useNativeDriver: true
        }).start();
    }

    return (
        <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image source={Logo} style={styles.logo} />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Payment Simplified</Text>
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
      logo: {
        width: 120, 
        height: 120,
        resizeMode: "contain"
      },
      text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: "60%",
        marginLeft: 20
      },
})

export default LandingOne