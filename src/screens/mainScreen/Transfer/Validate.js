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

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const Validate = ({ navigation }) => {

    const [banks, setBanks] = useState([])
    const [bankName, setBankName] = useState({})
    const [visible, setVisible] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [beneficiary, setBeneficiary] = useState("")
    const [tranId, setTranId] = useState("")
    const [tranRes, setTranRes] = useState({})
    const [anError, setAnError] = useState(null)

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
        accountNo: Yup.string().required('Account Number is Required'),
        amount: Yup.string().required('Enter Amount is Required'),
        narration: Yup.string().required('Narration is Required'),
    });

    const { auth: { user } } = useSelector(state => state)


    const validateAccount = async (accountNo, amount, res) => {
        const url = `${cred.URL}/vas/transfer/validation`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }

        const body = {
            "service": "transfer",
            "amount": amount,
            "accountNo": accountNo,
            "bankCode": bankName.bankCode,
            "channel": "mobile"
        }

        try {
            const data = await axios.post(url, body, options)
            console.log(data.data)

            const { message, response, transactionId, responseCode } = data.data
            if (responseCode === "00") {
                setBeneficiary(response.name )
                setTranId(transactionId)
                setTranRes(response)
                setAnError(null)
            }else{
                Alert.alert(`${message}`)
                setBeneficiary(message)
                setAnError(message)
            }



        } catch (error) {
            setAnError(error.response.data)
            console.log(error.response.data, "from catch")
        }
    }


    const getBanks = async (service) => {
        setIsLoading(true)
        const url = `${cred.URL}/vas/get-bank-codes`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }
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
            <View style={{ flex: 1, marginTop: s(50), marginLeft: s(18), width: "90%" }}>

                <View style={{ flexDirection: "row", marginBottom: s(40) }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left-thick' size={s(21)} />
                    </TouchableWithoutFeedback>

                    <View style={{ justifyContent: "center", marginLeft: s(80) }}>
                        <Text style={{ fontSize: s(15), fontWeight: "500" }}>Send Money To</Text>
                    </View>
                </View>

                <Formik
                    initialValues={{ banks: bankName.bankName ? `${bankName.bankName}` : "", accountNo: "", amount: "", narration: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                navigation.navigate("TransferSummary", { data: tranId, tranRes, res })
                            })
                            .catch((err) => Alert.alert('Please provide proper details', err.message));
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
                                        <MaterialCommunityIcons name='chevron-down' size={s(28)} />
                                    </TouchableWithoutFeedback>
                                </View>

                                {visible === true && (
                                    <View>
                                        <Text style={{ marginTop: s(25) }}>How much do you want to send</Text>
                                        <View style={styles.emailContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Min N10'
                                                onChangeText={handleChange('amount')}
                                                value={values.amount}
                                                keyboardType='numeric'
                                            />


                                        </View>

                                        <Text style={{ marginTop: s(25) }}>Enter Account Number?</Text>
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
                                        {beneficiary && (<View style={{ marginTop: s(8) }}>
                                            <Text style={{ fontSize: s(8), fontWeight: "500", marginBottom: s(5) }}>Beneficiary name</Text>
                                            <Text style={{ color: "#3B81E3" }}>{beneficiary}</Text>
                                        </View>)}

                                        <Text style={{ marginTop: s(25) }}>Narration</Text>
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
                                {visible === true && anError == null && (<AppButton title="Complete Transfer" onPress={handleSubmit} isSubmitting={loading} style={{ marginTop: s(30) }} />)}
                            </View>


                        );
                    }}
                </Formik>

                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={styles.modalScreen}>
                        <View style={styles.transparentContainer} />
                        <SafeAreaView style={styles.contentContainer}>
                            <View style={styles.closeIconContainer}>
                                <TouchableWithoutFeedback onPress={close}>
                                    <MaterialCommunityIcons name="close-circle" size={s(25)} />
                                </TouchableWithoutFeedback>
                            </View>
                            <ScrollView style={styles.scrollView}>
                                {loading === true ? (
                                    <ActivityIndicator color="black" />
                                ) : null}
                                {bank.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.bankList}
                                            onPress={() => {
                                                close();
                                                setValue(item);
                                            }}
                                            key={key}
                                        >
                                            <View
                                                style={{
                                                    width: s(50),
                                                    height: s(50),
                                                    backgroundColor: "lightgrey",
                                                    borderRadius: s(50),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <MaterialCommunityIcons name="bank" size={s(22)} />
                                            </View>
                                            <Text style={{ fontSize: s(14), fontWeight: "500", marginLeft: s(12) }}>
                                                {item.bankName}
                                            </Text>
                                        </TouchableOpacity>
                                    );
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

    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(20),
      
    },

    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: s(0.5),
        paddingBottom: s(1),
        width: '100%',
        height: s(45),
        marginTop: '2%',
    },
    input: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    loading: {
        marginTop: s(45),
        width: s(25),
        height: s(25),
        justifyContent: "center",
        alignItems: "center"
    },

    closeIconContainer: {
        alignItems: "flex-end",
        marginTop: s(10),
        marginRight: s(10),
    },
    scrollView: {
        flex: 1,
       
    },
    bankList: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: s(10),
        marginLeft: s(10)
    },
    modalContainer: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(10),
    },

})

export default Validate