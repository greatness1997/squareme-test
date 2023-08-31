import React, { useState } from 'react'
import { Modal, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Complete } from '../../../constants/animation';
import Lottie from "lottie-react-native"



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ElectricityCard from '../../../components/ElectricityCard';
import AppButton from '../../../components/AppButtonBlue';
import { color } from '../../../constants/color';
import {s} from 'react-native-size-matters'




const ElectricityCompleted = ({ navigation, route }) => {

    const completeData = route.params
    console.log(completeData, "from completed")



    return (

        <View style={{ flex: 1, marginTop: s(40), marginLeft: s(15), width: "90%" }}>



            <View style={{ marginBottom: s(20), marginTop: 5, alignItems: "center" }}>

                <Lottie
                    source={Complete}
                    autoPlay
                    loop
                    style={styles.animation}
                />

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(10) }}>
                    <Text style={{ fontSize: s(13), fontWeight: "600", color: "green" }}>Payment Completed</Text>
                </View>
            </View>

            <ElectricityCard data={completeData} navigation={navigation} />
            {/* <AppButton title="Done" style={styles.botton} onPress={() => navigation.navigate("Home")} /> */}

        </View>
    )
}

const styles = StyleSheet.create({
  
    botton: {
        backgroundColor: color.primary2,
        width: "100%",
        marginTop: s(20)
    },
    animation: {
        position: "relative",
        width: 60,
        height: 60,
        backgrounColor: "green",
    }
})

export default ElectricityCompleted