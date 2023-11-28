import React from "react";
import { Apartment, Bills, Welcome, Network } from "../constants/animation";
import Lottie from "lottie-react-native"
import { View } from 'react-native'

const LottieBills = ({ style }) => {
    return (
        <View style={[style]}>
            <Lottie source={Bills} autoPlay loop />
        </View>
    )
}

const LottieApartment = ({ style }) => {
    return (
        <View style={[style]}>
            <Lottie source={Apartment} autoPlay loop />
        </View>
    )
}

const LottieWelcome = ({ style }) => {
    return (
        <View style={[style]}>
            <Lottie source={Welcome} autoPlay loop />
        </View>
    )
}

const LottieNetwork = ({ style }) => {
    return (
        <View style={[style]}>
            <Lottie source={Network} autoPlay loop />
        </View>
    )
}

export { LottieBills, LottieApartment, LottieWelcome, LottieNetwork }