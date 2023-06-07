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
import ElectricityVerify from './ElectricityVerify';


import "intl"
import "intl/locale-data/jsonp/en";



const ElectricitySummary = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false)

    const { data, image, value } = route.params

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <View style={{ flex: 1, marginTop: s(30), marginLeft: s(16), width: "90%" }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} />
                </TouchableWithoutFeedback>

                <Text style={{ fontSize: s(16), fontWeight: "600" }}>Electricity</Text>

                <View style={{ alignItems: "center" }}>
                    <Image source={image} style={styles.image} />
                </View>
            </View>



            <View style={styles.container}>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: s(0) }}>
                    <Text style={{ marginBottom: s(5), color: "#e66e54" }}>Meter account details</Text>
                    <Text style={{ fontSize: s(13), fontWeight: "600", paddingBottom: 5, color: color.colorSix }}>{data.response.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#3c68fa" }}>{data.response.account}</Text>
                </View>
                <View style={{ marginTop: s(20) }}>
                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: color.colorFour }}>RRN</Text>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: color.colorThree }}>{data.RN}</Text>
                    </View> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Phone Number</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{value.phoneNumber}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Amount</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{ `₦${format.format(value.amount)}` }</Text>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Fee</Text>
                        {/* <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{date}</Text> */}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                        <Text style={{ fontSize: s(13), fontWeight: "400", color: color.colorFour }}>Date</Text>
                        <Text style={{ fontSize: s(14), fontWeight: "600", color: color.colorThree }}>{date}</Text>
                    </View>

                </View>

            </View>


            <SwipeButton style={{ marginTop: s(35) }} onSwipeEnd={() => setModalVisible(true)} />
            <Modal
                visible={modalVisible}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.modalScreen}>
                    <View style={styles.transparentContainer}></View>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity style={styles.iconCont} onPress={() => setModalVisible(false)}>
                            <MaterialCommunityIcons name="close-circle" size={30} />
                        </TouchableOpacity>
                        <ElectricityVerify data={data} value={value} navigation={navigation} setModalVisible={setModalVisible} />
                    </View>
                </View>

            </Modal>
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
        marginTop: s(20),
        padding: 20
    },
    image: {
        position: "relative",
        // top: 20,
        // transform: [{ translateX: -s(50) }],
        // zIndex: 1,
        width: 70,
        height: 70
    },
    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(10),
        paddingTop: s(20),
        paddingBottom: s(200), // Adjust this value to shift the modal up or down
        top: s(0),
    },
})

export default ElectricitySummary