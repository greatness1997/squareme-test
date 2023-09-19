import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Modal, Text, SafeAreaView, View, StatusBar, Alert, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { s } from "react-native-size-matters"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import cred from '../../config'
import axios from 'axios'
import "intl"
import "intl/locale-data/jsonp/en";

import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../../components/AppButtonBlue'
import { Logo, comm } from "../../constants/images"






const WalletHistory = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ "commission": 0, "expenses": 0, "income": 0, "totalExp": 0 })
    const [balance, setBalance] = useState(0.00)

    const { auth: { user } } = useSelector(state => state)

    const walletSummary = async () => {

        const url = `${cred.URL2}/user/get-wallet-summary`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            setLoading(true)
            const response = await axios.get(url, options)
            const { data } = response.data

            setData(data)

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            Alert.alert(`${message}`);
            setLoading(false)

        }
    }

    const getBalance = async () => {
        const url = `${cred.URL}/user/wallet-balance`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { data, message, status } = response.data
            setBalance(data.balance)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        walletSummary()
        const intervalId = setInterval(() => {
            getBalance()
        }, 5000);
        return () => clearInterval(intervalId);
    }, [])

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        box1: {
            marginTop: s(20),
            backgroundColor: "#1b2d56",
            width: windowWidth,
            height: "70%",
            borderRadius: s(15),
            // alignItems: "center"
        },
        box2: {
            // marginTop: s(20),
            backgroundColor: "white",
            width: "92%",
            height: "60%",
            borderRadius: s(10),
            marginLeft: "4%"
        },
        box3: {
            // marginTop: s(20),
            backgroundColor: "white",
            width: "92%",
            height: s(100),
            borderRadius: s(10),
            marginLeft: "4%",
            marginTop: s(10)
        },
        box4: {
            // marginTop: s(20),
            backgroundColor: "white",
            width: "92%",
            height: s(95),
            borderRadius: s(10),
            marginLeft: "4%",
            marginTop: s(20)
        },
        boxShadow: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            margin: 3,
        },
    })


    return (
        <ScrollView>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={{ flexDirection: "row", marginTop: s(10), marginLeft: s(18) }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} />
                    </TouchableWithoutFeedback>

                    <View style={{ justifyContent: "center", marginLeft: s(100) }}>
                        <Text style={{ fontSize: s(16), fontWeight: "bold" }}>Wallet Summary</Text>
                    </View>

                </View>
                <View style={styles.box1}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: s(15), paddingRight: s(20) }}>
                        <View>
                            <Text style={{ fontSize: s(20), fontWeight: "600", color: "white" }}>{`₦ ${format.format(balance)}`}</Text>
                            <Text style={{ marginTop: s(3), fontWeight: "500", color: "white" }}>Wallet Balance</Text>
                        </View>
                        <Image source={Logo} style={{ width: s(70), height: s(70), resizeMode: "contain" }} />
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity onPress={() => navigation.navigate("WalletHistoryList")} style={{ padding: s(5), flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#0C3CB9" }}>Today</Text>
                            <MaterialCommunityIcons name="chevron-right" size={s(22)} color="#2B3CB6" />
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Text>Total Expenses</Text>
                            <Text style={{ marginTop: s(3), fontWeight: "bold" }}>{`₦ ${format.format(data.totalExp)}`}</Text>
                        </View>
                        <View style={{ flexDirection: "row", padding: s(10) }}>
                           
                                {data.income !== 0 || data.expenses !== 0 ? (
                                    <>
                                        <View
                                            style={{
                                                height: s(20),
                                                width: `${(data.income / (data.income + data.expenses)) * 100}%`,
                                                backgroundColor: "#1B2D55",
                                            }}
                                        ></View>
                                        <View
                                            style={{
                                                height: s(20),
                                                width: `${(data.expenses / (data.income + data.expenses)) * 100}%`,
                                                backgroundColor: "#7EBAED",
                                            }}
                                        ></View>
                                    </>
                                ) : (
                                    <>
                                        <View
                                            style={{
                                                height: s(20),
                                                width: "50%",
                                                backgroundColor: "#1B2D55",
                                            }}
                                        ></View>
                                        <View
                                            style={{
                                                height: s(20),
                                                width: "50%",
                                                backgroundColor: "#7EBAED",
                                            }}
                                        ></View>
                                    </>
                                )}
                          

                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: s(5) }}>
                            <View style={{ flexDirection: "row", padding: s(5), alignItems: "center" }}>
                                <View style={{ width: s(25), height: s(25), backgroundColor: "#1B2D55" }}>
                                </View>
                                <View style={{ marginLeft: s(5) }}>
                                    <Text style={{ fontWeight: "500" }}>{`₦ ${format.format(data.income)}`}</Text>
                                    <Text>Income</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", padding: s(5), alignItems: "center" }}>
                                <View style={{ width: s(25), height: s(25), backgroundColor: "#7EBAED" }}>
                                </View>
                                <View style={{ marginLeft: s(5) }}>
                                    <Text style={{ fontWeight: "500" }}>{`₦ ${format.format(data.expenses)}`}</Text>
                                    <Text>Expense</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.box3, styles.boxShadow]}>

                    </View>

                    <View style={[styles.box4, styles.boxShadow]}>
                        <TouchableOpacity onPress={() => navigation.navigate("WalletHistoryList")} style={{ padding: s(5), flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#0C3CB9" }}>View</Text>
                            <MaterialCommunityIcons name="chevron-right" size={s(22)} color="#2B3CB6" />
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: s(20) }}>
                            <Image source={comm} style={{ width: s(35), height: s(35) }} />
                            <View style={{ marginLeft: s(20) }}>
                                <Text style={{ marginBottom: s(10), fontWeight: "bold", fontSize: s(14) }}>Commission Tracker</Text>
                                <Text style={{ fontWeight: "500", fontSize: s(14), color: "#707070" }}>{`₦ ${format.format(data.commission)}`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View></View>
            </SafeAreaView>
        </ScrollView>
    )
}



export default WalletHistory