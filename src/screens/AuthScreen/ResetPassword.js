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




const ResetPassword = ({ navigation, route }) => {

    const {data} = route.params
   
    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const Schema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string().required('Confirm Password'),
        pin: Yup.string().required('Pin is required'),
    });



    const sendCode = async (res) => {

        const url = `${cred.URL}/auth/change-password`
        const body = {
            email: data.email,
            password: res.password,
            password_confirmation: res.password_confirmation,
            pin: res.pin
        }

        try {
            setIsLoadking(true)
            const response = await axios.post(url, body)
            const { status, message, } = response.data

            if (status === "success") {
                Alert.alert(`${status}`, `${message}`)
                setIsLoadking(false)
                navigation.navigate("login")
            } else {
                setError(message)
                setIsLoadking(false)
            }



        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { status, message } = error.response.data
            Alert.alert(`${status}`, message ? message : "Please check you input and try again");
            setIsLoadking(false)
        }
    }

    return (
        <>

            <View style={styles.container}>

                <View style={{ alignItems: "center", marginTop: s(50) }}>
                    <Image source={Logo} />
                </View>
                <View style={{ marginTop: s(35) }}>
                    <Text style={{ fontSize: s(22), fontWeight: "bold", color: "#b7b7b7" }}>Reset Password?</Text>

                </View>
                <View>
                    <Formik
                        initialValues={{ password: "", password_confirmation: "", pin: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    sendCode(res)
                                })
                                .catch((err) => Alert.alert(`${err}`));
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(40) }}>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter New Password'
                                            onChangeText={handleChange('password')}
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

                                    <Text style={{ color: "white", marginBottom: s(5), marginTop: s(15), fontSize: s(12), marginLeft: s(5) }}>Confirm Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Confirm New password'
                                            onChangeText={handleChange('password_confirmation')}
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

                                    <Text style={{ color: "white", marginBottom: s(5), marginTop: s(15), fontSize: s(12), marginLeft: s(5) }}>Pin</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Reset Pin'
                                            onChangeText={handleChange('pin')}
                                            secureTextEntry={visible}
                                            value={values.pin}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback>
                                        

                                    </View>

                                    <AppButton title="Reset Password" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />

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
        height: s(40),
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

export default ResetPassword

