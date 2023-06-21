import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { airtel, mtn, glo } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { s } from 'react-native-size-matters'


const Settings = ({ navigation }) => {

    const [activeBox, setActiveBox] = useState(null)

    const handleBoxPress = (boxIndex) => {
        setActiveBox(boxIndex)
    }



    return (
        <SafeAreaView>


            <View style={{ padding: 0, marginTop: 0, width: "100%" }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20), marginBottom: s(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>Settings</Text>
                    <Text></Text>
                </View>

                <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(1)}>
                    <MaterialCommunityIcon name="gift" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Refer & Earn</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Refer your friends and get a bonus</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>

                <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="headset" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Help Center</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Have an issue? Speak to our</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity onPress={() => navigation.navigate("ResetCode2", {data: "from settings"})} style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="lock-reset" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Change Password</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Change your old password</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(3)}>
                    <MaterialCommunityIcon name="key-change" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Change Pin</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Change your transaction pin</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity style={styles.serviceContainer} onPress={() => navigation.navigate("login")}>
                    <MaterialCommunityIcon name="logout" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Logout</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: "90%",
        height: 70,
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        backgroundColor: "#f5f5f5"
    }
})

export default Settings

