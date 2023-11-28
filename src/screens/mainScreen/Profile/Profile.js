import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { s, ms, vs } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { image } from '../../../constants/images'
import { color } from '../../../constants/color'
import Clipboard from '@react-native-clipboard/clipboard'
import { ScrollView } from 'react-native-gesture-handler'
import cred from '../../../config'
import axios from 'axios'

import { launchImageLibrary } from 'react-native-image-picker'


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState({
        "firstName": "N/a",
        "lastName": "N/a",
        "email": "N/a",
        "walletId": "N/a",
        "agentType": "N/a"
    })
    const [error, setError] = useState(null)

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

    const uploadImage = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            if (result) {
                changeImage(result.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const changeImage = async (result) => {

        const url = `${cred.URL}/auth/profile-picture`
        const options = { headers: { Authorization: `Bearer ${user.token}`, "content-type": "multipart/form-data" } }

        const formData = new FormData();
        formData.append('picture', { uri: result, name: 'picture.jpg', type: 'image/jpeg' })

        try {
            const response = await axios.post(url, formData, options)
            const { status, message, } = response.data

            if (status !== "success") {
                setError(message)
            } else {
                Alert.alert(`${message}`)
                getProfile()
            }

        } catch (error) {
            console.log(error, "got tot catch")

            if (error.response && error.response.data) {
                const { message } = error.response.data
                setError(message)
            } else {
                setError('An error occur while uploading documents')
            }
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#49001b" }}>
            <View style={{ marginTop: s(30), flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: s(10) }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
                    <MaterialCommunityIcons name="arrow-left-thick" size={s(25)} color="white" />
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: "row" }}>

                    <View style={styles.profileImage}>
                        {userData.picture ? <Image source={{ uri: userData.picture }} style={{ width: 80, height: 80, borderRadius: 50 }} /> : <Image source={image} style={{ width: 80, height: 80, borderRadius: 50, }} />}
                    </View>
                    <TouchableOpacity onPress={() => uploadImage()} style={styles.edit}>
                        <MaterialCommunityIcons name="camera-outline" color="#ffffff" size={s(15)} />
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
                    <MaterialCommunityIcons name="cog" size={s(25)} color="white" />
                </TouchableWithoutFeedback>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ alignItems: "center", }}>

                    <View style={{ alignItems: "center", marginTop: s(10) }}>
                        <Text style={{ color: "white", fontSize: s(17), fontWeight: "600" }}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ color: "white", fontSize: s(12), fontWeight: "400", marginTop: s(3) }}>{userData.email}</Text>
                    </View>
                </View>

                <View style={{ marginTop: s(30), marginLeft: s(20), flexDirection: "row", alignItems: "center" }} >
                    <Text style={{ color: "white", fontWeight: "500", fontSize: s(12) }}>WALLET ID: {userData.walletId}</Text>
                    <TouchableOpacity onPress={() => handleCopy(user.walletId)}>
                        <Ionicons name="copy-outline" size={s(12)} color="white" style={{ marginLeft: s(5) }} />
                    </TouchableOpacity>

                </View>

                <View style={styles.box1}>

                    <View style={styles.box2}>
                        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={{ backgroundColor: "white", marginTop: s(20), width: "90%", height: s(55), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIcons name="clipboard-edit" size={s(20)} color="white" />
                                </View>
                                <View>
                                    <Text style={{ color: "black", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Edit Profile</Text>
                                    <Text style={{ color: "black", fontWeight: "400", fontSize: s(10), marginLeft: s(20), marginTop: s(1)}}>Make changes to your profile</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="menu-right" size={s(30)} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("History")} style={{ backgroundColor: "white", marginTop: s(2), width: "90%", height: s(55), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIcons name="clipboard-list" size={s(20)} color="white" />
                                </View>
                                <View>
                                    <Text style={{ color: "black", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Transaction History</Text>
                                    <Text style={{ color: "black", fontWeight: "400", fontSize: s(10), marginLeft: s(20), marginTop: s(1)}}>Quick view of your wallet history</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="menu-right" size={s(30)} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: "white", marginTop: s(2), width: "90%", height: s(55), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIcons name="help-network" size={s(20)} color="white" />
                                </View>
                                <View>
                                    <Text style={{ color: "black", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Help & Support</Text>
                                    <Text style={{ color: "black", fontWeight: "400", fontSize: s(10), marginLeft: s(20), marginTop: s(1)}}>Contact Us for help & support</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="menu-right" size={s(30)} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("test")} style={{ backgroundColor: "white", marginTop: s(2), width: "90%", height: s(55), flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: s(30), height: s(30), backgroundColor: "#6C6C6C", borderRadius: s(5), justifyContent: "center", alignItems: "center" }}>
                                    <MaterialCommunityIcons name="clipboard-list" size={s(20)} color="white" />
                                </View>
                                <View>
                                    <Text style={{ color: "black", fontWeight: "600", fontSize: s(14), marginLeft: s(20) }}>Wallet History</Text>
                                    <Text style={{ color: "black", fontWeight: "400", fontSize: s(10), marginLeft: s(20), marginTop: s(1)}}>View activities on your wallet</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="menu-right" size={s(30)} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    profileImage: {
        width: s(80),
        height: s(80),
        borderWidth: s(4),
        borderRadius: s(100),
        borderColor: "#1b2d56",
        backgroundColor: "white",
        // marginTop: s(18),
        justifyContent: "center", alignItems: "center"
    },
    box1: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        borderRadius: s(20),
        marginTop: s(20)
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
        marginLeft: s(70),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Profile

