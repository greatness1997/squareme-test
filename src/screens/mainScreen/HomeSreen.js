import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StatusBar, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { backgroundImage, Logo, LogoBlue, Add, Send, Airtime, Data, Electricity, CableTv, Others, Insurance, ServiceView, Ads } from '../../constants/images'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'
import cred from '../../config'
import axios from 'axios'
import "intl"
import "intl/locale-data/jsonp/en";


import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const HomeScreen = ({ navigation }) => {

    const [showBalance, setShowBalance] = useState(false)
    const [visible, setVisible] = useState(false)
    const [balance, setBalance] = useState(0.00)
    const [userData, setUserData] = useState({
        "firstName": "N/a",
        "lastName": "N/a"
    })

    const hiddenBal = "*****"

    const { auth: { user } } = useSelector(state => state)

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

    const getProfile = async () => {
        const url = `${cred.URL}/user/profile`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { user, message, status } = response.data
            setUserData(user)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getBalance()
        }, 5000);
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        getBalance()
        getProfile()
    }, [])

    const name = `${userData.firstName}`
    const secondName = `${userData.lastName}`

    const nameOne = name.replace(/^\w/, c => c.toUpperCase())
    const nameTwo = secondName.replace(/^\w/, c => c.toUpperCase())

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: ms(20), paddingRight: ms(20) }}>
                        <View>
                            <Image source={LogoBlue} style={{ flex: 1, resizeMode: 'contain', width: s(55), height: vs(50) }} />
                            <Text style={{ fontSize: s(12), fontWeight: "500", color: "#9A9A9A" }}>Welcome Back,</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Notification")}>
                            <MaterialCommunityIcons name="bell" size={s(25)} color="#69788B" />
                        </TouchableWithoutFeedback>

                    </View>
                    <ImageBackground
                        source={backgroundImage}
                        style={styles.bg} imageStyle={styles.bgImage}
                    >
                        <View style={{ marginTop: vs(10) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: ms(30), paddingRight: ms(30), marginTop: s(10) }}>
                                <Text style={styles.name}>{nameOne} {nameTwo}</Text>
                                <View>
                                    <Text style={{ color: "white" }}> Tap to View</Text>
                                    <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowBalance(!showBalance) }}>
                                        <MaterialCommunityIcons name={showBalance === false ? "eye-outline" : "eye-off-outline"} size={s(20)} color="white" style={{ marginLeft: s(50) }} />
                                    </TouchableWithoutFeedback>

                                </View>

                            </View>
                            <View style={{ flexDirection: "row", paddingLeft: ms(30), paddingRight: ms(30), marginTop: s(10), marginBottom: s(5) }}>
                                <View>
                                    <Text style={styles.heading}>Available Balance</Text>
                                    <Text style={styles.balanceText}>{visible === false ? `₦${format.format(balance)}` : hiddenBal}</Text>
                                    {/* <Text style={styles.balanceText}>₦20,000,000</Text> */}
                                </View>
                                <View style={{ width: "100%", height: "100%", marginLeft: '35%' }}>
                                    <Image source={Logo} style={{ flex: 1, resizeMode: 'contain', width: s(55), height: s(55) }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", paddingLeft: ms(30), paddingRight: ms(30) }}>
                                <TouchableOpacity style={styles.AddIcon} onPress={() => navigation.navigate("Withdrawal")}>
                                    <Image source={Add} style={{ height: ms(40), width: s(40), borderRadius: s(50) }} />
                                    <Text style={{ marginLeft: s(8), fontSize: s(13), fontWeight: '500', color: 'white' }}>Add Money</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.sendIcon} onPress={() => navigation.navigate("TransferValidate")}>
                                    <Image source={Send} style={{ height: ms(40), width: s(40), borderRadius: s(50) }} />
                                    <Text style={{ marginLeft: s(8), fontSize: s(13), fontWeight: '500', color: 'white' }}>Send Money</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </ImageBackground>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: s(20), paddingRight: s(20), marginTop: s(35) }}>

                        <Text style={{ fontSize: s(14), fontWeight: "500", color: "#2E2E2E" }}>Fast Links</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: s(12), fontWeight: "500", color: "#3E6BFF" }}>See All</Text>
                            <MaterialCommunityIcons name="play" size={s(23)} color="#3E6BFF" />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", padding: 0, marginTop: s(10), width: "100%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Provider")}>
                            <ImageBackground
                                source={Electricity}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ marginTop: s(35), fontSize: s(10) }}>Electricity</Text>
                                    <Text style={{ fontSize: s(10) }}>Tokens</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("AirtimeOrData")}>
                            <ImageBackground
                                source={Airtime}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ marginTop: s(35), fontSize: s(10) }}>Airtime &</Text>
                                    <Text style={{ fontSize: s(10) }}>Data</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Internet")}>
                            <ImageBackground
                                source={Data}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ marginTop: s(35), fontSize: s(10) }}>Internet</Text>
                                    <Text style={{ fontSize: s(10) }}>Service</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Insurance")}>
                            <ImageBackground
                                source={Insurance}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ marginTop: s(35), fontSize: s(10) }}>Insurance</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => navigation.navigate("CableTv")}>
                            <ImageBackground
                                source={ServiceView}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Image source={CableTv} style={{ width: s(35), height: s(35), marginBottom: s(5) }} />
                                    <Text style={{ fontSize: s(10) }}>Cable Tv</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <ImageBackground
                                source={ServiceView}
                                style={{ height: vs(90), width: s(90), alignItems: "center", justifyContent: "center" }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Image source={Others} style={{ width: s(35), height: s(35), marginBottom: s(5) }} />
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontSize: s(10) }}>Other</Text>
                                        <Text style={{ fontSize: s(10) }}>Services</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity style={{ width: s(300) }}>
                    <ImageBackground
                        source={Ads}
                        style={styles.bgA} imageStyle={styles.bgAds}
                    >
                    </ImageBackground>
                </TouchableOpacity> */}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        height: s(200),
        width: '100%',
        marginLeft: s(10),
        borderRadius: s(20),
        backgroundColor: 'rgba(173, 216, 230, 0.3)'
    },
    bg: {
        width: '95%',
        marginTop: s(12),
    },
    bgAds: {
        height: ms(150),
        width: s(320),
        marginLeft: s(16),
        borderRadius: s(20),
        flex: 1,
        resizeMode: "contain",
        position: "relative"
    },
    bgA: {
        width: '100%',
        marginTop: s(0),
    },
    balanceText: {
        fontSize: s(22),
        fontWeight: 'bold',
        fontFamily: "PingFangTC-Semibold",
        color: "white",
        marginTop: s(2),
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: s(5)
    },
    name: {
        fontSize: s(15),
        fontWeight: '500',
        fontFamily: "DamascusBold",
        color: "white",
        marginTop: s(10),
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: s(5)
    },
    heading: {
        fontSize: s(14),
        fontWeight: '400',
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: s(5)
    },
    AddIcon: {
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 50,
        padding: s(5),
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    sendIcon: {
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 50,
        padding: s(5),
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
})

export default HomeScreen

