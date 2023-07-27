import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { color } from '../../../constants/color'
import { useSelector } from "react-redux"

import cred from '../../../config'
import axios from 'axios'
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import LoadingScreen from '../../../components/Loading'



const StartimesPin = ({ code, setCode, setPinReady, maxLength, navigation, data, value, price, cod, name,  setModalVisible }) => {
    const [isContFocus, setIsConFocus] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const inputRef = useRef(null)
    

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
        inputRef.current.focus()
    }

    const handleOnBlur = () => {
        setIsConFocus(true)
    }

    useEffect(() => {
        if(code.length === maxLength){
            tvPayment()
            setCode('')
        }
       
        
    }, [code])

    const { auth: { user } } = useSelector(state => state)

     //generate uniqueId
     const generateUniqueId = () => {
        const d = new Date();
        const n = d.getTime();
        const p = user.firstName.substring(0, 5).toUpperCase();

        return `${p}-${n}`;
    };

    const tvPayment = async () => {
        setIsLoading(true)
        const url = `${cred.URL}/vas/startimes/payment`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }
        const body =  {
            "transactionId": data.transactionId,
            "phoneNumber": value.phoneNumber,
            "bouquetCode": cod,
            "bouquet": name,
            "amount": price,
            "type": "subscription",
            "paymentMethod": "cash",
            "uniqueId": generateUniqueId(),
            "pin": code
        }
    

        try {
            const data = await axios.post(url, body, options)

            const { message, response, responseCode, transactionStatus } = data.data
            setModalVisible(false)
            console.log(data.data)
            if (responseCode === "00") {
                navigation.navigate("StartimesCompleted", { data: response })
                setModalVisible(false)
                setIsLoading(false)

            } else {
                Alert.alert(`${transactionStatus}`, `${message}`)
                setModalVisible(false)
                setIsLoading(false)
            }

        } catch (error) {
            setModalVisible(false)
            setIsLoading(false)
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
        {loading && <LoadingScreen />}
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
        width: s(45),
        height: s(45),
        padding: s(10),
        borderRadius: 5,
        marginRight: s(10)
    },
    container: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: s(45),
        marginBottom: s(18)
    },
    text: {
        fontSize: s(25),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black"
    }
});

export default StartimesPin