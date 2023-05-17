import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { color } from '../../../constants/color'

import cred from '../../../config'
import axios from 'axios'


const InputFieldOTP = ({ code, setCode, setPinReady, maxLength, navigation, data }) => {
    const [isContFocus, setIsConFocus] = useState(false)
    const inputRef = useRef(null)
    

    const digitArray = new Array(maxLength).fill(0)

    const digitInput = (_value, index) => {
        const emptyInputNum = " "
        const digit = code[index] || emptyInputNum

        return(
            <View style={styles.box} key={index}>
                 <Text style={styles.text}>{digit}</Text>
            </View>
        )
    }

    const handlePress = () => {
        setIsConFocus(true)
        inputRef.current.focus()
    }

    const handleOnBlur = () => {
        setIsConFocus(true)
    }

    useEffect(() => {
        if(code.length === maxLength){
            makeTransfer()
            setCode('')
        }
       
        
    }, [code])

    const makeTransfer = async() => {
        const url = `${cred.URL}/vas/transfer/payment`
        const options = { headers: { Authorization: cred.API_KEY, Token: cred.TOKEN } }
        const body = {
            "phoneNumber": data.data.phoneNumber,
            "narration": data.data.narration ? data.data.narration : "",
            "transactionId": data.data.transactionId,
            "service": "transfer",
            "senderName": data.data.senderName,
            "uniqueId": data.data.uniqueId,
            "paymentMethod": "cash",
            "pin": code
        }

        console.log(body)

        try {
            const data = await axios.post(url, body, options)

            const { message, response, responseCode } = data.data
            
            if(responseCode === "00"){
                navigation.navigate("Completed", { data: response })
            }

            
        } catch (error) {
            const { message } = error.response.data
            Alert.alert(`${message}`)
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
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0
     },
     box: {
         borderWidth: 2,
         borderColor: "grey",
         minWidth: '15%',
         padding: 12,
         borderRadius: 5,
     },
     container: {
         width: '70%',
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginLeft: 50,
         marginBottom: 20
     },
     text: {
         fontSize: 20,
         fontWeight: 'bold',
         textAlign: 'center',
         color: "black"
     }
});

export default InputFieldOTP