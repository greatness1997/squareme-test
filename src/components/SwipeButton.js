import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { color } from '../constants/color';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';


const BUTTON_WIDTH = s(320)
const BUTTON_HEIGHT = s(60)
const BUTTON_PADDING = s(8)
const SWIPER_DIMENSION = BUTTON_HEIGHT - 2 * BUTTON_PADDING

const H_WAVE_RANGE = SWIPER_DIMENSION * 2 * BUTTON_PADDING
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPER_DIMENSION



const SwipeButton = ({ onPress, onSwipeEnd, title, style }) => {

    const x = useSharedValue(0)

    const animatedGestureHandler = useAnimatedGestureHandler({
        onActive: (e) => {
            x.value = e.translationX;
        },

        onEnd: () => {
            if (x.value < BUTTON_WIDTH / 2 - SWIPER_DIMENSION / 2) {
                x.value = withSpring(0)
            } else {
                x.value = withSpring(H_SWIPE_RANGE)
                runOnJS(onSwipeEnd)();
            }
        }
    })
    const InterpolateXInpute = [0, H_SWIPE_RANGE]

    const animatedStyle = {
        swiper: useAnimatedStyle(() => {
            return {
                transform: [{ translateX: x.value }],
                backgroundColor: interpolateColor(x.value, [0, BUTTON_WIDTH - SWIPER_DIMENSION], [color.primary2, "#fff"]),
            }
        }),

        swiperText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    x.value, InterpolateXInpute,
                    [0.8, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(x.value, InterpolateXInpute, [
                            0,
                            BUTTON_WIDTH / 2 - SWIPER_DIMENSION,
                            Extrapolate.CLAMP
                        ])
                    }
                ]
            }
        }),

        colorWave: useAnimatedStyle(() => {
            return {
                width: H_WAVE_RANGE + x.value,
                opacity: interpolate(x.value, InterpolateXInpute, [0, 1])
            }
        }),
    }



    return (
        <View style={[styles.container, style]} onPress={onPress}>
            <AnimatedLinearGradient colors={[color.primary2, color.primary2]} start={{ x: 0.0, y: 0.5 }} end={{ x: 1.0, y: 0.5 }} style={[styles.colorWave, animatedStyle.colorWave]}>
                {/* <Animated.Text>Sending...</Animated.Text> */}
            </AnimatedLinearGradient>
            <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                <Animated.View style={[styles.swiper, animatedStyle.swiper]}>
                    <MaterialCommunityIcon name="arrow-right" size={25} color={color.colorFive} />
                </Animated.View>

            </PanGestureHandler>
            <Animated.Text style={[styles.swiperText, animatedStyle.swiperText]}>Swipe to Send</Animated.Text>
            {/* <Text style={styles.text}>{title}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: s(8),
        alignItems: 'center',
        backgroundColor: "white",
        width: BUTTON_WIDTH,
        borderRadius: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        justifyContent: "center",
        overflow: "hidden",
        borderColor: color.primary2
    },
    swiperText: {
        fontWeight: 'bold',
        // textTransform: 'uppercase',
        fontSize: s(14),
        color: color.primary2,
        zIndex: 2
    },
    swiper: {
        width: SWIPER_DIMENSION,
        height: SWIPER_DIMENSION,
        borderRadius: SWIPER_DIMENSION,
        backgroundColor: color.primary2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: s(8),
        zIndex: 3
    },
    colorWave: {
        position: "absolute",
        left: 0,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT,
        width: s(180)
    }
});


export default SwipeButton
