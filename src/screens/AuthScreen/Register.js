import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButtonWhite'
import cred from '../../config'
import axios from 'axios'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import TouchID from 'react-native-touch-id'
import DeviceInfo from 'react-native-device-info';
import KeyboardAvoidView from '../../components/KeyboardAvoidingView'




const Register = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)





    const Schema = Yup.object().shape({
        email: Yup.string().email('Invalid Email').required('Email field is required'),
        firstName: Yup.string().required('First Name field is required'),
        lastName: Yup.string().required('Last Name field is required'),
        username: Yup.string().required('Username field is required'),
        phoneNumber: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
        password_confirmation: Yup.string().required('Confirm Password field is required'),
    });



    const Register = async (res) => {

        const url = `${cred.URL}/auth/sign-up`

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res)
            const { status, message, userData, token } = response.data

            if (status !== "success") {
                setError(message)
                setIsLoadking(false)
            } else {
                Alert.alert(`${message}`)
                navigation.navigate("authOTP", { data: res.email })
                setIsLoadking(false)
            }

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            setError(message)
            setIsLoadking(false)
        }
    }

    return (
        <>

            <View style={styles.container}>

                <View style={{ alignItems: "center", marginTop: s(30) }}>
                    <Image source={Logo} />
                </View>
                <Text style={{ color: "white", fontSize: s(18), fontWeight: "bold", marginLeft: s(5), marginTop: s(10) }}>Sign Up</Text>
                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ email: "", firstName: "", lastName: "", username: "", phoneNumber: "", password: "", password_confirmation: "" }}
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
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Email Address'
                                            onChangeText={(text) => {
                                                handleChange("email")(text);
                                                setError(null);
                                            }}
                                            value={values.email}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your First Name'
                                            onChangeText={(text) => {
                                                handleChange("firstName")(text);
                                                setError(null);
                                            }}
                                            value={values.firstName}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Last Name'
                                            onChangeText={(text) => {
                                                handleChange("lastName")(text);
                                                setError(null);
                                            }}
                                            value={values.lastName}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Username</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Choose your prefered Username'
                                            onChangeText={(text) => {
                                                handleChange("username")(text);
                                                setError(null);
                                            }}
                                            value={values.username}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Phone Number</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Phone Number'
                                            onChangeText={(text) => {
                                                handleChange("phoneNumber")(text);
                                                setError(null);
                                            }}
                                            value={values.phoneNumber}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
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

                                            />
                                        </TouchableWithoutFeedback>

                                    </View>
                                    <Text style={{ marginLeft: 5, marginTop: 10, color: "#c66e54", fontSize: 12}}>Min. of 6 characters </Text>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5), marginTop: s(20) }}>Confirm Your password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Same Password'
                                            onChangeText={(text) => {
                                                handleChange("password_confirmation")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.password_confirmation}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback>

                                    </View>
                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
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
        borderWidth: s(1),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "white",
        backgroundColor: color.colorOne,
        width: '100%',
        height: s(50),
        marginTop: '2%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(1),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "white",
        backgroundColor: color.colorOne,
        width: '100%',
        height: s(50),
        marginBottom: s(20),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "black",
        paddingLeft: s(10),
        fontSize: s(15)
    },
    btn: {
        backgroundColor: "white",
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    }
})

export default Register



