import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native'
import { color } from '../constants/color'
import { useSelector } from "react-redux"
import AppButton from './AppButtonWhite'

import cred from '../config'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';


const Pin = ({ code, setCode, setPinReady, maxLength, navigation, data, secureTextEntry, setModalVisible }) => {
    const [isContFocus, setIsConFocus] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setIsLoading] = useState(false)
    const inputRef = useRef(null)
    const dispatch = useDispatch()


    const digitArray = new Array(maxLength).fill(0)

    const digitInput = (_value, index) => {
        // const emptyInputNum = " "
        // const digit = code[index] || emptyInputNum
        const digit = code[index] || '';
        const displayDigit = digit ? '*' : '';

        return (
            <View style={styles.box} key={index}>
                <Text style={styles.text}>{displayDigit}</Text>
            </View>
        )
    }

    const handlePress = () => {
        setIsConFocus(true)
        setError(null)
        inputRef.current.focus()
    }

    const handleOnBlur = () => {
        setIsConFocus(true)
    }

    // useEffect(() => {
    //     if (code.length === maxLength) {
    //         verifyOTP()
    //         setCode('')
    //     }


    // }, [code])



    const verifyOTP = async () => {

        setIsLoading(true)
        const url = `${cred.URL}/auth/verify-email`
        const body = {
            "email": data.data,
            "activationPin": code
        }


        try {
            const data = await axios.post(url, body)

            const {message, status, token} = data.data
            

            if (status === "success") {
                Alert.alert(status, "Account Verification Successful")
                navigation.navigate("createPin")
                dispatch({ type: "LOGIN", user: { token: `${token}` } })
                setIsLoading(false)

            } else {
                setIsLoading(false)
                setError(message, "could'nt verify your email")
            }

        } catch (error) {
            setIsLoading(false)
            const { message } = error.response.data
            setError(message)
        }
    }

    return (
        <>
            <Pressable style={styles.container} onPress={handlePress}>
                {/* <View style={styles.box}> */}
                {/* <Text style={styles.text}></Text> */}
                {digitArray.map(digitInput)}
                {/* </View> */}
            </Pressable>

            <View style={styles.inputBox}>
                <TextInput
                    keyboardType='numeric'
                    value={code}
                    onChangeText={setCode}
                    maxLength={maxLength}
                    textContentType='oneTimeCode'
                    returnKeyType='done'
                    ref={inputRef}
                    onBlur={handleOnBlur}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.textCont}>
                {error && <Text style={{ fontSize: s(11), color: "red", marginLeft: s(8) }}>{error}</Text>}
                <View style={{ flexDirection: "row", marginTop: s(5) }}>
                    <Text style={styles.text2}>Didn't get an OTP?</Text><TouchableOpacity><Text style={styles.text3}>Resend</Text></TouchableOpacity>
                </View>

            </View>

            <AppButton title="Confirm Pin" isSubmitting={loading} onPress={() => verifyOTP()} style={styles.btn} />
        </>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,

    },
    box: {
        borderWidth: 2,
        borderColor: "#454A5E",
        width: s(45),
        height: s(50),
        padding: s(10),
        borderRadius: 5,
        marginRight: s(10),
        backgroundColor: "#454A5E"
    },
    container: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: s(50),
        marginBottom: s(18)
    },
    text: {
        fontSize: s(25),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white"
    },
    btn: {
        backgroundColor: "white",
        top: '50%',
        height: s(50),
        marginBottom: s(20),
        width: '90%',
        marginLeft: s(18)
    },
    text2: {
        color: "#6e6e6e",
        fontSize: s(9)
    },
    text3: {
        color: "#3483f5",
        fontSize: s(10),
        marginLeft: s(3)
    },
    textCont: {
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default Pin