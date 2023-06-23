import React, { useState, useEffect } from 'react'
import { Modal, ScrollView, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const Options = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const close = () => {
        setModalVisible(false)
    }


    return (
        <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modalScreen}>
                <View style={styles.transparentContainer} />
                <SafeAreaView style={styles.contentContainer}>
                    <View style={styles.closeIconContainer}>
                        <TouchableWithoutFeedback onPress={close}>
                            <MaterialCommunityIcons name="close-circle" size={s(25)} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ padding: 0, marginTop: 0, width: "100%" }}>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20), marginBottom: s(10) }}>

                            <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(1)}>
                                <MaterialCommunityIcons name="gift" size={30} color="#808080" />
                                <View>
                                    <Text style={{ fontWeight: "500", marginLeft: 20 }}>Refer & Earn</Text>
                                    <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Refer your friends and get a bonus</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(20),

    },



})

export default Options