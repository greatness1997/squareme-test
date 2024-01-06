import React, { useEffect, useRef } from "react";
import { Image, StatusBar, Dimensions, View, Animated, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LogoBlue, splash4 } from "../../../constants/images";
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import AppButton from "../../../components/AppButtonBlue";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { technology } from "../../../constants/images";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { LottieWelcome } from "../../../components/LottieView"


const LandingThree = ({ navigation }) => {

  const animation = useRef(new Animated.Value(0)).current;


  return (
    <>
      <StatusBar barStyle={Platform.select({ android: 'dark-content', ios: 'dark-content' })} />

      <View style={styles.container}>
        <Image source={technology} style={{ width: "90%", height: s(200), alignSelf: "center" }} />
        <View style={{ alignItems: "center", width: windowWidth, height: windowHeight / 3, padding: s(10) }}>
          <Text style={styles.text}>Technology</Text>
          <Text style={styles.text2}>

          Transformative educational experience integrates cutting-edge technology, enhancing engagement, fostering collaboration, and preparing students for a tech-driven future.
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: s(15), marginBottom: s(10), marginRight: 10 }}>2 of 3</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")} style={{ marginTop: s(0), width: s(30), height: s(30), backgroundColor: "black", borderRadius: s(50), justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons name="arrow-right" size={s(20)} color="white" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: s(300),
    resizeMode: "contain",
  },
  text: {
    color: "#49001b",
    fontSize: s(15),
    fontWeight: "bold",
    marginTop: 20,
  },
  text2: {
    color: "grey",
    fontSize: s(13),
    fontWeight: "400",
    lineHeight: s(20),
    textAlign: "center",
    padding: s(20)
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain"
  },
})

export default LandingThree