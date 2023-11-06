import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'

import CheckBox from '@react-native-community/checkbox'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButtonWhite'
import cred from '../../config'
import axios from 'axios'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import TouchID from 'react-native-touch-id'
import DeviceInfo from 'react-native-device-info';
import KeyboardAvoidView from '../../components/KeyboardAvoidingView'
import ToastNotification from '../../components/Toast'




const Register = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [toggleCheckbox, setToggleCheckbox] = useState(false)
    const [ref, setRef] = useState(false)


    const Schema = Yup.object().shape({
        email: Yup.string().email('Invalid Email').required('Email field is required'),
        firstName: Yup.string().required('First Name field is required'),
        lastName: Yup.string().required('Last Name field is required'),
        phoneNumber: Yup.string().required('Phone Number field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const handleCheckboxToggle = (index) => {

    };



    const Register = async (res) => {

        const url = `${cred.URL}/mobile/create-user`

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res)
            const { status, message, userData, token } = response.data

            if (status !== "success") {
                showToast(message)
                setIsLoadking(false)
            } else {
                Alert.alert(`${message}`)
                navigation.navigate("authOTP", { data: res.email })
                setIsLoadking(false)
            }

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            showToast(message)
            setIsLoadking(false)
        }
    }

    const showToast = (message) => {
        setMessage(message);
        setIsToastVisible(true);

        // Set a timeout to hide the toast after 5 seconds
        setTimeout(() => {
            setIsToastVisible(false);
        }, 3000);
    };

    return (
        <>

            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={message} />}
                {!isToastVisible && <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: s(40) }}>
                    <MaterialCommunityIcons name="arrow-left" size={s(25)} color="white" />
                </TouchableOpacity>}
                <Text style={{ color: "white", fontSize: s(20), fontWeight: "bold", marginLeft: s(5), marginTop: s(30) }}>Create Your</Text>
                <Text style={{ color: "white", fontSize: s(20), fontWeight: "bold", marginLeft: s(5), marginTop: s(5) }}>Account</Text>
                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ email: "", firstName: "", lastName: "", phoneNumber: "", password: "", refEmail: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    Register(res)
                                }).catch((error) => {

                                    setError("All fields are required")
                                    console.log(error)

                                })
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(30) }}>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Email</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='example@gmail.com'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("email")(text);
                                                setError(null);
                                            }}
                                            value={values.email}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Your first name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("firstName")(text);
                                                setError(null);
                                            }}
                                            value={values.firstName}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Your last name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("lastName")(text);
                                                setError(null);
                                            }}
                                            value={values.lastName}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Phone Number</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Active phone number'
                                            placeholderTextColor="#414a5e"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                handleChange("phoneNumber")(text)
                                                setError(null);
                                            }}
                                            value={values.phoneNumber}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("password")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#414a5e"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>
                                    {ref === false && <Text style={{ marginLeft: 5, marginTop: 10, color: "#c66e54", fontSize: 12 }}>Min. of 6 characters </Text>}
                                    {ref === false &&<View style={{ marginLeft: s(5), marginTop: s(10), flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => setRef(true)}>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckbox}
                                                onValueChange={(newValue) => setToggleCheckbox(newValue)}
                                                style={styles.checkbox}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{ color: "white", marginLeft: s(10) }}>Check box to register with a reference email?</Text>
                                    </View>}

                                    {ref === true && <Text style={{ color: "white", marginTop: s(15), marginBottom: s(15), fontSize: s(12), marginLeft: s(5) }}>Reference Email</Text>}
                                    {ref === true && (<View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='example@gmail.com'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("refEmail")(text);
                                                setError(null);
                                            }}
                                            value={values.refEmail}
                                        />
                                    </View>)}

                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
                                    {/* <AppButton title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} /> */}
                                    <AppButton title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />


                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAvoidView>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#060C27",
        padding: s(8)
    },
    profileImage: {
        width: s(100),
        height: s(100),
        borderWidth: s(6),
        borderRadius: s(100),
        borderColor: color.colorOne,
        backgroundColor: "white",
        marginTop: s(18),
        justifyContent: "center", alignItems: "center"
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(2.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "#000c27",
        width: '100%',
        height: s(50),
        marginTop: '2%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(2.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "#000c27",
        width: '100%',
        height: s(50),
        marginBottom: s(20),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "white",
        paddingLeft: s(10),
        fontSize: s(12)
    },
    btn: {
        backgroundColor: "#a9c2f8",
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    },
    checkbox: {
        width: s(18),
        height: s(18)

    }
})

export default Register



