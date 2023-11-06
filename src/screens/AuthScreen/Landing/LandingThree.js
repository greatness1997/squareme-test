import React, { useEffect, useRef } from "react";
import { Image, Dimensions, View, Animated, SafeAreaView, Text, StyleSheet } from "react-native";
import { Logo, splash3 } from "../../../constants/images";
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import AppButton from "../../../components/AppButtonBlue";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LandingThree = ({ navigation }) => {

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
      <Image source={splash3} style={styles.image} />
      <View style={{ width: windowWidth, height: windowHeight / 3, padding: s(10) }}>
        <Image source={Logo} />
        <Text style={styles.text}>We Care About You</Text>
        <Text style={styles.text2}>
        Your Wellbeing Matters: Our priority is your care and satisfaction. Count on us to prioritize your needs and provide exceptional support and services.
        </Text>
        <AppButton title="Let's Go!" onPress={next()} style={{ backgroundColor: "#707070", marginTop: s(25) }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#060C27",
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

export default LandingThree