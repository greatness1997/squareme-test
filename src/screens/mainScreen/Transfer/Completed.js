import React, { useState } from 'react'
import { Modal, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompletedCard from '../../../components/CompletedCard';
import AppButton from '../../../components/AppButtonBlue';
import { color } from '../../../constants/color';



const Completed = ({ navigation, route }) => {

    const completeData = route.params
    console.log(completeData, "fromroute")

    const data = {name: "Ademola Odetayo", RN: "22222222222", No: "123456789", seq: "11223456789", time: "12:00am", date: "12, Aug 2022", amount: "₦20,000.00"}

    return (
        <View style={{ flex: 1, marginTop: 40, marginLeft: 20, width: "90%" }}>

            <View style={{ flexDirection: "row", marginBottom: 20 }}>

                <View style={{ justifyContent: "center", marginLeft: 100, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "green" }}>Transfer Completed</Text>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10  }}>{data.amount}</Text>
                </View>
            </View>

            <CompletedCard data={data} />
            <AppButton title="Done" style={styles.botton} onPress={() => navigation.navigate("Home")} />
          
        </View>
    )
}

const styles = StyleSheet.create({
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 2,
        width: '100%',
        height: 50,
        marginTop: '2%',
        
    },
    input: {
        flex: 1
    },
    bankList: {
        padding: 8
    },
    botton: {
        backgroundColor: color.primary2,
        width: "100%",
        marginTop: 20
    }
})

export default Completed