import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, Text, SafeAreaView, View, StatusBar, Alert, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { s } from "react-native-size-matters"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import credentials from '../../../config'
import axios from 'axios'
import "intl"
import "intl/locale-data/jsonp/en";

import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../../../components/AppButtonBlue'

import { mtn, airtel, nineMobile, glo } from "../../../constants/images"
import { ikedc, bedc, kadc, ekedc, eedc, abdc, kdc, phdc, aa, ibedc } from "../../../constants/images"
import NoHistory from './NoHistory'





const History = ({ navigation }) => {

    const [transaction, setTransaction] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [startText, setStartText] = useState('')
    const [endText, setEndText] = useState('')
    const [itemValue, setItemValue] = useState()




    const onChange = (selectedDate) => {
        setShow(false);
        if (!selectedDate) return; // Handle case when no date is selected
      
        setDate(selectedDate);
      
        if (mode === 'startdate') {
          setStartText(formatDate(selectedDate));
        } else {
          setEndText(formatDate(selectedDate));
        }
        setMode('');
      };


    const showMode = (currentMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return moment(date).format('MMM DD, YYYY');
        
      };


    const formatter = () => {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + String(date.getDate()).padStart(2, 0);
    }

    const setFilterVal = (value) => {
        setItemValue(value)
    }



    const [filterOptions, setFilterOptions] = useState([
        { name: "Last 7 Days", value: 7, isChecked: false },
        { name: "Last 30 Days", value: 30, isChecked: false }
    ]);

    const handleCheckboxToggle = (index) => {
        const updatedOptions = filterOptions.map((item, i) => {
            return {
                ...item,
                isChecked: i === index,
            };
        });

        setFilterOptions(updatedOptions);
    };

    const { auth: { user } } = useSelector(state => state)

    const today = moment().format('YYYY-MM-DD');
    let startDate;
    if (itemValue) {
      startDate = moment().subtract(itemValue, 'days').format('YYYY-MM-DD');
    } else {
      startDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
    }
    const endDate = today

    const transactionHistory = async () => {

       

        const url = `${credentials.URL2}/user/transaction-history`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            "page": 1,
            "startDate": startText ? startText : startDate,
            "endDate": endText ? endText : endDate,
            "status": "",
            "reference": "",
            "product": "",
            "account": "",
            "channel": "",
            "provider": ""
        }

        try {
            setLoading(true)
            const response = await axios.post(url, body, options)
            const { transactions } = response.data

            setTransaction(transactions.docs)
            setLoading(false)

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            Alert.alert(`${message}`);
            setLoading(false)

        }
    }

    useEffect(() => {
        transactionHistory()
    }, [])

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={{ marginTop: s(30), alignItems: "center", marginBottom: s(10) }}>
                    <Text style={{ fontSize: s(18), fontWeight: "700" }}>Transaction History</Text>
                </View>
                <View style={{ width: "100%", height: "90%", padding: s(15), justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: s(5), marginTop: s(10) }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setModalVisible(true)}>
                            <Ionicons name="calendar" size={s(18)} color="#0B44BD" />
                            <Text style={{ marginLeft: s(4), fontWeight: "500" }}>Filter By Date</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ marginLeft: s(4), fontWeight: "500", color: "#3C6BFA" }}>All Transactions</Text>
                            <Ionicons name="chevron-down-sharp" size={s(18)} color="#3C6BFA" />
                        </View>
                    </View>

                    <Modal
                        visible={modalVisible}
                        animationType='slide'
                        transparent={true}
                    >
                        <View style={styles.modalScreen}>
                            <View style={styles.transparentContainer}></View>
                            <View style={styles.contentContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: s(10) }}>
                                    <Text></Text>
                                    <Text style={{ fontSize: s(14), fontWeight: "500" }}>Filter by date</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close-circle" size={s(27)} color="#9E9E9E" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: s(30), justifyContent: "space-between" }}>
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: s(10) }} onPress={() => showMode("startdate")} >
                                        <Text style={{ marginRight: s(4) }}>From</Text>
                                        <View style={styles.dateContainer}>
                                            <Ionicons name="calendar" size={s(18)} color="#0B44BD" style={{ marginRight: s(10) }} />
                                            <Text>{startText !== "" ? startText : "Start Date"} </Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => showMode("enddate")} >
                                        <Text style={{ marginRight: s(4) }}>To</Text>
                                        <View style={styles.dateContainer}>
                                            <Ionicons name="calendar" size={s(18)} color="#0B44BD" style={{ marginRight: s(10) }} />
                                            <Text>{endText !== "" ? endText : "End Date"}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                {show && (
                                    <DateTimePickerModal
                                        isVisible={show}
                                        mode="date"
                                        date={date}
                                        onConfirm={onChange}
                                        onCancel={() => setShow(false)}
                                    />
                                )}
                                <ScrollView>
                                    {filterOptions.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={styles.filterItem} key={index} onPress={() => setFilterVal(item.value)}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text style={{ fontSize: s(14), fontWeight: "500" }}>{item.name}</Text>
                                                    <CheckBox
                                                        disabled={false}
                                                        value={item.isChecked}
                                                        onValueChange={() => handleCheckboxToggle(index)}
                                                        style={styles.checkbox}
                                                    />
                                                </View>
                                                <View style={{ height: s(0.5), backgroundColor: "#c4c4c4", width: "100%", marginTop: s(10) }}></View>
                                            </TouchableOpacity>
                                        )
                                    })}

                                    <AppButton title="Apply Filter" style={{ marginTop: s(15), borderRadius: s(10) }} onPress={() => {transactionHistory(), setModalVisible(false)}} />
                                </ScrollView>

                            </View>
                        </View>
                    </Modal>
                    <ScrollView>
                        {loading === true && <ActivityIndicator color="black" style={{ width: s(40), height: s(40), marginLeft: "50%" }} />}
                        {transaction.length === 0 ? <NoHistory style={{ marginTop: s(20) }}/> : null}
                        {transaction.map((item, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <TouchableOpacity onPress={() => navigation.navigate("HistoryReceipt", { item })} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(18), alignItems: "center" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            { item.status === "successful" ? <MaterialCommunityIcons name="arrow-top-right-thick" size={s(18)} color="green"/> : item.status === "pending" ?  <MaterialCommunityIcons name="arrow-top-right-thick" size={s(18)} color="yellow"/> :
                                            <MaterialCommunityIcons name="arrow-bottom-left-thick" size={s(18)} color="red" />}
                                            <View style={{ width: s(30), height: s(30), justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", borderRadius: s(40), marginLeft: s(5), marginRight: s(5) }}>
                                                { item.product === "withdrawal" ? <MaterialCommunityIcons name="credit-card-minus" size={s(18)} color="#896cfa" /> : item.product === "transfer" ? <Ionicons name="paper-plane" size={s(18)} color="#896cfa" /> : null }
                                                { item.product === "mtnvtu" ? <Image source={mtn} style={{ width: s(30), height: s(30) }} /> : item.product === "glovtu" ? <Image source={glo} style={{ width: s(30), height: s(30) }} />  : 
                                                item.product === "airtelvtu" ? <Image source={airtel} style={{ width: s(30), height: s(30) }} /> : item.product === "9mobilevtu" ? <Image source={nineMobile} style={{ width: s(30), height: s(30) }} />
                                                : null }
                                                { item.product === "mtndata" ? <Image source={mtn} style={{ width: s(30), height: s(30) }} /> : item.product === "glodata" ? <Image source={glo} style={{ width: s(30), height: s(30) }} />  : 
                                                item.product === "airteldata" ? <Image source={airtel} style={{ width: s(30), height: s(30) }} /> : item.product === "9mobiledata" ? <Image source={nineMobile} style={{ width: s(30), height: s(30) }} />
                                                : null }
                                                { item.product === "ekedc" ? <Image source={ekedc} style={{ width: s(30), height: s(30) }} /> : item.product === "ikedc" ? <Image source={ikedc} style={{ width: s(30), height: s(30) }} />  : 
                                                item.product === "ibedc" ? <Image source={ibedc} style={{ width: s(30), height: s(30) }} /> : item.product === "eedc" ? <Image source={eedc} style={{ width: s(30), height: s(30) }} /> : item.product === "phedc" ? <Image source={phdc} style={{ width: s(30), height: s(30) }} /> : item.product === "aedc" ? <Image source={abdc} style={{ width: s(30), height: s(30) }} />  : 
                                                item.product === "jedc" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(18)} color="#896cfa" /> : item.product === "kedco" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(18)} color="#896cfa" /> : item.product === "kadec" ? <MaterialCommunityIcons name="lightbulb-outline" size={s(18)} color="#896cfa" /> 
                                                : null }
                                            </View>
                                            <View style={{ marginLeft: s(5) }}>
                                                <Text style={{ fontSize: s(10), fontWeight: "500", color: "grey" }}>{item.product.charAt(0).toUpperCase() + item.product.slice(1)}</Text>
                                                <Text style={{ fontSize: s(12), fontWeight: "600", color: "black", marginTop: s(2) }}>{item.account}</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: s(14), fontWeight: "600", color: "#484747", marginBottom: s(5) }}>{`₦${format.format(item.amount)}`}</Text>
                                            { item.status === "successful" ? <Text style={{ color: "green" }} >{ item.status }</Text> : item.status === "pending" ? <Text style={{ color: "yellow" }} >{ item.status }</Text> : <Text style={{ color: "red" }} >{ item.status }</Text> }
                                            <Text style={{ marginTop: s(2) }}>{formatDate(item.createdAt)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: s(0.5), backgroundColor: "#e0e0e0", width: "100%", marginTop: s(8) }}></View>
                                </React.Fragment>
                            )

                        })}

                    </ScrollView>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(0.5),
        borderRadius: s(4),
        padding: s(4)
    },
    filterItem: {
        marginTop: s(30),
        paddingRight: s(10),
        paddingLeft: s(5)
    },
    checkbox: {
        width: s(18),
        height: s(18)

    }
})

export default History