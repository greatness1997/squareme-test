import React, { useState } from 'react'
import { StyleSheet, Linking, Alert, Text, View, ImageBackground, TouchableWithoutFeedback, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { airtel, mtn, glo, whatsapp, livechat, call, mail } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { s } from 'react-native-size-matters'


const HelpCenter = ({ navigation }) => {

    const [activeBox, setActiveBox] = useState(null)

    const handleBoxPress = (boxIndex) => {
        setActiveBox(boxIndex)
    }

    const chatWhatsapp = () => {
        const phoneNumber = '+2349060731601';

        // Create a deep link URL
        const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;

        // Check if WhatsApp is installed and then open the deep link
        Linking.canOpenURL(whatsappURL)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(whatsappURL);
                } else {
                    Alert.alert("Failed", "WhatsApp is not installed on this device.");
                }
            })
            .catch((error) => {
                console.error('An error occurred while trying to open WhatsApp: ', error);
            });
    }


    return (
        <SafeAreaView>
            <View style={{ padding: 0, marginTop: 0, width: "100%" }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20), marginBottom: s(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600", color: "black" }}>Settings</Text>
                    <Text></Text>
                </View>

                <Text style={{ marginLeft: "5%", marginBottom: s(8), color: "#1A294D" }}>Chat Us</Text>
                <View style={{ backgroundColor: "#EBF3FD", width: "90%", marginLeft: s(15) }}>
                    <Text style={{ marginLeft: "5%", marginTop: s(8), fontSize: s(10), color: "#1A294D" }}>Average Response Time: 1 Min</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("liveChat")} style={styles.serviceContainer1}>
                        <Image source={livechat} />
                        <View>
                            <Text style={{ fontWeight: "400", fontSize: s(13), marginLeft: 20, color: "#1A294D" }}>Live Web Chat</Text>
                            <Text style={{ fontWeight: "400", color: "#7E7E7E", marginLeft: 20, marginTop: 5, fontSize: s(9) }}>Start a conversation on Live Chat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={chatWhatsapp} style={styles.serviceContainer}>
                        <Image source={whatsapp} />
                        <View>
                            <Text style={{ fontWeight: "400", fontSize: s(13), marginLeft: 20, color: "#1A294D" }}>WhatsApp</Text>
                            <Text style={{ fontWeight: "400", color: "#7E7E7E", marginLeft: 20, marginTop: 5, fontSize: s(9) }}>Start a conversation on WhatsApp</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={{ marginLeft: "5%", marginBottom: s(8), marginTop: s(10), color: "#1A294D" }}>Call</Text>
                <View style={{ backgroundColor: "#EBF3FD", width: "90%", marginLeft: s(15) }}>
                    <Text style={{ marginLeft: "5%", marginTop: s(8), fontSize: s(10), color: "#1A294D" }}>Average Response Time: 2 Min</Text>
                    <View
                        style={styles.serviceContainer2}

                    >
                        <Text style={{ fontWeight: "400", fontSize: s(13), marginLeft: 20, color: "#1A294D" }}>+2349060731601</Text>
                        <TouchableOpacity onPress={() => {
                            const phoneNumber = '+2349060731601';
                            Linking.openURL(`tel:${phoneNumber}`)
                        }
                        }
                            style={{ width: s(80), height: s(25), backgroundColor: "#1B2D56", borderRadius: s(15), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image source={call} style={{ width: s(12), height: s(13), resizeMode: "contain" }} />
                            <Text style={{ color: "white", marginLeft: s(5), fontSize: s(10) }}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ marginLeft: "5%", marginBottom: s(8), marginTop: s(10), color: "#1A294D" }}>Email</Text>
                <View style={{ backgroundColor: "#EBF3FD", width: "90%", marginLeft: s(15) }}>
                    <Text style={{ marginLeft: "5%", marginTop: s(8), fontSize: s(10), color: "#1A294D" }}>Average Response Time: 12 Hrs</Text>
                    <View style={styles.serviceContainer2}>
                        <View>
                            <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: 20, color: "#1A294D" }}>eakinlabi@spoutpayment.com</Text>
                            <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: 20, color: "#1A294D" }}>gikpeme@spoutpayment.com</Text>
                        </View>
                        <TouchableOpacity
                            style={{ width: s(80), height: s(25), backgroundColor: "#1B2D56", borderRadius: s(15), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                const emailAddress = 'eakinlabi@spoutpayment.com'
                                const emailAddress1 = 'gikpeme@spoutpayment.com';
                                Linking.openURL(`mailto:${emailAddress},${emailAddress1}`);
                            }}
                        >
                            <Image source={mail} style={{ width: s(13), height: s(13), resizeMode: "contain" }} />
                            <Text style={{ color: "white", marginLeft: s(5), fontSize: s(10) }}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: "90%",
        height: s(70),
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,

    },
    serviceContainer1: {
        width: "90%",
        height: s(70),
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        marginTop: s(8)
    },
    serviceContainer2: {
        width: "90%",
        height: s(50),
        borderRadius: 10,
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: s(8)
    }
})

export default HelpCenter

