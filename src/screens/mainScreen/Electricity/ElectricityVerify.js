import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import KeyboardAvoidingViewNB from '../../../components/KeyboardAvoidingView'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ElectricityPin from './ElectricityPin'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const ElectricityVerify = ({ navigation, data, value, setModalVisible }) => {

    // const data = route.params
    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const maxLength = 4


    return (
        <View style={styles.container}>
            {/* <Pressable onPress={Keyboard.dismiss}> */}
           
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                    
                    <View style={styles.textCont}>
                        <Text style={styles.text2}>Enter Transaction Pin</Text>
                    </View>
                </View>
                <View>

                    <ElectricityPin
                        code={code}
                        setCode={setCode}
                        setPinReady={setPinReady}
                        maxLength={maxLength}
                        navigation={navigation}
                        data={data}
                        value={value}
                        setModalVisible={setModalVisible}
                    />



                </View>
            {/* </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    textCont: {
        marginBottom: s(20),
        alignItems: "center"
    },
    text2: {
        fontSize: s(14),
        fontWeight: "500"
    },

    text1: {
        fontSize: s(16),
        marginTop: s(4),
        fontWeight: "bold"
    },
   
    iconCont: {
        marginLeft: s(8),
    }, 
    container: {
        backgroundColor: "white",
        width: "90%",
        marginLeft: s(18),
        borderRadius: s(18),
    },
    // duration: {
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // durationT1: {
    //     fontSize: 15
    // },
    // durationT2: {
    //     fontSize: 17,
    //     fontWeight: 'bold',
    //     marginTop: 10,
    //     fontStyle: 'italic'
    // }
});

export default ElectricityVerify