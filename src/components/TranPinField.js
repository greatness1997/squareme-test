import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native'
import { color } from '../constants/color'
import { useSelector } from "react-redux"
import AppButton from './AppButtonWhite'

import cred from '../config'
import axios from 'axios'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';


const TranPinField = ({ pin, setPin, pinConfirmation, setPinConfirmation, setPinReady, maxLength, navigation, data, secureTextEntry, setModalVisible }) => {
    const [isContFocus, setIsConFocus] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setIsLoading] = useState(false)
    const inputRef = useRef(null)
    const confirmationInputRef = useRef(null)


    const digitArray = new Array(maxLength).fill(0)
    const digitArray2 = new Array(maxLength).fill(0)

    const digitInput = (_value, index) => {
        // const emptyInputNum = " "
        // const digit = code[index] || emptyInputNum
        const digit = pin[index] || '';
        const displayDigit = digit ? '*' : '';

        return (
            <View style={styles.box} key={index}>
                <Text style={styles.text}>{displayDigit}</Text>
            </View>
        )
    }

    const digitInput2 = (_value, index) => {
        // const emptyInputNum = " "
        // const digit = code[index] || emptyInputNum

        const digitConfirmation = pinConfirmation[index] || '';
        const displayDigitConfirmation = digitConfirmation ? '*' : '';

        return (
            <View style={styles.box} key={index}>
                <Text style={styles.text}>{displayDigitConfirmation}</Text>
            </View>
        )
    }

    const handlePress = () => {
        setIsConFocus(true)
        setError(null)
        inputRef.current.focus()
        setIsLoading(false)
        setPin("")
    }

    const handlePress1 = () => {
        setIsConFocus(true)
        setError(null)
        confirmationInputRef.current.focus()
        setIsLoading(false)
        setPinConfirmation("")
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

    const { auth: { user } } = useSelector(state => state)


    const verifyPin = async () => {
        setIsLoading(true)
        const url = `${cred.URL}/auth/create-transaction-pin`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            "pin": pin,
            "pin_confirmation": pinConfirmation
        }

        
        try {
            const data = await axios.post(url, body, options)

            const {message, status, token} = data.data
            

            if (status === "success") {
                Alert.alert(status, "Transaction Pin Successfully created")
                navigation.navigate("CompleteDetails")
                 setIsLoading(false)

            } else {
                setIsLoading(false)
                setError(message, "could'nt verify your email")
            }

        } catch (error) {
            setIsLoading(false)
            const { message } = error.response.data
            setError(message || "Pin confirmation failed")
            console.log(error)
        }
    }

    return (
        <>

            <Pressable style={styles.container} onPress={handlePress}>
                {digitArray.map(digitInput)}
            </Pressable>

            <View>
                <Text style={styles.pinText}>Confirm Pin</Text>
                <Pressable style={styles.container2} onPress={handlePress1}>
                    {digitArray2.map(digitInput2)}
                </Pressable>
            </View>


            <View style={styles.inputBox}>
                <TextInput
                    keyboardType='numeric'
                    value={pin}
                    onChangeText={setPin}
                    maxLength={maxLength}
                    textContentType='oneTimeCode'
                    returnKeyType='done'
                    ref={inputRef}
                    onBlur={handleOnBlur}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            {error && <Text style={{ fontSize: s(11), color: "red", marginLeft: "20%" }}>{error}</Text>}

            <View style={styles.inputBox1}>
                <TextInput
                    keyboardType='numeric'
                    value={pinConfirmation}
                    onChangeText={setPinConfirmation}
                    maxLength={maxLength}
                    textContentType='oneTimeCode'
                    returnKeyType='done'
                    ref={confirmationInputRef}
                    onBlur={handleOnBlur}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <AppButton title="Create Pin" isSubmitting={loading} onPress={() => verifyPin()} style={styles.btn} />
        </>
    )
}




const styles = StyleSheet.create({
    inputBox: {
        position: 'relative',
        marginBottom: s(18),
        width: 1,
        height: 1,
        opacity: 0,

    },
    inputBox1: {
        position: "relative",
        marginBottom: s(18),
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
    container2: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: s(50),
        marginBottom: s(18),
        marginTop: s(10)
    },
    text: {
        fontSize: s(25),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white"
    },
    btn: {
        backgroundColor: "white",
        height: s(50),
        width: '90%',
        marginLeft: s(18),
        position: "absolute",
        marginTop: 200
    },
    text2: {
        color: "#6e6e6e",
        fontSize: s(10)
    },
    text3: {
        color: "#3483f5",
        fontSize: s(10),
        marginLeft: s(3)
    },
    textCont: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    btn: {
        marginLeft: s(15),
        marginTop: s(80),
        bottom: s(20),
        height: s(50),
        width: '90%',
    },
    pinText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: s(20),
        marginBottom: s(10)
    },
});

export default TranPinField