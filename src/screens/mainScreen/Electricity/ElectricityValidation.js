import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from '../../../constants/color'
import { Formik } from 'formik'
import AppButton from '../../../components/AppButtonBlue'
import { s } from 'react-native-size-matters'
import cred from '../../../config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'


const ElectricityValidation = ({ navigation, route }) => {

    const { image, name } = route.params
    

    const [selectedOption, setSelectedOption] = useState("prepaid")
    const [phase, setPhase] = useState(1)
    const [accountName, setAccountName] = useState("")
    const [responseData, setResponseData] = useState({})

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }
    const Schema = Yup.object().shape({
        meterNumber: Yup.string().required('Phone Number is Required'),
        amount: Yup.string().required('Enter Amount is Required'),
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
0
          

        try {

            const data = await axios.post(url, body, options)

            const { message, response, responseCode, transactionStatus } = data.data
            if(responseCode === "00"){
                setAccountName(response.name)
                setResponseData(data.data)
            }else{
                Alert.alert(`${message}`)
                console.log(response)
            }
            
        } catch (error) {
            console.log(error.response.data)
            const { message } = error.response.data
            Alert.alert(`${message}`)
        }
    }


    return (
        <ScrollView>
            <View style={{ flexDirection: "row", marginTop: s(40), justifyContent: "space-between", padding: s(10) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: s(20), fontWeight: "500" }}>Electricity</Text>
                </View>
                <Text></Text>

            </View>
            <View style={{ alignItems: "center" }}>
                <Image source={image} style={{ width: s(80), height: s(70) }}/>
            </View>


            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => { handleOptionPress('prepaid'), setPhase(1) }}>
                    <Text style={selectedOption === "prepaid" ? styles.selectedOption : styles.unselectedOption}>Prepaid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleOptionPress('postpaid'), setPhase(2) }}>
                    <Text style={selectedOption === "postpaid" ? styles.selectedOption : styles.unselectedOption}>Postpaid</Text>
                </TouchableOpacity>

            </View>

            {phase === 1 && (<View style={{ alignItems: "center", marginTop: 40 }}>
                <Formik
                    initialValues={{ meterNumber: "", amount: "", name: accountName ? accountName : "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                console.log(res)
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
                            <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                <View style={styles.loginContainer1}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='₦0.00'
                                        onChangeText={handleChange('amount')}
                                        value={values}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <Text style={{ marginLeft: 5, marginBottom: 15, color: "#c66e54", fontSize: 12}}>Min. amount ₦100 </Text>
                                <Text style={{ marginLeft: 5 }}>Enter Meter Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleAccountChange}
                                        value={values}
                                        keyboardType='numeric'
                                        maxLength={11}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Customer's Name</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        // onChangeText={handleChange('name')}
                                        editable={false}
                                        value={values.name}
                                    />
                                </View>
                                
                                {/* <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Phone Number'
                                        onChangeText={handleChange('phone')}
                                        value={values}
                                    />
                                </View> */}
                            </View>
                            {accountName && <AppButton title="Confirm Transfer" style={{ width: "90%", marginLeft: 20 }}  onPress={() => navigation.navigate("ElectricitySummary", {data: responseData, image: image})}/>}
                           </>
                        );
                        
                    }}
                    
                </Formik>
            </View>)}


            {/* phase 2  */}

            {phase === 2 && (<View style={{ alignItems: "center", marginTop: 40 }}>
                <Formik
                    initialValues={{ meterNumber: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;

                        return (
                            <View>
                                <Text style={{ marginLeft: 5 }}>Enter Meter Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleChange('meterNumber')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Customer's Name</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        onChangeText={handleChange('name')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5,  }}>Enter Amount</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Amount'
                                        onChangeText={handleChange('amount')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Phone Number'
                                        onChangeText={handleChange('phone')}
                                        value={values}
                                    />
                                </View>
                            </View>
                        );
                    }}
                </Formik>
            </View>)}

            
        </ScrollView>
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
        marginBottom: 25
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
        height: 20,
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
    }
})

export default ElectricityValidation

