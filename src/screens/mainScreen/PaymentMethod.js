import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import { airtel, mtn, glo } from '../../../constants/images'
import AppButton from '../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const SelectNetwork = ({ navigation }) => {

    const [activeBox, setActiveBox] = useState(null)

    const handleBoxPress = (boxIndex) => {
        setActiveBox(boxIndex)
    }

    const boxStyle = (boxIndex) => ({
        backgroundColor: activeBox === boxIndex ? "#0B44BD14" : "white"
    })


    return (
        <>


            <Text style={{ marginTop: 60, marginLeft: 30, fontWeight: '600' }}>Choose your network</Text>


            <View style={{ padding: 10, marginTop: 0, width: "100%" }}>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle(0)]} onPress={() => handleBoxPress(0)}>
                    <MaterialCommunityIcon name="wallet" size={30} color="#391CDB" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Spout wallet</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10}}>Withdraw with your payvice wallet</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.serviceContainer, boxStyle(1)]} onPress={() => handleBoxPress(1)}>
                    <MaterialCommunityIcon name="card-bulleted" size={30} color="#AF1A4B" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Pay with Card</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10}}>Withdraw with your bank card</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle(2)]} onPress={() => handleBoxPress(2)}>
                    <MaterialCommunityIcon name="cellphone" size={30} color="#981AD5" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Pay with CGate</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10}}>Withdraw by dialing a USSD code</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle(3)]} onPress={() => handleBoxPress(3)}>
                    <MaterialCommunityIcon name="phone-dial" size={30} color="#1BBA5E" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Pay with Pay Attitude</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10}}>Withdraw with your phone number</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.serviceContainer, boxStyle(4)]} onPress={() => handleBoxPress(4)}>
                    <MaterialCommunityIcon name="qrcode" size={30} color="#AF1A4B" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Pay with NQR</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10}}>Withdraw by scanning a QR Code</Text>
                    </View>

                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: "90%",
        height: 70,
        borderRadius: 10,
        padding: 5,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingLeft: 20
    }
})

export default SelectNetwork

