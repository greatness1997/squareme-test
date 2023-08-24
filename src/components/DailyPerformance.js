import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { s } from 'react-native-size-matters'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import cred from '../config'

import "intl"
import "intl/locale-data/jsonp/en";




export default function () {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [airtimedata, setAirtimedata] = useState({ "dayBeforeYesterday": { "totalAmount": 0, "transactionCount": 0 }, "today": { "totalAmount": 0, "transactionCount": 0 }, "yesterday": { "totalAmount": 0, "transactionCount": 0 } })
    const [bills, setBills] = useState({ "dayBeforeYesterday": { "totalAmount": 0, "transactionCount": 0 }, "today": { "totalAmount": 0, "transactionCount": 0 }, "yesterday": { "totalAmount": 0, "transactionCount": 0 } })
    const [withdrawal, setWithdrawal] = useState({ "dayBeforeYesterday": { "totalAmount": 0, "transactionCount": 0 }, "today": { "totalAmount": 0, "transactionCount": 0 }, "yesterday": { "totalAmount": 0, "transactionCount": 0 } })
    const [trans, setTrans] = useState({ "dayBeforeYesterday": { "totalAmount": 0, "transactionCount": 0 }, "today": { "totalAmount": 0, "transactionCount": 0 }, "yesterday": { "totalAmount": 0, "transactionCount": 0 } })
    // const [ dayBeforeYesterday, setDayBeforeYesterday ] = useState({})

    const styles = StyleSheet.create({
        summary: {
            marginLeft: s(20),
            marginTop: s(10),
            backgroundColor: "white",
            width: windowWidth / 1.2,
            padding: s(10),
            // alignItems: "center",
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
    });

    const today = moment();
    const yesterday = moment().subtract(1, 'days')
    const twodaysAgo = moment().subtract(2, 'days')
    const todayDate = today.format('DD, MMM, YYYY')
    const yesterdayDate = yesterday.format('DD, MMM, YYYY')
    const twodaysAgoDate = twodaysAgo.format('DD, MMM, YYYY')

    const { auth: { user } } = useSelector(state => state)

    const getSummary = async () => {
        const url = `${cred.URL2}/user/performance-history`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { data } = response.data
            setAirtimedata(data.airtimedata)
            setBills(data.billspayment)
            setWithdrawal(data.withdrawal)
            setTrans(data.transfer)

        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getSummary()
        }, 5000);
        return () => clearInterval(intervalId);
    }, [])


    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginRight: s(20) }}>
                <View>
                    <Text style={{ marginLeft: s(20), marginTop: s(10), fontWeight: "600", color: "#3382f3" }}>TODAY, {todayDate.toLocaleUpperCase()}</Text>
                    <View style={[styles.summary, styles.boxShadow]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#cee1ff", padding: s(5), marginRight: s(5) }}>
                                        <Ionicons name="paper-plane" size={16} color="#225db9" />
                                    </View>
                                    <Text style={{ color: "#225db9", fontWeight: "600", fontSize: s(10) }}>TRANSFERS</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(trans.today.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{trans.today.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ffd0ea", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="arrow-right-top-bold" size={16} color="#BF6295" />
                                    </View>
                                    <Text style={{ color: "#BF6295", fontWeight: "600", fontSize: s(10) }}>WITHDRAWAL</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(withdrawal.today.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{withdrawal.today.transactionCount} Transactions</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(20) }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ecdbff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="credit-card" size={16} color="#8954c2" />
                                    </View>
                                    <Text style={{ color: "#8954c2", fontWeight: "600", fontSize: s(10) }}>BILLS PAYMENT</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(bills.today.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{bills.today.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#d5f1ff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="phone-outgoing" size={16} color="#269dd9" />
                                    </View>
                                    <Text style={{ color: "#269dd9", fontWeight: "600", fontSize: s(10) }}>AIRTIME & DATA</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(airtimedata.today.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{airtimedata.today.transactionCount} Transactions</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{ marginLeft: s(20), marginTop: s(10), fontWeight: "600", color: "#3382f3" }}>YESTERDAY, {yesterdayDate.toLocaleUpperCase()}</Text>
                    <View style={[styles.summary, styles.boxShadow]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#cee1ff", padding: s(5), marginRight: s(5) }}>
                                        <Ionicons name="paper-plane" size={16} color="#225db9" />
                                    </View>
                                    <Text style={{ color: "#225db9", fontWeight: "600", fontSize: s(10) }}>TRANSFERS</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(trans.yesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{trans.yesterday.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ffd0ea", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="arrow-right-top-bold" size={16} color="#BF6295" />
                                    </View>
                                    <Text style={{ color: "#BF6295", fontWeight: "600", fontSize: s(10) }}>WITHDRAWAL</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(withdrawal.yesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{withdrawal.yesterday.transactionCount} Transactions</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(20) }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ecdbff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="credit-card" size={16} color="#8954c2" />
                                    </View>
                                    <Text style={{ color: "#8954c2", fontWeight: "600", fontSize: s(10) }}>BILLS PAYMENT</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(bills.yesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{bills.yesterday.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#d5f1ff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="phone-outgoing" size={16} color="#269dd9" />
                                    </View>
                                    <Text style={{ color: "#269dd9", fontWeight: "600", fontSize: s(10) }}>AIRTIME & DATA</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(airtimedata.yesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{airtimedata.yesterday.transactionCount} Transactions</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View>
                    <Text style={{ marginLeft: s(20), marginTop: s(10), fontWeight: "600", color: "#3382f3" }}>2 DAYS AGO, {twodaysAgoDate.toLocaleUpperCase()}</Text>
                    <View style={[styles.summary, styles.boxShadow]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#cee1ff", padding: s(5), marginRight: s(5) }}>
                                        <Ionicons name="paper-plane" size={16} color="#225db9" />
                                    </View>
                                    <Text style={{ color: "#225db9", fontWeight: "600", fontSize: s(10) }}>TRANSFERS</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(trans.dayBeforeYesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{trans.dayBeforeYesterday.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ffd0ea", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="arrow-right-top-bold" size={16} color="#BF6295" />
                                    </View>
                                    <Text style={{ color: "#BF6295", fontWeight: "600", fontSize: s(10) }}>WITHDRAWAL</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{format.format(withdrawal.dayBeforeYesterday.totalAmount)}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{withdrawal.dayBeforeYesterday.transactionCount} Transactions</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(20) }}>
                            <View style={{ paddingLeft: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#ecdbff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="credit-card" size={16} color="#8954c2" />
                                    </View>
                                    <Text style={{ color: "#8954c2", fontWeight: "600", fontSize: s(10) }}>BILLS PAYMENT</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(bills.dayBeforeYesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{bills.dayBeforeYesterday.transactionCount} Transactions</Text>
                            </View>
                            <View style={{ paddingRight: s(10) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "#d5f1ff", padding: s(5), marginRight: s(5) }}>
                                        <MaterialCommunityIcon name="phone-outgoing" size={16} color="#269dd9" />
                                    </View>
                                    <Text style={{ color: "#269dd9", fontWeight: "600", fontSize: s(10) }}>AIRTIME & DATA</Text>
                                </View>
                                <Text style={{ color: "#2e2e2e", fontWeight: "bold", fontSize: s(12), marginTop: 5 }}>{`₦${format.format(airtimedata.dayBeforeYesterday.totalAmount)}`}</Text>
                                <Text style={{ color: "#9f9f9f", fontWeight: "bold", fontSize: s(9.5), marginTop: 5 }}>{airtimedata.dayBeforeYesterday.transactionCount} Transactions</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


