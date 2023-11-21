import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButtonBlue'
import cred from '../../config'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

const PersistLogin = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [email, setEmail] = useState("")
    const [asyncData, setAsyncData] = useState({})
    const [biometrics, setBiometrics] = useState('');
    const [bioValue, setBioValue] = useState(false)

    const dispatch = useDispatch()


    const Schema = Yup.object().shape({
        login: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const Login = async (res) => {

        console.log(res)

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

    const getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const data = JSON.parse(userData)
            setAsyncData(data || { "firstName": "N/A", "lastName": "N/A" })
            setEmail(data.email)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getData()
        }, 5000);
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        getData(),
            supported(),
            getBiometricSetting()
    }, [])

    const getBiometricSetting = async () => {
        try {
            const value = await AsyncStorage.getItem('biometricEnabled');

            if (value !== null) {
                setBioValue(JSON.parse(value));
            }

        } catch (error) {
            console.error('Error retrieving biometric setting:', error);
            return false;
        }
    };


    const supported = () => {
        TouchID.isSupported()
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    setBiometrics("FaceId")
                } else {
                    setBiometrics("TouchId")
                }
            })
            .catch(error => {
                // Failure code
                console.log(error);
            });
    }

    const authenticate = () => {
        if (bioValue === false) {
            return (
                Alert.alert("Error", "Enable Finger Print or Face ID in settings")
            )
        }
        TouchID.authenticate('To login to your account')
            .then(success => {
                const res = { login: asyncData.email, password: asyncData.res.password }
                Login(res)
                console.log("Authentication Successful", success)
            })
            .catch(error => {
                Alert.alert("failed", `${error}`)
            });
    }

    const name = `${asyncData.firstName}`
    const secondName = `${asyncData.lastName}`

    const nameOne = name.replace(/^\w/, c => c.toUpperCase())
    const nameTwo = secondName.replace(/^\w/, c => c.toUpperCase())

    return (
        <>
            <StatusBar barStyle={Platform.select({ android: 'dark-content', ios: 'dark-content' })} />
            <View style={styles.container}>
                <View style={{ alignItems: "center", padding: ms(20), marginTop: s(40) }}>
                    <View style={{ alignItems: "center", marginTop: s(20) }}>
                        <Text style={{ color: "black", fontWeight: "bold", marginBottom: s(5) }}>WELCOME BACK,</Text>
                        <Text style={{ color: "black", fontSize: s(16), fontWeight: "500" }}>{`${nameOne} ${nameTwo}`}</Text>
                    </View>
                </View>
                <View>
                    <Formik
                        initialValues={{ login: email, password: "" }}
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
                                <>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            placeholderTextColor="black"
                                            onChangeText={handleChange('password')}
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

                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("ResetCode")}  >
                                        <View style={{ marginTop: s(18), alignItems: "flex-end" }}>
                                            <Text style={{ color: color.colorTwo, fontSize: s(12), fontWeight: "500" }}>Forget Password?</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(5) }}>
                                        <AppButton title="Sign In" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />
                                        <View style={{ marginTop: s(20), alignItems: "center" }}>
                                            <TouchableWithoutFeedback onPress={authenticate} >
                                                {biometrics === "FaceId" && Platform.OS === "ios" ? <MaterialCommunityIcons name='face-recognition' size={45} color="black" /> : <Image source={FingerPrint} />}
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: s(20), justifyContent: "center" }}>
                                        <Text style={{ color: color.colorTwo, fontSize: s(12), fontWeight: "500" }}>Not You?</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                            <Text style={{ color: color.colorTwo, fontSize: s(13), fontWeight: "500" }}>Switch Account</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
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
        backgroundColor: "white",
        padding: s(8)
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "white",
        width: '100%',
        height: s(55),
        marginTop: '2%',
    },
    input: {
        flex: 1,
        height: s(40),
        color: "black",
        paddingLeft: s(10),
        fontSize: s(15)
    },
    btn: {
        backgroundColor: "#49001b",
        marginTop: s(28),
        width: "82%"
    }
})

export default PersistLogin

