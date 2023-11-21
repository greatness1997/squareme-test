import React, { useEffect, useRef } from "react";
import { Image, StatusBar, Dimensions, View, Animated, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LogoBlue, splash4 } from "../../../constants/images";
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import AppButton from "../../../components/AppButtonBlue";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const LandingTwo = ({ navigation }) => {

  const animation = useRef(new Animated.Value(0)).current;


  return (
    <>
    <StatusBar barStyle={Platform.select({ android: 'dark-content', ios: 'dark-content' })} />
      <View style={styles.container}>
        <Image source={splash4} style={styles.image} />
        <View style={{ alignItems: "center", width: windowWidth, height: windowHeight / 3, padding: s(10) }}>
          <Text style={styles.text}>Apartments</Text>
          <Text style={styles.text2}>
            Secure and apartment of yours quickly anywhere in Nigeria on fix it easy and beat the stress from apartment agents
          </Text>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: s(15), marginBottom: s(10) }}>2 of 3</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LandingThree")} style={{ marginTop: s(0), width: s(60), height: s(60), backgroundColor: "#49001b", borderRadius: s(50), justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="arrow-right" size={s(30)} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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

export default LandingTwo