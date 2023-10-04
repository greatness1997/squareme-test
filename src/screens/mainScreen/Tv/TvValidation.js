import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
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




const TvValidation = ({ navigation, route }) => {

    const { image, name } = route.params


    const [bouquet, setBouquet] = useState([])
    const [phase, setPhase] = useState(1)
    const [accountName, setAccountName] = useState("")
    const [responseData, setResponseData] = useState({})
    const [error, setError] = useState("")
    const [value, setValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [nam, setNam] = useState('')
    const [code, setCode] = useState('')
    const [pric, setPric] = useState('')
    const [mont, setMont] = useState('')

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }
    const Schema = Yup.object().shape({
        iucNumber: Yup.string().required('IUC Number is Required'),
        phoneNumber: Yup.string().required('Phone Number is Required'),
    });

    const { auth: { user } } = useSelector(state => state)


    const getBouquet = async () => {
        const url = `${cred.URL}/vas/cabletv/bouquets`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }
        const body = {
            "decoderType": name,
            "service": "multichoice",
        }

        try {

            const data = await axios.post(url, body, options)

            const { message, response, responseCode, transactionStatus } = data.data

            if (message === "Successful") {
                setBouquet(response)
                // console.log(response[0].availablePricingOptions)
            }


        } catch (error) {
            console.log(error.response.data)
            const { message } = error.response.data
            setError(`${message}`)
        }
    }

    const setBouquetValue = (name, code, price, months) => {
        setNam(name)
        setCode(code)
        setPric(price)
        setMont(months)
    }

    useEffect(() => {
        getBouquet()
    }, [])


    const tvValidation = async (value, amount) => {
        const url = `${cred.URL}/vas/multichoice/validation`
        const options = { headers: { Authorization: cred.API_KEY, Token: user.token } }
        const body = {
            "decoderType": name,
            "iuc": value,
            "service": "multichoice",
            "channel": "mobile"
        }

        try {

            const data = await axios.post(url, body, options)

            const { message, response, responseCode, transactionStatus } = data.data
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
            <View style={{ flexDirection: "row", marginTop: s(30), justifyContent: "space-between", alignItems: "center", padding: s(10) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} color="black" />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: s(18), fontWeight: "600", color: "black" }}>{name.toUpperCase()}</Text>
                </View>
                <View style={[ styles.boxShadow ]}>
                    <Image source={image} style={{ width: s(60), height: s(40), resizeMode: "contain" }} />
                </View>

            </View>

            <KeyboardAvoidView style={{ marginTop: s(30), marginLeft: s(5), width: "100%" }}>
                <Formik
                    initialValues={{
                        iucNumber: "",
                        phoneNumber: "",
                        // amount: "",
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                navigation.navigate("TvSummary", { data: responseData, image: image, value: res, code: code, price: pric, month: mont });
                            })
                            .catch((err) => Alert.alert("Please Provide Proper Details"));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;
                        const handleAccountChange = (value) => {
                            handleChange("iucNumber")(value);

                            let validationTimer;

                            if (value.length === 10) {
                                clearTimeout(validationTimer);

                                validationTimer = setTimeout(() => {
                                    tvValidation(value, values.amount);
                                }, 5000);
                            }else if (value.length === 11) {
                                clearTimeout(validationTimer); 
                                tvValidation(value, values.amount);
                            }
                        };

                        return (
                            <>
                                <View style={{ marginLeft: 15, width: "100%" }}>
                                    {/* <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                    <View style={styles.loginContainer1}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='₦0.00'
                                            onChangeText={handleChange('amount')}
                                            value={values.amount}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <Text style={{ marginLeft: 5, marginBottom: 15, color: "#c66e54", fontSize: 12 }}>Min. amount ₦1000 </Text> */}
                                    <Text style={{ marginLeft: 5, color: "grey" }}>Enter ICU Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='IUC Number'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleAccountChange}
                                            value={values.iucNumber}
                                            keyboardType='numeric'
                                            maxLength={13}
                                        />
                                    </View>

                                    <Text style={{ marginLeft: 5, color: "grey" }}>Phone Number</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Phone Number'
                                            placeholderTextColor="lightgrey"
                                            onChangeText={handleChange('phoneNumber')}
                                            value={values.phoneNumber}
                                            keyboardType='numeric'
                                            maxLength={11}
                                        />
                                    </View>

                                    <Text style={{ marginLeft: 5, color: "grey" }}>Customer's Name</Text>
                                    <View style={styles.accountName}>
                                        {accountName ? <Text style={{ color: "#3c68f8", fontWeight: "500" }}>{accountName}</Text> : error ? <Text style={{ color: "#d0312d", fontWeight: "500" }}>{error}</Text> : <Text style={{ color: "lightgrey", fontWeight: "500" }}>Account Name</Text>}
                                    </View>

                                    {nam && <Text style={{ marginLeft: 5 , color: "grey"}}>Bouquet Name</Text>}
                                    {nam && <View style={styles.accountName}>
                                        <Text style={{ color: "#3c68f8", fontWeight: "500" }}>{nam}</Text> 
                                    </View>}
                                </View>
                                {nam && <AppButton title="Confirm Transfer" style={{ width: "90%", marginBottom: 25, marginLeft: 15 }} onPress={handleSubmit} />}

                               {bouquet ? <Text style={{ marginBottom: 20, fontWeight: "500", fontSize: s(13), alignSelf: "center" }}>Select A Bouquet</Text> : 
                               <Text style={{ marginBottom: 20, fontWeight: "500", fontSize: s(13), alignSelf: "center" }}>Cannot get Bouquet List</Text>}
                               
                                {bouquet && (
                                    <ScrollView style={{ height: "100%", marginBottom: "50%", padding: 10 }}>
                                        {loading === true ? <ActivityIndicator color="black" /> : null}
                                        {bouquet.map((item, key) => {
                                            return (
                                                <TouchableOpacity style={{ marginBottom: s(13) }} key={key} onPress={() => { setBouquetValue(item.name, item.code, item.availablePricingOptions[0].price, item.availablePricingOptions[0].monthsPaidFor ) }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: s(8) }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={{ marginRight: 5, color: "grey" }}>{item.name}</Text>
                                                            <Text style={{ color: "grey" }}>for</Text>
                                                                <Text style={{ marginLeft: 5, color: "grey" }}>{`₦${item.availablePricingOptions[0].price}`}</Text>
                                                        </View>
                                                        {/* <View>
                                                                <Text>{item.validity}</Text>
                                                            </View> */}
                                                    </View>
                                                    <View style={{ width: "95%", height: 1, backgroundColor: "lightgrey", marginLeft: s(8), marginTop: 5 }}></View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>

                                )}
                            </>
                        );

                    }}

                </Formik>

            </KeyboardAvoidView>
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
        borderColor: color.primary2,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    unselectedOption: {
        borderBottomWidth: 0
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
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 3,
    },
})

export default TvValidation

