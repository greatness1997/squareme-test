import React, { useEffect, useRef, useState } from "react";
import { Image, View, Animated } from "react-native";
import { Logo } from "../../../constants/images";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => {
            startAnimation()
            checkIfAppInstalledBefore();
            getData()
        }, 1000)
    }, [])


    const getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const data = JSON.parse(userData)
            if(userData){
                navigation.navigate("PersistLogin")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PersistLogin' }],
                  });
            }
        } catch (e) {
            console.log(e)
        }
    };


    const checkIfAppInstalledBefore = async () => {
        try {
            const hasAppInstalledBefore = await AsyncStorage.getItem('hasAppInstalledBefore');
            if (!hasAppInstalledBefore) {
                navigation.navigate("LandingOne")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LandingOne' }],
                  });
            } else {
                navigation.navigate("login")
            }
            await AsyncStorage.setItem('hasAppInstalledBefore', 'true');
        } catch (error) {
            console.error('Error checking app installation:', error);
        }
    };



    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#060C27",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Animated.View style={[{ width: 100, height: 100 }, {
                transform: [
                    {
                        scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 20]
                        })
                    }
                ]
            }]}>
                <Image source={Logo} />
            </Animated.View>
        </View>
    )
}

export default Splash