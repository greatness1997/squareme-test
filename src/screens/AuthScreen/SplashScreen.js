import React, { useEffect, useRef } from "react";
import { Image, View, Animated } from "react-native";
import { Logo } from "../../constants/images";

const Splash = ({ navigation }) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(( ) => {
        setTimeout(() => {
            startAnimation()
            navigation.navigate("login")
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
        <View style={{
            flex: 1,
            backgroundColor: "#060C27",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Animated.View style={[{ width: 100, height: 100 }, { transform: [
                { scale: animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[1,20]
                }) }
            ] }]}>
                <Image source={Logo} />
            </Animated.View>
        </View>
    )
}

export default Splash