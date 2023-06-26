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
import TouchID from 'react-native-touch-id'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'




const Login = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const dispatch = useDispatch()


    const Schema = Yup.object().shape({
        login: Yup.string().email().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const authenticate = async () => {
        try {
            const id = await TouchID.authenticate('to demo this react-native component')
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    const hasFaceID = DeviceInfo.hasNotch();

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
                Alert.alert(`${status}`, `${message}`)
                setIsLoadking(false)
            } else {
                dispatch({ type: "LOGIN", user: { ...userData, token: `${token}` } })
                navigation.navigate("Home", { ...userData })
                storeData(userData)
                setIsLoadking(false)
            }



        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            Alert.alert(`${message}`);
            setIsLoadking(false)
        }
    }

    return (
        <>

            <View style={styles.container}>

                <View style={{ alignItems: "center", marginTop: s(50) }}>
                    <Image source={Logo} />
                </View>
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
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Email</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Email Address'
                                            onChangeText={handleChange('login')}
                                            value={values}
                                        />
                                    </View>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={visible}
                                            value={values}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("ResetCode", { data: "from login" })}  >
                                        <View style={{ marginTop: s(18), alignItems: "flex-end" }}>
                                            <Text style={{ color: color.colorTwo, fontSize: s(12), fontWeight: "500" }}>Forget Password?</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <AppButton title="Login" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />
                                    <View style={{ marginTop: s(18), marginRight: s(5), alignItems: "flex-end" }}>
                                        <Text style={{ color: "#868686", fontSize: s(12), fontWeight: "500" }}>New Here? <TouchableWithoutFeedback onPress={() => navigation.navigate('register')}><Text style={{ color: "#ffffff" }}>Sign Up</Text></TouchableWithoutFeedback></Text>
                                    </View>
                                    {/* <View style={{ marginTop: s(20), alignItems: "center" }}>
                                        <TouchableWithoutFeedback onPress={() => authenticate()} >
                                            {hasFaceID ? <MaterialCommunityIcons name="face-recognition" color="white" size={s(40)} /> : <Image source={FingerPrint} />}
                                        </TouchableWithoutFeedback>
                                        <View style={{ marginTop: s(13) }}>
                                            <Text style={{ color: "white", fontSize: s(10), fontWeight: "500" }}>Login Options?</Text>
                                        </View>
                                    </View> */}
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
        marginBottom: s(30),
    },
    input: {
        flex: 1,
        height: s(20),
        color: "black",
        paddingLeft: s(10),
        fontSize: s(15)
    },
    btn: {
        backgroundColor: "white",
        marginTop: s(28),
        height: s(50)
    }
})

export default Login

