import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { useFocusEffect } from '@react-navigation/native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButtonBlue'
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
        phoneNumber: Yup.string().required('Phone number is required'),
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

        const url = `${cred.URL}/auth/login`

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res)
            const { success, message, data } = response.data
            const { token, userData } = data

            if (success !== "success") {
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
            <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'light-content' })} />
            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={messageOne} />}
                {/* {!isToastVisible && <View style={{ alignItems: "center", marginTop: s(20) }}>
                    <Image source={Logo} style={{ width: (120), height: s(120), resizeMode: "contain" }} />
                </View>} */}
                <View style={{ marginBottom: s(30), marginTop: s(60) }}>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <Text style={{ color: "white", fontSize: s(20), fontWeight: "bold", marginRight: s(5) }}>Sign In</Text>
                        <MaterialCommunityIcons name="login" size={s(25)} color="white" />
                    </View>

                    <Text style={{ color: "white", fontSize: s(11), fontWeight: "400", alignSelf: "center", marginTop: s(3) }}>Login your account to continue</Text>
                </View>


                <View>
                    <Formik
                        initialValues={{ phoneNumber: "", password: "" }}
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
                                <View style={{ marginTop: s(10) }}>
                                    <Text style={{ color: "white", fontWeight: "bold", marginBottom: s(15), fontSize: s(14), marginLeft: s(5) }}>Phone Number</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Phone Number'
                                            placeholderTextColor="#28231d"
                                            onChangeText={handleChange('phoneNumber')}
                                            value={values.phoneNumber}
                                        />

                                        <Entypo
                                            name="old-phone"
                                            size={s(25)}
                                            color="#28231d"
                                        />

                                    </View>
                                    <Text style={{ color: "white", fontWeight: "bold", marginBottom: s(10), fontSize: s(14), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            placeholderTextColor="#28231d"
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={visible}
                                            value={values.password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#28231d"
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
                                        <Text style={{ color: "white", fontSize: s(12), fontWeight: "500" }}>Don't have an account? <TouchableWithoutFeedback onPress={() => navigation.navigate('register')}><Text style={{ color: "white" }}>Sign Up</Text></TouchableWithoutFeedback></Text>
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
        backgroundColor: "black",
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
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#49001b",
        backgroundColor: "white",
        width: '100%',
        height: s(55),
        // marginTop: '2%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#49001b",
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
        backgroundColor: "#454545",
        marginTop: s(28),
        height: s(50)
    },
    message: {
        position: "absolute"
    }
})

export default Login

