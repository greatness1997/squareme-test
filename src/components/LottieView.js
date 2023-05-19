import React from "react";
import { Success } from "../constants/animation"; 
import Lottie from "lottie-react-native"

const LottieView = () => {
    return (
        <Lottie source={Success} autoPlay loop />
    )
}

export default LottieView