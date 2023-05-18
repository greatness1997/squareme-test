import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import KeyboardAvoidingViewNB from '../../../components/KeyboardAvoidingView'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AirtimeOTP from './AirtimeOTP'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const AirtimeVerify = ({ navigation, route }) => {

    const data = route.params

    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const maxLength = 4


    return (
        <View style={styles.container}>
            {/* <Pressable onPress={Keyboard.dismiss}> */}
            <TouchableOpacity style={styles.iconCont} onPress={() => navigation.navigate('Home')}>
                        <MaterialCommunityIcons name="close-circle" size={30} />
                    </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                    
                    <View style={styles.textCont}>
                        <Text style={styles.text2}>Enter To Complete</Text>
                        <Text style={styles.text1}>Transfer</Text>
                    </View>
                </View>
                <View>

                    <AirtimeOTP
                        code={code}
                        setCode={setCode}
                        setPinReady={setPinReady}
                        maxLength={maxLength}
                        navigation={navigation}
                        data={data}
                    />



                </View>
            {/* </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    textCont: {
        marginBottom: s(35),
        alignItems: "center"
    },
    text2: {
        fontSize: s(16),
        marginTop: s(8),
        fontWeight: "bold"
    },
    text1: {
        fontSize: s(16),
        marginTop: s(3),
        fontWeight: "bold"
    },
    iconCont: {
        marginLeft: s(8),
        marginTop: s(8)
    }, 
    container: {
        backgroundColor: "white",
        width: "90%",
        height: s(240),
        marginLeft: s(18),
        borderRadius: s(18),
        marginTop: s(130)
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

export default AirtimeVerify