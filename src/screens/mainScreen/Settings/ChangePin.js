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



const ChangePin = ({ navigation, route }) => {
    const { data } = route.params


    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)
    const [userData, setUserData] = useState({})

    const Schema = Yup.object().shape({
        pin: Yup.string().required('Pin is required'),
        pin_confirmation: Yup.string().required('Pin Confirmation is required'),
        resetPin: Yup.string().required('Reset Pin is required'),
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

    const { auth: { user } } = useSelector(state => state)

    const changePin = async (res) => {
        const url = `${cred.URL}/auth/change-transaction-pin`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            pin: res.pin,
            pin_confirmation: res.pin_confirmation,
            resetPin: res.resetPin
        }

        try {
            setLoading(true)
            const response = await axios.post(url, body, options)
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
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>Change Password</Text>
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
                            pin: "",
                            pin_confirmation: "",
                            resetPin: ""
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    changePin(res)
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
                                            placeholder='Enter New Pin'
                                            onChangeText={(text) => {
                                                handleChange("pin")(text);
                                                setError(null);
                                            }}
                                            keyboardType='numeric'
                                            maxLength={4}
                                            secureTextEntry={visible}
                                            value={values.pin}
                                        />

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Confirm New Pin'
                                            onChangeText={(text) => {
                                                handleChange("pin_confirmation")(text);
                                                setError(null);
                                            }}
                                            keyboardType='numeric'
                                            maxLength={4}
                                            secureTextEntry={visible}
                                            value={values.pin_confirmation}
                                        />
                                     

                                    </View>
                                  

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Confirmation Pin'
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                handleChange("resetPin")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.resetPin}
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


export default ChangePin;