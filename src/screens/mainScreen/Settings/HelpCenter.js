import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { airtel, mtn, glo } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { s } from 'react-native-size-matters'


const HelpCenter = ({ navigation }) => {

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

                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>Help Center</Text>
                    <Text></Text>
                </View>

                <View style={{ alignItems: "center", marginBottom: s(30) }}>
                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>We Glad To Help You</Text>
                    <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Our Crew Are On Standby</Text>
                </View>

                <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(1)}>
                    <MaterialCommunityIcon name="chat-processing" size={30} color="#1b2d56" />
                    <View>
                        <Text style={{ fontWeight: "600", fontSize: s(14), marginLeft: 20 }}>Chat</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: s(10) }}>Start a Conversation Now</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>

                <TouchableOpacity style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="help-circle" size={30} color="#1b2d56" />
                    <View>
                    <Text style={{ fontWeight: "600", fontSize: s(14), marginLeft: 20 }}>FAQs</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: s(10) }}>Find Fast Answers Now</Text>
                    </View>
                    
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(2)}>
                    <MaterialCommunityIcon name="email" size={30} color="#1b2d56" />
                    <View>
                    <Text style={{ fontWeight: "600", fontSize: s(14), marginLeft: 20 }}>Email</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: s(10) }}>Get a Solution in Your inbox</Text>
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
        backgroundColor: "#f5f5f5",
        marginTop: s(10)
    }
})

export default HelpCenter

