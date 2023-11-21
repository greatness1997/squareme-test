import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Lottie from 'lottie-react-native'
import { Empty } from '../../../constants/animation'
import {s} from 'react-native-size-matters'

const NoHistory = ({ style }) => {
    return (
        <View style={[styles.notice, style]}>
            <Lottie
                source={Empty}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    notice: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    animation: {
        position: "relative",
        width: s(170),
        height: s(170),
        backgrounColor: "green",
    }
})

export default NoHistory;