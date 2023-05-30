import React, { useState, useEffect } from 'react'
import { Modal, Image, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'

import cred from '../../../config'
import axios from 'axios'

import SummaryCard from '../../../components/SummaryCard';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwipeButton from '../../../components/SwipeButton';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import moment from 'moment'
import { Print } from '../../../constants/images'
import { color } from '../../../constants/color';


import "intl"
import "intl/locale-data/jsonp/en";



const Summary = ({ navigation, route }) => {

    const data = route.params
   

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <View style={{ flex: 1, marginTop: s(60), marginLeft: s(16), width: "90%" }}>

            <View style={{ flexDirection: "row", marginBottom: s(35) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}> 
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(80), }}>
                    <Text style={{ fontSize: s(16), fontWeight: "500" }}>Airtime Summary</Text>
                </View>
            </View>
            <Image source={data.networkImage} style={styles.image}/>
           

            <View style={styles.container}>
            
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(20) }}>
                    {/* <Text style={{ fontSize: s(13), fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.data.name}</Text> */}
                    <Text style={{ fontSize: 16, fontWeight: "400", color: color.colorFive }}>{data.data.phoneNumber}</Text>
                </View>
                <View style={{ marginTop: s(20) }}>
                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>RRN</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.RN}</Text>
                    </View> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Amount</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{ `₦${format.format(data.data.amount)}` }</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Reference</Text>
                        {/* <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{data.data.reference}</Text> */}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Date</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{date}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Time</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{time}</Text>
                    </View>

                </View>
               
            </View>


            <SwipeButton  style={{ marginTop: s(35) }} onSwipeEnd={() => navigation.navigate("AirtimeVerify", { data: data })}/>
          
        </View>
    )
}

const styles = StyleSheet.create({
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: s(1),
        width: '100%',
        height: s(45),
        marginTop: '2%',
        
    },
    input: {
        flex: 1
    },
    bankList: {
        padding: s(6)
    },
    container: {
        position: "relative",
        width: "100%",
        height: s(250),
        backgroundColor: "white",
        // alignItems: "center",
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 10,
        padding: 20
    },
    image: {
        position: "absolute",
        top: 50,
        left: "60%",
        transform: [{ translateX: -s(50) }],
        zIndex: 1,
    }
})

export default Summary