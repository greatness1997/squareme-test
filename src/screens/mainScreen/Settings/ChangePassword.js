import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet, ScrollView, Alert, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { LogoBlue } from '../../../constants/images';
import KeyboardAvoidView from '../../../components/KeyboardAvoidingView';
import AppButton from '../../../components/AppButtonBlue';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';
import cred from '../../../config'
import axios from 'axios';



const ChangePassword = ({ navigation, route }) => {
    const { data } = route.params


    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)
    const [userData, setUserData] = useState({})

    const Schema = Yup.object().shape({
        old_password: Yup.string().required('Old password is required'),
        password: Yup.string().required('New password is required'),
        confirm_password: Yup.string().required('New password is required'),
        pin: Yup.string().required('Pin is required'),
    });


    const styles = StyleSheet.create({
        container: {
            // width: "100%",
            height: "100%",
            padding: s(15)
        },
        input: {
            color: "#6a6a6a",
            fontWeight: "600",
            fontSize: s(13),
            height: s(40),
        },

        formContainer2: {
            marginTop: s(15),
            borderWidth: 1,
            borderRadius: s(10),
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            justifyContent: "center",
            height: s(52)
        },



    })

    const changePassword = async (res) => {
        const url = `${cred.URL}/auth/new-password`
        const body = {
            email: data.email,
            old_password: res.old_password,
            password: res.password,
            password_confirmation: res.confirm_password,
            pin: res.pin
        }

        try {
            setLoading(true)
            const response = await axios.post(url, body)
            const { status, message, } = response.data

            if (status === "success") {
                setLoading(false)
                Alert.alert(`${status}`, `${message}`)
                
                navigation.navigate("Settings")
            } else {
                setLoading(false)
                setError(message)
                
            }



        } catch (error) {
            setLoading(false)
            console.log(error.response.data, 'from catch')
            const { status, message } = error.response.data
            Alert.alert(`${status}`, message ? message : "Please check you input and try again");
            
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: s(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600", color: "black" }}>Change Password</Text>
                    <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                        <MaterialCommunityIcon
                            name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                            size={s(25)}
                            color="#acacac"
                        />
                    </TouchableWithoutFeedback>
                </View>


                <KeyboardAvoidView>

                    <Formik
                        initialValues={{
                            old_password: "",
                            password: "",
                            confirm_password: "",
                            pin: ""
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    changePassword(res)
                                })
                                .catch((err) => {
                                    setError(`${err}`)
                                });
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(20) }}>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter you old password'
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                                handleChange("old_password")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.old_password}
                                        />

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter new password'
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                                handleChange("password")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.password}
                                        />
                                     

                                    </View>
                                    <Text style={{ marginLeft: 5, marginTop: 10, color: "#c66e54", fontSize: 12 }}>Min. of 6 characters </Text>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Confirm new password'
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                                handleChange("confirm_password")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.confirm_password}
                                        />
                                       

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Confirmation Pin'
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                                handleChange("pin")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.pin}
                                        />
                                       

                                    </View>


                                    {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                                    <AppButton title="Change Password" onPress={handleSubmit} isSubmitting={loading} style={{ backgroundColor: "#1b2d55", height: s(55), marginTop: s(30) }} />
                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAvoidView>
            </View>


        </SafeAreaView>
    )


}


export default ChangePassword;