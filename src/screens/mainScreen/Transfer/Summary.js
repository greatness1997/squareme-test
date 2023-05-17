import React, { useState, useEffect } from 'react'
import { Modal, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'

import cred from '../../../config'
import axios from 'axios'

import SummaryCard from '../../../components/SummaryCard';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwipeButton from '../../../components/SwipeButton';



const Summary = ({ navigation, route }) => {

    const [trasnferBody, setTransferBody] = useState({})

    const data = route.params

      //generate uniqueId
      const generateUniqueId = () => {
        const d = new Date();
        const n = d.getTime();
        const p = user.firstName.substring(0, 5).toUpperCase();

        return `${p}-${n}`;
    };

    const { auth: { user } } = useSelector(state => state)
    
    useEffect(() => {
        const body = {
          phoneNumber: user.phoneNumber,
          narration: data.res.narration,
          transactionId: data.data,
          service: 'transfer',
          senderName: `${user.firstName} ${user.lastName} `,
          uniqueId: generateUniqueId(),
          paymentMethod: 'cash',
        };
    
        setTransferBody(body);
      }, []);

    const next = (trasnferBody) => {
        navigation.navigate("TransferPin", { data: trasnferBody })
    }

   

    return (
        <View style={{ flex: 1, marginTop: 40, marginLeft: 20, width: "90%" }}>

            <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}> 
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: 100 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Transfer Summary</Text>
                </View>
            </View>

            <SummaryCard data={data} />

            <SwipeButton style={{ marginTop: 40 }} onSwipeEnd={() => next(trasnferBody)}/>
          
        </View>
    )
}

const styles = StyleSheet.create({
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 2,
        width: '100%',
        height: 50,
        marginTop: '2%',
        
    },
    input: {
        flex: 1
    },
    bankList: {
        padding: 8
    }
})

export default Summary