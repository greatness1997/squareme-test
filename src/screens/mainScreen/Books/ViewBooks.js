import React, { useEffect, useState } from "react"
import { View, Modal, Alert, TouchableWithoutFeedback, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native"
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { airtime } from "../../../constants/images";
import { Formik } from 'formik';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"

import { useSelector } from 'react-redux'
import cred from '../../../config'
import axios from 'axios'

import "intl"
import "intl/locale-data/jsonp/en";

import AppButton from "../../../components/AppButtonBlue";

import moment from 'moment'



const ViewBooks = ({ navigation, route }) => {

    const { data } = route.params;

    const [loading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const { auth: { user } } = useSelector(state => state)
   

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    const purchaseBook = async () => {

        setIsLoading(true)

        const url = `${cred.URL}/books/${data._id}/purchase`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }


        try {
            const response = await axios.post(url, null, options);
            const { success, message } = response.data;

            if (success === "success") {
                navigation.goBack()
                setIsLoading(false)
                Alert.alert(`${success}`, `${message}`)

            } else {
                setIsLoading(false)
                Alert.alert("failed", `${message}`)
            }

        } catch (error) {
            setIsLoading(false)
            const { message } = error.response.data
            Alert.alert("failed", `${message}`)
            console.log(error.response.data);
        }
    }

    const close = () => {
        setModalVisible(false)
    }

    const date = moment().format('DD-MM-YYYY')

    const time = moment().format('HH:mm')

    return (
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScrollView>

            <View style={{ backgroundColor: "black", height: "100%", padding: s(10), marginBottom: s(200) }}>
                <View style={{ flexDirection: "row", marginTop: s(40), marginBottom: s(10), alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={s(25)} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: s(14) }}>Purchase Book</Text>
                    <Text></Text>
                </View>

                <View style={styles.card} >
                    <Image source={{ uri: data.image }} style={styles.house} />
                    <View style={{ marginTop: s(10) }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: s(15), color: "white", fontWeight: "bold" }}>{data.title}</Text>
                            <Text style={{ fontSize: s(13), color: "grey", fontWeight: "500" }}> by {data.author}</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: s(10), width: "90%" }}>
                            <MaterialIcons name="description" size={s(20)} color="lightgrey" />
                            <Text style={{ fontSize: s(13), fontWeight: "500", color: "grey" }}>{data.description}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "white" }}>{`₦${format.format(data.price)}`}</Text>
                        </View>
                    </View>

                    <View style={styles.card2} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "grey" }}>Owner's First Name</Text>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "black" }}>{data.createdBy.firstName}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "grey" }}>Owner's Last Name</Text>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "black" }}>{data.createdBy.lastName}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "grey" }}>Owner's Number</Text>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "black" }}>{data.createdBy.phoneNumber}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "grey" }}>Owner's Email</Text>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "black" }}>{data.createdBy.email}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "grey" }}>Published</Text>
                            <Text style={{ fontSize: s(13), fontWeight: "600", color: "black" }}>
                                {new Date(data.createdBy.createdAt).toLocaleDateString()} {new Date(data.createdBy.createdAt).toLocaleTimeString()}
                            </Text>
                        </View>

                    </View>

                    {user.userType !== "lecturer" && (<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                        {loading === false && <Feather name="credit-card" size={s(18)} color="white" />}
                        {loading === true ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12), marginLeft: s(10) }}>Buy</Text>}
                    </TouchableOpacity>)}

                    {user.userType === "lecturer" && (<TouchableOpacity style={styles.button}>
                        {loading === false && <MaterialCommunityIcons name="book-edit" size={s(18)} color="white" />}
                        {loading === true ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12), marginLeft: s(10) }}>Edit</Text>}
                    </TouchableOpacity>)}

                </View>

                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={styles.modalScreen}>
                        <View style={styles.transparentContainer} />
                        <SafeAreaView style={styles.contentContainer}>
                            <View style={styles.closeIconContainer}>
                                <TouchableWithoutFeedback onPress={close}>
                                    <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: s(15), fontWeight: "600", color: "black" }}>Purchase Summary</Text>
                                <Text></Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: s(20) }}>
                                <Image source={{ uri: data.image }} style={styles.house1} />
                                <View style={{ marginTop: s(5), width: "70%" }}>
                                    <Text style={{ fontSize: s(18), color: "black", fontWeight: "bold" }}>{data.title}</Text>
                                    <Text style={{ fontSize: s(14), color: "black", fontWeight: "400", marginTop: s(5) }}>Proceed to pruchase {data.title} for {`₦${format.format(data.price)}`}</Text>
                                </View>
                            </View>

                            <View style={{ paddingLeft: s(20), paddingRight: s(20), marginTop: s(10) }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                    <Text style={{ fontSize: s(13), fontWeight: "400", color: "black" }}>Date</Text>
                                    <Text style={{ fontSize: s(14), fontWeight: "600", color: "black" }}>{date}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                    <Text style={{ fontSize: s(13), fontWeight: "400", color: "black" }}>Time</Text>
                                    <Text style={{ fontSize: s(14), fontWeight: "600", color: "black" }}>{time}</Text>
                                </View>
                            </View>


                            <TouchableOpacity onPress={() => purchaseBook()} style={styles.button1}>
                                {loading === true ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12), marginLeft: s(10) }}>Proceed</Text>}
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </Modal>
            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: s(40),
        backgroundColor: "#49001b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginTop: s(10),
        flexDirection: "row"
    },
    button1: {
        width: "90%",
        height: s(40),
        backgroundColor: "#49001b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginTop: s(10),
        marginLeft: "5%",
        flexDirection: "row"
    },
    house: {
        width: "100%",
        height: s(200),
        resizeMode: "cover"
    },
    house1: {
        width: s(100),
        height: s(100),
        resizeMode: "contain"
    },
    card: {
        width: "100%",
        padding: s(8),
        marginBottom: s(10)
    },
    card2: {
        width: "100%",
        padding: s(10),
        backgroundColor: "#ececec",
        marginTop: s(20),
        borderRadius: s(5)
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "lightgrey",
        paddingBottom: s(1),
        width: '100%',
        marginTop: s(20),
        height: s(45),
        paddingLeft: s(10),
        borderRadius: s(10)
    },
    input: {
        flex: 1,
        color: "black"
    },

    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
        paddingVertical: s(60),

    },
    closeIconContainer: {
        marginLeft: s(10),
        marginTop: s(20),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
})

export default ViewBooks