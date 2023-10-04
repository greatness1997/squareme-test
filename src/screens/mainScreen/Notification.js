import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const Notification = ({ navigation }) => {
    return (
        <>
        <TouchableOpacity style={{ marginTop: 0, padding: 20 }} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon name="arrow-left-thick" size={25}  color="black" />
        </TouchableOpacity>
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 150 }}>
                <Text style={{ fontWeight: "600", fontSize: 16, color: "black" }}>Nothing Here Yet</Text>
            </View>
        </>
    )
}

export default Notification