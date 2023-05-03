import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { backgroundImage, Logo, Add, Send, Airtime, Data, Electricity, CableTv, Others, Insurance, ServiceView, Ads } from '../../constants/images'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HomeScreen = ({ navigation }) => {

    const [showBalance, setShowBalance] = useState(false)
    const [visible, setVisible] = useState(false)

    const hiddenBal = "*************"
    

    return (
        <ScrollView>
            <ImageBackground
                source={backgroundImage}
                style={styles.bg} imageStyle={styles.bgImage}
            >
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
                        <Text style={styles.name}>Sanusi .T Segun</Text>
                        <View>
                            <Text style={{ color: "white" }}> Tap to View</Text>
                            <TouchableWithoutFeedback onPress={() => {setVisible(!visible), setShowBalance(!showBalance)}}>
                                <MaterialCommunityIcons name={showBalance === false ? "eye-outline" : "eye-off-outline" } size={26} color="white" style={{ marginLeft: 50 }} />
                            </TouchableWithoutFeedback>

                        </View>

                    </View>
                    <View style={{ flexDirection: "row", paddingLeft: 30, paddingRight: 30, marginTop: 15 }}>
                        <View>
                            <Text style={styles.heading}>Available Balance</Text>
                            <Text style={styles.balanceText}>{visible === false ? "₦20,000,000" : hiddenBal}</Text>
                            {/* <Text style={styles.balanceText}>₦20,000,000</Text> */}
                        </View>
                        <View style={{ width: "100%", height: "100%", marginLeft: '35%' }}>
                            <Image source={Logo} style={{ flex: 1, resizeMode: 'contain', width: 70, height: 70 }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", paddingLeft: 30, paddingRight: 30, }}>
                        <TouchableOpacity style={styles.AddIcon} onPress={() => navigation.navigate("login")}>
                            <Image source={Add} style={{ height: 50, width: 50 }} />
                            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '500', color: 'white' }}>Add Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sendIcon} onPress={() => navigation.navigate("TransferValidate")}>
                            <Image source={Send} style={{ height: 50, width: 50 }} />
                            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '500', color: 'white' }}>Send Money</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </ImageBackground>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", padding: 10, marginTop: 40, width: "100%" }}>
                <TouchableOpacity>
                    <ImageBackground
                        source={Electricity}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginTop: 40, fontSize: 12 }}>Electricity</Text>
                            <Text style={{ fontSize: 12 }}>Tokens</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={Airtime}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginTop: 40, fontSize: 12 }}>Airtime &</Text>
                            <Text style={{ fontSize: 12 }}>Data</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={Data}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginTop: 40, fontSize: 12 }}>Internet</Text>
                            <Text style={{ fontSize: 12 }}>Service</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={Insurance}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginTop: 40, fontSize: 12 }}>Insurance</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ServiceView}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Image source={CableTv} style={{ width: 40, height: 40, marginBottom: 5 }} />
                            <Text style={{ fontSize: 12 }}>Cable Tv</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ServiceView}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Image source={Others} style={{ width: 40, height: 40, marginBottom: 5 }} />
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 12 }}>Other</Text>
                                <Text style={{ fontSize: 12 }}>Services</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ width: 300 }}>
                <ImageBackground
                    source={Ads}
                    style={styles.bgA} imageStyle={styles.bgAds}
                >
                </ImageBackground>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        height: 250,
        width: '100%',
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(173, 216, 230, 0.3)'
    },
    bg: {
        width: '95%',
        marginTop: 20,
    },
    bgAds: {
        height: 150,
        width: 370,
        marginLeft: 20,
        borderRadius: 20,
        flex: 1,
        resizeMode: "contain"
    },
    bgA: {
        width: '100%',
        marginTop: 20,
    },
    balanceText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "white",
        marginTop: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: 5
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: "white",
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowRadius: 5
    },
    heading: {
        fontSize: 15,
        fontWeight: '400',
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5
    },
    AddIcon: {
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 50,
        padding: 5,
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
        padding: 5,
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
})

export default HomeScreen

