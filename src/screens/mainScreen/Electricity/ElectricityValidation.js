import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from '../../../constants/color'
import { Formik } from 'formik'
import AppButton from '../../../components/AppButtonBlue'
import { s } from 'react-native-size-matters'
import cred from '../../../config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import KeyboardAvoidView from '../../../components/KeyboardAvoidingView'




const ElectricityValidation = ({ navigation, route }) => {

    const { image, name } = route.params


    const [selectedOption, setSelectedOption] = useState("prepaid")
    const [phase, setPhase] = useState(1)
    const [accountName, setAccountName] = useState("")
    const [responseData, setResponseData] = useState({})
    const [error, setError] = useState("")
    const [value, setValues] = useState({})

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }
    const Schema = Yup.object().shape({
        meterNumber: Yup.string().required('Meter Number is Required'),
        amount: Yup.string().required('Enter Amount is Required'),
        phoneNumber: Yup.string().required('Phone Number is Required'),
    });

    const { auth: { user } } = useSelector(state => state)


    const electricityValidation = async (value, amount) => {
        const url = `${cred.URL}/vas/electricity/validation`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }
        const body = {
            "account": value,
            "accountType": phase === 1 ? "prepaid" : "postpaid",
            "service": name,
            "amount": amount,
            "channel": "mobile"
        }


        try {

            const data = await axios.post(url, body, options)

            const { message, response, responseCode, transactionStatus } = data.data
            console.log(data.data)
            if (responseCode === "00") {
                setAccountName(response.name)
                setResponseData(data.data)
            } else {
                setError("Meter Number unknown")
                console.log(response)
            }

        } catch (error) {
            console.log(error.response.data)
            const { message } = error.response.data
            setError(`${message}`)
        }
    }


    return (
        <>
            <View style={{ flexDirection: "row", marginTop: s(10), justifyContent: "space-between", alignItems: "center", padding: s(10) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} color="black" />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: s(20), fontWeight: "500", color: "black" }}>Electricity</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image source={image} style={{ width: s(80), height: s(50) }} />
                </View>

            </View>



            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => { handleOptionPress('prepaid'), setPhase(1) }}>
                    <Text style={selectedOption === "prepaid" ? styles.selectedOption : styles.unselectedOption}>Prepaid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleOptionPress('postpaid'), setPhase(2) }}>
                    <Text style={selectedOption === "postpaid" ? styles.selectedOption : styles.unselectedOption}>Postpaid</Text>
                </TouchableOpacity>

            </View>

            {phase === 1 && (<KeyboardAvoidView style={{ marginTop: s(30), marginLeft: s(18), width: "100%" }}>
                <Formik
                    initialValues={{
                        meterNumber: "", // Preserve the existing value if available, or set it as an empty string
                        phoneNumber: "",
                        amount: "",
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {

                                navigation.navigate("ElectricitySummary", { data: responseData, image: image, value: res });
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;
                        const handleAccountChange = (value) => {
                            handleChange("meterNumber")(value);

                            let validationTimer;

                            if (value.length === 11) {
                                clearTimeout(validationTimer); // Clear any existing timer

                                validationTimer = setTimeout(() => {
                                    electricityValidation(value, values.amount);
                                }, 5000);
                            } else if (value.length === 13) {
                                clearTimeout(validationTimer); // Clear the timer if 13 digits are entered
                                electricityValidation(value, values.amount);
                            }
                        };

                        return (
                            <>
                                <View>
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Amount</Text>
                                    <View style={styles.loginContainer1}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='₦0.00'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleChange('amount')}
                                            value={values.amount}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    {/* <Text style={{ marginLeft: 5, marginBottom: 15, color: "#c66e54", fontSize: 12 }}>Min. amount ₦1000 </Text> */}
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Meter Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Meter Number'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleAccountChange}
                                            value={values.meterNumber}
                                            keyboardType='numeric'
                                            maxLength={13}
                                        />
                                    </View>
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Customer's Name</Text>
                                    <View style={styles.accountName}>
                                        {accountName ? <Text style={{ color: "#3c68f8", fontWeight: "500" }}>{accountName}</Text> : error ? <Text style={{ color: "#d0312d", fontWeight: "500" }}>{error}</Text> : <Text style={{ color: "#d4d4d4", fontWeight: "500" }}>Account Name</Text>}
                                    </View>

                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Phone Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Phone Number'
                                            placeholderTextColor="lightgrey"
                                            keyboardType='numeric'
                                            onChangeText={handleChange('phoneNumber')}
                                            value={values.phoneNumber}
                                        />
                                    </View>
                                </View>
                                {accountName && <AppButton title="Confirm Transfer" style={{ width: "90%" }} onPress={handleSubmit} />}
                            </>
                        );

                    }}

                </Formik>

            </KeyboardAvoidView>)}


            {/* phase 2  */}

            {phase === 2 && (<KeyboardAvoidView style={{ marginTop: s(30), marginLeft: s(18), width: "100%" }}>
                <Formik
                    initialValues={{
                        meterNumber: "", // Preserve the existing value if available, or set it as an empty string
                        phoneNumber: "",
                        amount: "",
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {

                                navigation.navigate("ElectricitySummary", { data: responseData, image: image, value: res });
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;
                        const handleAccountChange = (value) => {
                            handleChange("meterNumber")(value);

                            if (value.length >= 11) {
                                electricityValidation(value, values.amount);
                            }
                        };

                        return (
                            <>
                                <View>
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Amount</Text>
                                    <View style={styles.loginContainer1}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='₦0.00'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleChange('amount')}
                                            value={values.amount}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    {/* <Text style={{ marginLeft: 5, marginBottom: 15, color: "#c66e54", fontSize: 12 }}>Min. amount ₦100 </Text> */}
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Meter Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Meter Number'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleAccountChange}
                                            value={values.meterNumber}
                                            keyboardType='numeric'
                                            maxLength={11}
                                        />
                                    </View>
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Customer's Name</Text>
                                    <View style={styles.accountName}>
                                        {accountName ? <Text style={{ color: "#3c68f8", fontWeight: "500" }}>{accountName}</Text> : <Text style={{ color: "#d4d4d4", fontWeight: "500" }}>Account Name</Text>}
                                    </View>

                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter Phone Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Phone Number'
                                            placeholderTextColor="grey"
                                            keyboardType='numeric'
                                            onChangeText={handleChange('phoneNumber')}
                                            value={values.phoneNumber}
                                        />
                                    </View>
                                </View>
                                {accountName && <AppButton title="Confirm Transfer" style={{ width: "90%" }} onPress={handleSubmit} />}
                            </>
                        );

                    }}

                </Formik>

            </KeyboardAvoidView>)}


        </>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: 50,
        marginTop: '2%',
        marginBottom: 15
    },
    loginContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: 50,
        marginTop: '2%',
        marginBottom: 5
    },
    input: {
        flex: 1,
        height: 35,
        color: "black"
    },

    selectedOption: {
        borderWidth: 2,
        color: "black",
        fontWeight: "600",
        borderColor: color.primary2,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    unselectedOption: {
        borderBottomWidth: 0,
        color: "black",
        fontWeight: "600",
    },
    accountName: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: 50,
        marginTop: '2%',
        marginBottom: 15
    }
})

export default ElectricityValidation

