import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Keyboard, SafeAreaView, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PinField from '../../components/Pin.js'
import { Lock } from '../../constants/images.js'
import KeyboardAvoidView from '../../components/KeyboardAvoidingView.js'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const AuthOTP = ({ navigation, route }) => {

    const data = route.params
    console.log(data)


    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const maxLength = 4


    return (
            <View style={styles.container}>
                {/* <Pressable onPress={Keyboard.dismiss}> */}
                <View style={{ alignItems: "center", marginTop: s(70) }}>
                    <Image source={Lock} style={{ width: s(60), height: s(60) }}/>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: s(30) }}>

                    <View style={styles.textCont}>
                    <Text style={styles.text4}>Enter OTP Below</Text>
                        <Text style={styles.text2}>We sent an OTP code your email</Text>
                        <Text style={styles.text1}>address just now</Text>
                        <Text style={styles.text3}>{data.data.toLowerCase()}</Text>
                    </View>
                </View>
                <View>

                    <PinField
                        code={code}
                        setCode={setCode}
                        setPinReady={setPinReady}
                        maxLength={maxLength}
                        navigation={navigation}
                        data={data}
                        secureTextEntry={true}

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
        fontSize: s(12),
        fontWeight: "500",
        color: "#6e6e6e"
    },

    text1: {
        fontSize: s(12),
        marginTop: s(4),
        fontWeight: "500",
        color: "#6e6e6e"
    },

    text3: {
        fontSize: s(12),
        marginTop: s(4),
        fontWeight: "500",
        color: "#ffff",
        marginTop: s(40)
    },

    text4: {
        fontSize: s(14),
        marginTop: s(4),
        fontWeight: "500",
        color: "#ffff",
        marginBottom: s(20)
    },

    iconCont: {
        marginLeft: s(8),
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#060C27",
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

export default AuthOTP