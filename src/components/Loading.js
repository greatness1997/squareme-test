import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import Lottie from 'lottie-react-native'
import { Loading } from '../constants/animation'
import { s } from 'react-native-size-matters'

const LoadingScreen = () => {
    return (
        <Modal
            visible={true}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modalScreen}>
                <View style={styles.transparentContainer}></View>
                <View style={styles.contentContainer}>
                    <View style={styles.notice}>
                        <Lottie
                            source={Loading}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    notice: {
        justifyContent: "center",
        alignItems: "center",
        padding: s(10)
    },
    animation: {
        position: "relative",
        width: s(170),
        height: s(170),
        backgrounColor: "green",
    },
    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        // backgroundColor: 'white',
        // borderTopLeftRadius: s(20),
        // borderTopRightRadius: s(20),
        // paddingHorizontal: s(10),
        // paddingVertical: s(10),
    },
})

export default LoadingScreen;