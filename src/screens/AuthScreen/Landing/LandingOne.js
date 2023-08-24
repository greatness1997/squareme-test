import React, { useEffect, useRef } from "react";
import { Image, Dimensions, View, Animated, SafeAreaView, Text, StyleSheet } from "react-native";
import { LogoBlue, splash4 } from "../../../constants/images";
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import AppButton from "../../../components/AppButtonBlue";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LandingOne = ({ navigation }) => {

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

  return (
    <View style={styles.container}>
      <Image source={splash4} style={styles.image} />
      <View style={{ width: windowWidth, height: windowHeight / 3, padding: s(10) }}>
        <Image source={LogoBlue} />
        <Text style={styles.text}>Seamless Payment</Text>
        <Text style={styles.text2}>
        Effortless Transactions: Experience smooth and seamless payments. Simplify your financial interactions with our user-friendly and efficient payment solutions.
        </Text>
        <AppButton title="Next" onPress={() => navigation.navigate("LandingTwo")} style={{ backgroundColor: "#1b2d56", marginTop: s(25) }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#060C27",
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
    color: "#1b2d56",
    fontSize: s(13),
    fontWeight: "bold",
    marginTop: 20,
  },
  text2: {
    color: "#707070",
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

export default LandingOne