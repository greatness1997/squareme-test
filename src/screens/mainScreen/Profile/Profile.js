import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { s, ms, vs } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { image } from '../../../constants/images'
import { color } from '../../../constants/color'
import Clipboard from '@react-native-clipboard/clipboard'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import cred from '../../../config'
import axios from 'axios'


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState({
        "firstName":"N/a",
        "lastName":"N/a",
        "email":"N/a",
        "walletId":"N/a"
    })

    const { auth: { user } } = useSelector(state => state)

    const handleCopy = async (walletId) => {
        try {
            await Clipboard.setString(walletId)
            Alert.alert("Copied!")
        } catch (error) {
            console.log(error)
        }
    }

    const getProfile = async () => {
        const url = `${cred.URL}/user/profile`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { user } = response.data
            setUserData(user)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: s(4), flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: s(10) }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
                    <MaterialCommunityIcons name="arrow-left-thick" size={s(25)} />
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: s(17), fontWeight: "600" }}>Profile</Text>
                <Text></Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ alignItems: "center", }}>
                    <View style={{ flexDirection: "row" }}>

                        <View style={styles.profileImage}>
                            <Image source={image} style={{ width: s(50), height: vs(50), borderRadius: s(50), }} />
                        </View>
                        <View style={styles.edit}>
                            <MaterialCommunityIcons name="camera-outline" color="#ffffff" size={s(15)} />
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: s(10) }}>
                        <Text style={{ color: "#464646", fontSize: s(17), fontWeight: "600" }}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ color: "#6c6c6c", fontSize: s(12), fontWeight: "400", marginTop: s(3) }}>{userData.email}</Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: s(10), backgroundColor: "#c66e5443", padding: s(8), borderRadius: s(5) }}>
                        <Text style={{ color: "#e66e54", fontWeight: "500", fontSize: s(12) }}>Upgrade Now!</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: s(20), marginLeft: s(20), flexDirection: "row", alignItems: "center" }} >
                    <Text style={{ color: "#6c6c6c", fontWeight: "500", fontSize: s(12) }}>WALLET ID: {userData.walletId}</Text>
                    <TouchableOpacity onPress={() => handleCopy(user.walletId)}>
                        <Ionicons name="copy-outline" size={s(12)} color="#3c68f8" style={{ marginLeft: s(5) }} />
                    </TouchableOpacity>

                </View>

                <View style={styles.box1}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: s(20) }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#c9d3ff", fontWeight: "300", fontSize: s(10), marginBottom: s(3) }}>Account Type</Text>
                            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: s(12) }}>{userData.agentType}</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#c9d3ff", fontWeight: "300", fontSize: s(10), marginBottom: s(3) }}>KYC Level</Text>
                            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: s(12) }}>{userData.agentType === "user" ? "Level 1" : userData.agentType === "agent" ? "Level 2" : userData.agentType === "aggregator" ? "Level 3" : ""}</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#c9d3ff", fontWeight: "300", fontSize: s(10), marginBottom: s(3) }}>Account Status</Text>
                            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: s(12) }}>Active</Text>
                        </View>
                    </View>

                    <View style={styles.box2}>
                        <TouchableOpacity style={{ backgroundColor: "#ededed", marginTop: s(10), width: "90%", height: s(45), flexDirection: "row", alignItems: "center", padding: s(10) }}>
                            <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIcons name="thumb-up" size={s(18)} color="#c9d3ff" />
                            </View>
                            <Text style={{ color: "#6c6c6c", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Personal Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: "#ededed", marginTop: s(10), width: "90%", height: s(45), flexDirection: "row", alignItems: "center", padding: s(10) }}>
                            <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIcons name="thumb-up" size={s(18)} color="#c9d3ff" />
                            </View>
                            <Text style={{ color: "#6c6c6c", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Bank Verification Number</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: "#ededed", marginTop: s(10), width: "90%", height: s(45), flexDirection: "row", alignItems: "center", padding: s(10) }}>
                            <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIcons name="thumb-up" size={s(18)} color="#c9d3ff" />
                            </View>
                            <Text style={{ color: "#6c6c6c", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Documents</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: "#ededed", marginTop: s(10), width: "90%", height: s(45), flexDirection: "row", alignItems: "center", padding: s(10), marginBottom: s(10) }}>
                            <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                <MaterialCommunityIcons name="thumb-up" size={s(18)} color="#c9d3ff" />
                            </View>
                            <Text style={{ color: "#6c6c6c", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Contact Details</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    profileImage: {
        width: s(70),
        height: s(70),
        borderWidth: s(4),
        borderRadius: s(100),
        borderColor: "#1b2d56",
        backgroundColor: "white",
        // marginTop: s(18),
        justifyContent: "center", alignItems: "center"
    },
    box1: {
        backgroundColor: "#1b2d56",
        width: "100%",
        height: "100%",
        borderRadius: s(20),
        marginTop: s(10)
    },
    box2: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: s(20),
        alignItems: "center"
    },
    edit: {
        backgroundColor: "#0b44bd",
        width: s(25),
        height: s(25),
        borderRadius: s(20),
        position: "absolute",
        marginLeft: s(60),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Profile

