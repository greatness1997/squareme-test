import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, Text, SafeAreaView, View, StatusBar, Alert, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { s } from "react-native-size-matters"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import credentials from '../../config'
import axios from 'axios'
import "intl"
import "intl/locale-data/jsonp/en";

import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../../components/AppButtonBlue'

import { mtn, airtel, nineMobile, glo } from "../../constants/images"
import { ikedc, bedc, kadc, ekedc, eedc, abdc, kdc, phdc, aa, ibedc } from "../../constants/images"





const WalletHistory = () => {

    const [transaction, setTransaction] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [startText, setStartText] = useState('')
    const [endText, setEndText] = useState('')
    const [itemValue, setItemValue] = useState()




    const onChange = (selectedDate) => {
        setShow(false);
        if (!selectedDate) return; // Handle case when no date is selected
      
        setDate(selectedDate);
      
        if (mode === 'startdate') {
          setStartText(formatDate(selectedDate));
        } else {
          setEndText(formatDate(selectedDate));
        }
        setMode('');
      };


    const showMode = (currentMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return moment(date).format('MMM DD, YYYY');
        
      };


    const formatter = () => {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + String(date.getDate()).padStart(2, 0);
    }

    const setFilterVal = (value) => {
        setItemValue(value)
    }



    const [filterOptions, setFilterOptions] = useState([
        { name: "Last 7 Days", value: 7, isChecked: false },
        { name: "Last 30 Days", value: 30, isChecked: false }
    ]);

    const handleCheckboxToggle = (index) => {
        const updatedOptions = filterOptions.map((item, i) => {
            return {
                ...item,
                isChecked: i === index,
            };
        });

        setFilterOptions(updatedOptions);
    };

    const { auth: { user } } = useSelector(state => state)

    const today = moment().format('YYYY-MM-DD');
    let startDate;
    if (itemValue) {
      startDate = moment().subtract(itemValue, 'days').format('YYYY-MM-DD');
    } else {
      startDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
    }
    const endDate = today

    const transactionHistory = async () => {

       

        const url = `${credentials.URL2}/user/transaction-history`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            "page": 1,
            "startDate": startText ? startText : startDate,
            "endDate": endText ? endText : endDate,
            "status": "",
            "reference": "",
            "product": "",
            "account": "",
            "channel": "",
            "provider": ""
        }

        try {
            setLoading(true)
            const response = await axios.post(url, body, options)
            const { transactions } = response.data

            setTransaction(transactions.docs)
            setLoading(false)

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            Alert.alert(`${message}`);
            setLoading(false)

        }
    }

    useEffect(() => {
        transactionHistory()
    }, [])

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text>Hello</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
   
})

export default WalletHistory