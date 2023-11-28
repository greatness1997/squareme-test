import React, { useEffect } from "react"
import { View, Text, SafeAreaView } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from "react-native-reanimated"


const SIZE = 100

const test = () => {

    const progress = useSharedValue(1)
    const scale = useSharedValue(2)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            // borderRadius: (progress.value * SIZE) / 2,
            borderRadius: (progress.value * SIZE)/ 2,
            transform: [{ scale: scale.value }, { rotate: `${ progress.value * 2 * Math.PI }rad` }]
        }
    }, [])

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), 3, true)
        scale.value = withRepeat(withSpring(1), 3, true)

    },[])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
           <Animated.View style={[{ height: SIZE, width: SIZE, backgroundColor: "blue" }, animatedStyle]} />
        </View>
    )
}

export default test