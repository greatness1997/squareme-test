import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
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

const Login = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const dispatch = useDispatch()

    const email = "skouhon@gmail.com"

    const Schema = Yup.object().shape({
        login: Yup.string().required('Email field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const Login = async (res) => {

        const url = `${cred.URL}/auth/get-token`

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res)
            const { status, message, userData, token } = response.data

            console.log(response.data, 'from response')

            if (status !== "success") {
                Alert.alert(`${status}`, `${message}`)
                setIsLoadking(false)
            } else {
                dispatch({ type: "LOGIN", user: { ...userData, token: `Bearer ${token}` } })
                navigation.navigate("Home", { ...userData })
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

                <View style={{ alignItems: "center", marginTop: s(20) }}>
                    <Image source={Logo} />
                </View>

                <View style={{ alignItems: "center", padding: ms(20),  }}>
                    <View style={styles.profileImage}>
                        <Image source={image} style={{ width: s(80), height: vs(80), borderRadius: s(50),  }} />
                    </View>
                    <View style={{ alignItems: "center", marginTop: s(20) }}>
                        <Text style={{ color: "white", fontSize: s(14), fontWeight: "500" }}>Sanusi T. Segun</Text>
                        <View style={{ flexDirection: "row", marginTop: s(20) }}>
                            <Text style={{ color: "white", fontSize: s(12), fontWeight: "500" }}>Not You?</Text>
                            <Text style={{ color: color.colorTwo, fontSize: s(13), fontWeight: "500" }}>Switch Account</Text>
                        </View>
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
                                            onChangeText={handleChange('password')}
                                            value={values}
                                        />
                                        <TouchableWithoutFeedback onPress={() => console.log("eye off pressed")}>
                                            <MaterialCommunityIcons name='eye-off-outline' size={s(25)} />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <View style={{ marginTop: s(18), alignItems: "flex-end" }}>
                                        <Text style={{ color: color.colorTwo, fontSize: s(13), fontWeight: "500" }}>Forget Password?</Text>
                                    </View>
                                    <AppButton title="Sign In" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />
                                    <View style={{ marginTop: s(40), alignItems: "center" }}>
                                        <TouchableWithoutFeedback onPress={() => console.log("Finger Print")} >
                                            <Image source={FingerPrint} style={{ width: s(40), height: vs(40), resizeMode: "contain" }}/>
                                        </TouchableWithoutFeedback>
                                        <View style={{ marginTop: s(13) }}>
                                            <Text style={{ color: "white", fontSize: s(12), fontWeight: "300" }}>Forget Password?</Text>
                                        </View>
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
        height: s(55),
        marginTop: '2%',
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
        marginTop: s(28)
    }
})

export default Login

