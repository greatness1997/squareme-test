import React, { useEffect, useState, useRef } from 'react'
import { Dimensions, View, SafeAreaView, StatusBar, StyleSheet, Modal, Text, ImageBackground, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import { image, swit, wallet, wall, backgroundImage, Logo, LogoBlue, Add, Send, Airtime, Data, Electricity, CableTv, Others, Insurance, ServiceView, Ads } from '../../constants/images'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'
import cred from '../../config'
import axios from 'axios'
import "intl"
import "intl/locale-data/jsonp/en";
import Clipboard from '@react-native-clipboard/clipboard'
import Share from "react-native-share"
import ViewShot from 'react-native-view-shot';


import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import Options from './AddMoney/Options';
import AppButton from '../../components/AppButtonBlue';
import DailyPerformance from '../../components/DailyPerformance';






const HomeScreen = ({ navigation }) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const vfdAcctDetails = {
        "accountName": "N/A",
        "accountNo": "N/A",
        "bank": "N/A"
    }

    const [showBalance, setShowBalance] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [balance, setBalance] = useState(0.00)
    const [commission, setCommission] = useState(0.00)
    const [accountDetails, setAccountDetails] = useState(vfdAcctDetails)
    const [userData, setUserData] = useState({
        "firstName": "N/a",
        "lastName": "N/a"
    })

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(false)
    const [modalBalance, setModalBalance] = useState(false)

    const ref = useRef();

    const close = () => {
        setModalVisible(false)
    }

    const close1 = () => {
        setModalVisible1(false)
    }

    const close3 = () => {
        setModalBalance(false)
    }

    const hiddenBal = "*****"

    const { auth: { user } } = useSelector(state => state)

    const getBalance = async () => {
        const url = `${cred.URL}/user/wallet-balance`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { data, message, status } = response.data
            setBalance(data.balance)
            setCommission(data.commission)
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
            setAccountDetails(user.vfdAcctDetails || vfdAcctDetails)
            setUserData(user)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getBalance()
            getProfile()
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

    const handleCopy = async (text) => {
        try {
            await Clipboard.setString(text)
            Alert.alert("Copied!")
        } catch (error) {
            console.log(error)
        }
    }

    const shareText = async () => {
        try {
            const text = {
                message: `Bank: ${accountDetails.bank}\nAccount Number: ${accountDetails.accountNo}\nAccount Name: ${accountDetails.accountName}`,
            }
            await Share.open(text)
        } catch (error) {
            console.log(error)
        }
    }

    const createAccount = () => {
        setModalVisible(false)
        setModalVisible1(false)
        navigation.navigate("VirtualAccount")
    }

    const virtualAccount = `Bank: ${accountDetails.bank}\nAccount Number: ${accountDetails.accountNo}\nAccount Name: ${accountDetails.accountName}`


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: ms(20), paddingRight: ms(20) }}>
                        <View>
                            <Image source={LogoBlue} style={{ flex: 1, resizeMode: 'contain', width: s(55), height: vs(50) }} />
                            <Text style={{ fontSize: s(12), fontWeight: "500", color: "#9A9A9A" }}>Welcome Back,</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={swit} style={{ marginRight: s(5) }} />
                            <TouchableWithoutFeedback onPress={() => navigation.navigate("Notification")}>
                                <MaterialCommunityIcons name="bell" size={s(25)} color="#69788B" />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    {accountDetails.accountNo !== "N/A" ? <ImageBackground source={wall} style={styles.bg2} imageStyle={styles.bgImage2}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: ms(30), paddingRight: ms(10), marginTop: s(7) }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#FFE412", marginRight: s(20) }}>{accountDetails.accountNo}</Text>
                                <Text style={{ fontSize: s(12), fontWeight: "bold", color: "#C3C3C3" }}>VFD Microfinance Bank</Text>
                                <TouchableOpacity onPress={() => handleCopy(accountDetails.accountNo)}>
                                    <Ionicons name="copy" size={s(16)} color="#FFE412" style={{ marginLeft: s(5) }} />
                                </TouchableOpacity>

                            </View>
                            <TouchableWithoutFeedback onPress={() => setModalBalance(true)}>
                                <MaterialCommunityIcons name="chevron-down" color="#C3C3C3" size={20} />
                            </TouchableWithoutFeedback>
                        </View>
                    </ImageBackground> : null}
                    <TouchableOpacity onPress={() => navigation.navigate("WalletHistory")}>
                        <ImageBackground
                            source={wallet}
                            style={styles.bg}
                            imageStyle={styles.bgImage}
                        >
                            <View style={{ marginTop: vs(0) }}>
                                <View style={{ flexDirection: "row", paddingLeft: ms(30), paddingRight: ms(20), justifyContent: "space-between", alignItems: "center", marginTop: s(5) }}>
                                    <Text style={styles.name}>{nameOne} {nameTwo}</Text>
                                    <Text style={{ color: "white", fontSize: s(10) }}>Tap Card To View</Text>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: ms(30), paddingRight: ms(20), marginTop: s(4) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                        <View>
                                            <Text style={styles.commText}>{visible === false ? `₦${format.format(commission)}` : hiddenBal}</Text>
                                            <Text style={styles.headingText}>Commission Balance</Text>
                                        </View>
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowBalance(!showBalance) }}>
                                            <MaterialCommunityIcons name={showBalance === false ? "eye-outline" : "eye-off-outline"} size={s(20)} color="white" style={{ marginLeft: s(50) }} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: ms(30), paddingRight: ms(20), marginTop: s(0), marginBottom: s(7) }}>
                                    <View>
                                        <Text style={styles.balanceText}>{visible === false ? `₦${format.format(balance)}` : hiddenBal}</Text>
                                        <Text style={styles.heading}>Available Balance</Text>
                                    </View>
                                    <View>
                                        <Image source={Logo} style={{ width: s(60), height: s(60), resizeMode: "contain" }} />
                                    </View>

                                </View>
                                <View style={{ flexDirection: "row", paddingLeft: ms(30), paddingRight: ms(30) }}>
                                    <TouchableOpacity style={styles.AddIcon} onPress={() => setModalVisible(true)}>
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
                    </TouchableOpacity>
                    <Text style={{ marginTop: s(30), marginLeft: s(20), color: "#2e2e2e" }}>Daily Performance History</Text>
                    <DailyPerformance />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: s(20), paddingRight: s(20), marginTop: s(10) }}>

                        <Text style={{ fontSize: s(14), fontWeight: "500", color: "#2E2E2E" }}>Fast Links</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: s(12), fontWeight: "500", color: "#3E6BFF" }}>See All</Text>
                            <MaterialCommunityIcons name="play" size={s(23)} color="#3E6BFF" />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", padding: 0, marginTop: s(8), marginBottom: s(20), width: "100%" }}>
                        <View style={{ flexDirection: "row", }}>
                            <TouchableOpacity style={[styles.product, styles.boxShadow]} onPress={() => navigation.navigate("Provider")}>
                                <Image source={Electricity} style={{ width: s(30), height: s(45), marginTop: s(3) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(2) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Electricity</Text>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Tokens</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.product, styles.boxShadow]} onPress={() => navigation.navigate("AirtimeOrData")}>
                                <Image source={Airtime} style={{ width: s(30), height: s(45), marginTop: s(3) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(2) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Airtime &</Text>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Data</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.product, styles.boxShadow]}>
                                <Image source={Data} style={{ width: s(30), height: s(50), marginTop: s(3) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(0) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Internet</Text>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Service</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", }}>
                            <TouchableOpacity style={[styles.product, styles.boxShadow]}>
                                <Image source={Insurance} style={{ width: s(30), height: s(45), marginTop: s(10) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(2) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Insurance</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.product, styles.boxShadow]} onPress={() => navigation.navigate("ProviderTv")}>
                                <Image source={CableTv} style={{ width: s(40), height: s(40), marginTop: s(10) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(8) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Cable TV</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.product, styles.boxShadow]}>
                                <Image source={Others} style={{ width: s(30), height: s(40), marginTop: s(10) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                                    <Text style={{ fontSize: s(12), color: "black" }}>Others</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        visible={modalVisible}
                        animationType='slide'
                        transparent={true}
                    >
                        <View style={styles.modalScreen}>
                            <View style={styles.transparentContainer} />
                            <View style={styles.contentContainer}>
                                <View style={styles.closeIconContainer}>
                                    <TouchableWithoutFeedback onPress={close}>
                                        <MaterialCommunityIcons name="close-circle" size={s(25)} color="black" />

                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: s(17), fontWeight: "600", color: "black" }}>Add Money With</Text>
                                    <Text></Text>
                                </View>
                                <View style={{ padding: 0, marginTop: 0, width: "100%" }}>

                                    <View style={{ alignItems: "center", padding: s(10), marginBottom: s(0) }}>

                                        <TouchableOpacity style={styles.serviceContainer} onPress={() => setModalVisible1(true)}>
                                            <View style={{ flexDirection: "row" }}>
                                                <MaterialCommunityIcons name="bank-transfer" size={30} color="#186f00" />
                                                <View>
                                                    <Text style={{ fontWeight: "500", marginLeft: 20, color: "black" }}>Fund With Bank Transfer</Text>
                                                    <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, color: "grey", fontSize: 10 }}>Tap To View Details</Text>
                                                </View>
                                            </View>

                                            <MaterialCommunityIcons name="chevron-right" size={30} color="#808080" />

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                                    <View style={{ alignItems: "center", padding: s(10), marginBottom: s(0) }}>

                                        <TouchableOpacity style={styles.serviceContainer}>
                                            <View style={{ flexDirection: "row" }}>
                                                <MaterialCommunityIcons name="help-circle" size={30} color="#1b2d56" />
                                                <View>
                                                    <Text style={{ fontWeight: "500", marginLeft: 20, color: "black" }}>Other Payment Options</Text>
                                                    <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10, color: "grey" }}>Tap To View Details</Text>
                                                </View>
                                            </View>

                                            <MaterialCommunityIcons name="chevron-right" size={30} color="#808080" />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Modal
                            visible={modalVisible1}
                            animationType='slide'
                            transparent={true}
                        >
                            <View style={styles.modalScreen}>
                                <View style={styles.transparentContainer1} />
                                <View style={styles.contentContainer1}>
                                    <ScrollView>
                                        <View style={styles.closeIconContainer1}>
                                            <TouchableWithoutFeedback onPress={close1}>
                                                <MaterialCommunityIcons name="close-circle" size={s(25)} color="black" />

                                            </TouchableWithoutFeedback>
                                            <Text style={{ fontSize: s(17), fontWeight: "600", color: "black" }}>Add Money</Text>
                                            <Text></Text>
                                        </View>
                                        <View style={{ alignItems: "center", marginBottom: s(15), marginTop: s(10) }}>
                                            <View style={{ backgroundColor: "#ebf0fa", width: "100%", height: s(60), borderRadius: s(10), borderWidth: 1, borderColor: "#3483f5", alignItems: "center", justifyContent: "center" }}>
                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={{ fontWeight: "bold", fontSize: s(20), marginTop: 5, marginBottom: 5, color: "black" }}>{`₦${format.format(balance)}`}</Text>
                                                    <Text style={{ fontWeight: "500", fontSize: 12, color: "black" }}>Current Balance</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={{ alignSelf: "center", marginBottom: s(15), color: "#9a9a9a", fontWeight: "500" }}>Fund Using The Account Bellow</Text>

                                        <View style={{ padding: 0, marginTop: 0, width: "100%", backgroundColor: "#f5f5f5", borderWidth: 1, borderColor: "#3483f5", borderRadius: s(10) }}>

                                            <View style={{ alignItems: "center", padding: s(10), marginBottom: s(0) }}>

                                                <View style={styles.serviceContainer}>
                                                    <View >

                                                        <Text style={{ fontWeight: "500", marginLeft: 20, fontSize: 12, color: "grey" }}>Account Name</Text>
                                                        <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 15, marginTop: 5, color: "grey" }}>{accountDetails.accountName}</Text>

                                                    </View>
                                                    {accountDetails.accountName !== "N/A" && <TouchableOpacity onPress={() => handleCopy(accountDetails.accountName)}>
                                                        <Ionicons name="copy-outline" size={s(18)} color="#3c68f8" style={{ marginLeft: s(5) }} />
                                                    </TouchableOpacity>}

                                                </View>
                                            </View>
                                            <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                                            <View style={{ alignItems: "center", padding: s(10), marginBottom: s(0) }}>

                                                <View style={styles.serviceContainer}>
                                                    <View >

                                                        <Text style={{ fontWeight: "500", marginLeft: 20, fontSize: 12, color: "grey" }}>Bank Name</Text>
                                                        <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 15, marginTop: 5, color: "grey" }}>{accountDetails.bank}</Text>

                                                    </View>
                                                    {accountDetails.bank !== "N/A" && <TouchableOpacity onPress={() => handleCopy(accountDetails.bank)}>
                                                        <Ionicons name="copy-outline" size={s(18)} color="#3c68f8" style={{ marginLeft: s(5) }} />
                                                    </TouchableOpacity>}
                                                </View>
                                            </View>
                                            <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                                            <View style={{ alignItems: "center", padding: s(10), marginBottom: s(0) }}>

                                                <View style={styles.serviceContainer}>
                                                    <View >
                                                        <Text style={{ fontWeight: "500", marginLeft: 20, fontSize: 12, color: "grey" }}>Account Number</Text>
                                                        <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 15, marginTop: 5, color: "grey" }}>{accountDetails.accountNo}</Text>
                                                    </View>
                                                    {accountDetails.accountNo !== "N/A" && <TouchableOpacity onPress={() => handleCopy(accountDetails.accountNo)}>
                                                        <Ionicons name="copy-outline" size={s(18)} color="#3c68f8" style={{ marginLeft: s(5) }} />
                                                    </TouchableOpacity>}

                                                </View>
                                            </View>

                                        </View>

                                        {accountDetails.accountNo !== "N/A" ? <AppButton title="Share Account Details" onPress={() => shareText()} /> : <AppButton title="Create Virtual Account" onPress={() => createAccount()} />}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </Modal>

                    <Modal
                        visible={modalBalance}
                        animationType='slide'
                        transparent={true}
                    >
                        <View style={styles.modalScreen}>
                            <View style={styles.transparentContainer} />
                            <View style={styles.contentContainer}>
                                <View style={styles.closeIconContainer}>
                                    <Text></Text>
                                    <Text></Text>
                                    <TouchableWithoutFeedback onPress={close3}>
                                        <MaterialCommunityIcons name="close-circle" size={s(21)} color="black" />
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: s(45), height: s(45), backgroundColor: "#D3D3D3", borderRadius: s(50), justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: s(18), fontWeight: "bold", color: "#1C1C1C" }}>
                                                {accountDetails.accountName
                                                    ? accountDetails.accountName
                                                        .split('-') // Split by hyphen
                                                        .pop() // Take the last part after the last hyphen
                                                        .split(' ')
                                                        .map(word => word[0])
                                                        .slice(0, 2)
                                                        .join('')
                                                        .toUpperCase()
                                                    : "N/A"}
                                            </Text>
                                        </View>
                                        <Text style={{ marginLeft: s(8), color: "#1B2D56", fontWeight: "500" }}>{accountDetails.accountName ? accountDetails.accountName : "N/A"}</Text>
                                    </View>

                                    <Text></Text>
                                    {accountDetails.accountNo && (<TouchableOpacity onPress={() => handleCopy(virtualAccount)}>
                                        <Text style={{ fontWeight: "500", fontSize: s(11), color: "#3382F3" }}>Copy Details</Text>
                                    </TouchableOpacity>)}

                                </View>

                                <View style={{ marginLeft: "21%" }}>
                                    <Text style={{ fontSize: s(10), color: "#4E4E4E", }}>Account Number</Text>
                                    <Text style={{ color: "#1C1C1C", fontSize: s(14), fontWeight: "600", marginTop: s(2) }}>{accountDetails.accountNo ? accountDetails.accountNo : "N/A"}</Text>
                                </View>

                                <View style={{ marginTop: s(8), marginLeft: "21%" }}>
                                    <Text style={{ fontSize: s(10), color: "#4E4E4E", }}>Bank Name</Text>
                                    <Text style={{ color: "#1C1C1C", fontSize: s(14), fontWeight: "600", marginTop: s(2) }}>{accountDetails.bank ? accountDetails.bank : "N/A"}</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
        backgroundColor: 'rgba(173, 216, 230, 0.3)',
    },
    bgImage2: {
        height: s(35),
        width: '100%',
        marginLeft: s(10),
        borderRadius: s(10),
        backgroundColor: 'rgba(173, 216, 230, 0.3)',
        resizeMode: "contain",

    },
    bg: {
        width: '95%',
        marginTop: s(12),
    },
    bg2: {
        width: "95%",
        height: s(30),
        marginTop: s(10),

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
        fontSize: s(25),
        fontWeight: 'bold',
        fontFamily: "PingFangTC-Semibold",
        color: "white",
        marginTop: s(2),
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: s(5)
    },
    commText: {
        fontSize: s(16),
        fontWeight: 'bold',
        fontFamily: "PingFangTC-Semibold",
        color: "white",
        marginTop: s(2),
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: s(5)
    },
    closeIconContainer: {
        paddingLeft: s(20),
        paddingRight: s(20),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: s(20)
    },
    closeIconContainer1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: s(20)
    },
    name: {
        fontSize: s(13),
        fontWeight: '500',
        fontFamily: "DamascusBold",
        color: "white",
        marginTop: s(10),
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: s(5)
    },
    heading: {
        fontSize: s(11),
        fontWeight: '400',
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: s(5)
    },
    headingText: {
        fontSize: s(11),
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
        flex: 0.5,
        backgroundColor: 'white',
        borderTopLeftRadius: s(10),
        borderTopRightRadius: s(10),
        paddingHorizontal: s(5),
        paddingVertical: s(35),
    },
    serviceContainer: {
        width: "95%",
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    modalScreen1: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer1: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer1: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: s(10),
        borderTopRightRadius: s(10),
        paddingHorizontal: s(10),
        paddingVertical: s(30),
    },
    tag: {
        backgroundColor: '#d10000',
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 80,
        position: "relative",
        marginTop: 0
    },
    tag2: {
        backgroundColor: '#d10000',
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 80,
        position: "relative",
        marginTop: 8
    },
    profileImage: {
        width: s(45),
        height: s(45),
        borderWidth: s(2),
        borderRadius: s(100),
        borderColor: "#1b2d56",
        // backgroundColor: "white",
        marginRight: s(10),
        justifyContent: "center", alignItems: "center"
    },
    product: {
        width: s(95),
        height: s(90),
        backgroundColor: "white",
        borderRadius: s(10),
        alignItems: 'center'
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
        margin: s(5),
    },
})

export default HomeScreen

