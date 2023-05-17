import React, { useState, useEffect } from 'react'
import { Modal, ScrollView, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import cred from '../../../config'
import axios from 'axios'

import AppButton from '../../../components/AppButtonBlue';
import KeyboardAvoidingViewNB from '../../../components/KeyboardAvoidingView';



const Validate = ({ navigation }) => {

    const [banks, setBanks] = useState([])
    const [bankName, setBankName] = useState({})
    const [visible, setVisible] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [beneficiary, setBeneficiary] = useState("")
    const [tranId, setTranId] = useState("")
    const [tranRes, setTranRes] = useState({})

    //set banklist in alphabetical order
    const data = banks;
    const bank = [...data].sort((a, b) => {
        const nameA = a.bankName.toUpperCase();
        const nameB = b.bankName.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });



    const close = () => {
        setModalVisible(false)
    }
    const setValue = (value) => {
        setBankName(value)
        if (value !== null) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const Schema = Yup.object().shape({
        banks: Yup.string().required('Please enter a bank name'),
    });

    const { auth: { user } } = useSelector(state => state)

    const validateAccount =  async(accountNo, amount, res) => {
        const url = `${cred.URL}/vas/transfer/validation`
        const options = { headers: { Authorization: cred.API_KEY, Token: cred.TOKEN } }
        const body = {
            "service": "transfer",
            "amount": amount,
            "accountNo": accountNo,
            "bankCode": bankName.bankCode,
            "channel": "mobile"
        }

        try {
            const data = await axios.post(url, body, options)

            const { message, response, transactionId, responseCode } = data.data
            
            setBeneficiary(message)
            setTranId(transactionId)
            setTranRes(response)
            
        } catch (error) {
            console.log(error.response.data, "from catch")
        }
    }


    const getBanks = async (service) => {
        setIsLoading(true)
        const url = `${cred.URL}/vas/get-bank-codes`
        const options = { headers: { Authorization: cred.API_KEY, Token: cred.TOKEN } }
        const body = service

        try {
            setIsLoading(true)
            const data = await axios.post(url, body, options)

            const { message, response, status } = data.data
            setIsLoading(false)
            setBanks(response.bankCodes)
        } catch (error) {
            console.log(error.response.data)
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAvoidingViewNB>
            <View style={{ flex: 1, marginTop: 40, marginLeft: 20, width: "90%" }}>

                <View style={{ flexDirection: "row", marginBottom: 40 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                    </TouchableWithoutFeedback>

                    <View style={{ justifyContent: "center", marginLeft: 100 }}>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>Send Money To</Text>
                    </View>
                </View>

                <Formik
                    initialValues={{ banks: bankName.bankName ? `${bankName.bankName}` : "", accountNo: "", amount: "", narration: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                navigation.navigate("TransferSummary", {data: tranId, tranRes, res})
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;

                        const handleAccountChange = (value) => {
                            handleChange("accountNo")(value);
                          
                            if (value.length >= 10) {
                              validateAccount(value, values.amount);
                            }
                          };

                        return (
                            <View>
                                <Text>What Bank?</Text>
                                <View style={styles.emailContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Select Recipient Bank'
                                        onChangeText={handleChange('banks')}
                                        value={values.banks}
                                    />
                                    <TouchableWithoutFeedback onPress={() => { setModalVisible(true), getBanks({ service: "transfer" }) }}>
                                        <MaterialCommunityIcons name='chevron-down' size={30} />
                                    </TouchableWithoutFeedback>
                                </View>

                                {visible === true && (
                                    <View>
                                        <Text style={{ marginTop: 30 }}>How much do you want to send</Text>
                                        <View style={styles.emailContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Min N10'
                                                onChangeText={handleChange('amount')}
                                                value={values.amount}
                                                keyboardType='numeric'
                                            />


                                        </View>

                                        <Text style={{ marginTop: 30 }}>Enter Account Number?</Text>
                                        <View style={styles.emailContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Account Number'
                                                onChangeText={handleAccountChange}
                                                keyboardType='numeric'
                                                value={values.accountNo}
                                                maxLength={10}
                                            />
                                        </View>
                                       { beneficiary && (<View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 10, fontWeight: "500", marginBottom: 5 }}>Beneficiary name</Text>
                                            <Text style={{ color: "#3B81E3" }}>{beneficiary}</Text>
                                        </View> )}

                                        <Text style={{ marginTop: 30 }}>Narration</Text>
                                        <View style={styles.emailContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='What is it for?'
                                                onChangeText={handleChange('narration')}
                                                value={values.narration}
                                            />

                                        </View>
                                    </View>
                                )}
                                {visible === true && (<AppButton title="Complete Transfer" onPress={handleSubmit} isSubmitting={loading} style={{ marginTop: 60 }} />)}
                            </View>


                        );
                    }}
                </Formik>

                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    style={{ flex: 1 }}
                >

                    <View style={styles.modalContainer}>
                        <View style={styles.overlay} />
                        <SafeAreaView style={styles.modalContent}>
                            <View style={styles.closeIconContainer}>
                                <TouchableWithoutFeedback onPress={close}>
                                    <MaterialCommunityIcons name="close-circle" size={25} />
                                </TouchableWithoutFeedback>
                            </View>
                            <ScrollView style={styles.scrollView}>
                                {loading === true ? <ActivityIndicator color="black"   /> : null}
                                {bank.map((item, key) => {
                                    return (
                                        <TouchableOpacity style={styles.bankList} onPress={() => { close(), setValue(item) }} >
                                            <View style={{ width: 50, height: 50, backgroundColor: "lightgrey", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                                <MaterialCommunityIcons name="bank" size={25} />
                                            </View>
                                            <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 15 }}>{item.bankName}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingViewNB>
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
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: Dimensions.get('window').height / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        flex: 1,
        marginTop: '50%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
    },
    closeIconContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 20,
    },

    loading: {
        marginTop: 50, 
        width: 30, 
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Validate