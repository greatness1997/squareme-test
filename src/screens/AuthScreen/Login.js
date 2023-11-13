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
import { useDispatch } from 'react-redux'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ToastNotification from '../../components/Toast'





const Login = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [messageOne, setMessageOne] = useState('')
    const [isToastVisible, setIsToastVisible] = useState(false)

    const dispatch = useDispatch()


    const Schema = Yup.object().shape({
        login: Yup.string().email().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const hasFaceID = DeviceInfo.hasNotch();

    const showToast = (message) => {
        setMessageOne(message);
        setIsToastVisible(true);

        // Set a timeout to hide the toast after 5 seconds
        setTimeout(() => {
            setIsToastVisible(false);
        }, 3000);
    };

    const storeData = async (data) => {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('userData', jsonValue);
        } catch (e) {
            console.log(e)
        }
    };

    const Login = async (res) => {

        const url = `${cred.URL}/auth/get-token`

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res)
            const { status, message, userData, token } = response.data

            if (status !== "success") {
                showToast(message);
                setIsLoadking(false)
            } else {
                const combinedData = { ...userData, token: `${token}`, res };
                dispatch({ type: "LOGIN", user: combinedData });
                navigation.navigate("Home", combinedData);
                storeData(combinedData);
                setIsLoadking(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }



        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            showToast(message);
            setIsLoadking(false)
        }
    }


    return (
        <>

            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={messageOne} />}
                {!isToastVisible && <View style={{ alignItems: "center", marginTop: s(50) }}>
                    {/* <Image source={Logo} /> */}
                </View>}
                <View>
                    <Formik
                        initialValues={{ login: "", password: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    Login(res)
                                })
                                .catch((err) => Alert.alert('Please provide proper details',));
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(60) }}>
                                    <Text style={{ color: "white", marginBottom: s(15), fontSize: s(12), marginLeft: s(5) }}>Email</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='example@gmail.com'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={handleChange('login')}
                                            value={values}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={visible}
                                            value={values}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#414a5e"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("ResetCode", { data: "from login" })}  >
                                        <View style={{ marginTop: s(18), alignItems: "flex-end" }}>
                                            <Text style={{ color: "white", fontSize: s(12), fontWeight: "500" }}>Forget Password?</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <AppButton title="Login" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />
                                    <View style={{ marginTop: s(18), marginRight: s(5), alignItems: "flex-end" }}>
                                        <Text style={{ color: "#868686", fontSize: s(12), fontWeight: "500" }}>New Here? <TouchableWithoutFeedback onPress={() => navigation.navigate('register')}><Text style={{ color: "#ffffff" }}>Sign Up</Text></TouchableWithoutFeedback></Text>
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#49001b",
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
        backgroundColor: "white",
        width: '100%',
        height: s(55),
        // marginTop: '2%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(2.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "white",
        width: '100%',
        height: s(55),
        marginBottom: s(30),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "black",
        paddingLeft: s(10),
        fontSize: s(15)
    },
    btn: {
        backgroundColor: "#a9c2f8",
        marginTop: s(28),
        height: s(50)
    },
    message: {
        position: "absolute"
    }
})

export default Login

