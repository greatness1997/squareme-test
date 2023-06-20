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



const ChangePassword = ({ navigation }) => {

    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [userData, setUserData] = useState({})

    const Schema = Yup.object().shape({
        old_password: Yup.string().required('Old password is required'),
        password: Yup.string().required('New password is required'),
        confirm_password: Yup.string().required('New password is required'),
        pin: Yup.string().required('Pin is required'),
    });

    const { auth: { user } } = useSelector(state => state)

    const getProfile = async () => {
        const url = `${cred.URL}/user/profile`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options)
            const { user } = response.data
            setUserData(user)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            padding: s(15)
        },
        input: {
            color: "#6a6a6a",
            fontWeight: "600",
            fontSize: s(13)
        },

        formContainer2: {
            marginTop: s(15),
            borderWidth: 1,
            borderRadius: s(10),
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            flexDirection: "row",
            justifyContent: "space-between",
            height: s(52)
        },


    })

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: s(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>Change Password</Text>
                    <Text></Text>
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
                                    console.log(res)
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
                                            onChangeText={handleChange('old_password')}
                                            secureTextEntry={visible}
                                            value={values.old_password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcon
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#acacac"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter new password'
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={visible}
                                            value={values.password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcon
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#acacac"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Confirm new password'
                                            onChangeText={handleChange('confirm_password')}
                                            secureTextEntry={visible}
                                            value={values.confirm_password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcon
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#acacac"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    <View style={styles.formContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Confirmation Pin'
                                            onChangeText={handleChange('pin')}
                                            secureTextEntry={visible}
                                            value={values.pin}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcon
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#acacac"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>

                                    {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                                    <AppButton title="Change Password" onPress={handleSubmit} style={{ backgroundColor: "#1b2d55", height: s(55), marginTop: s(30) }} />
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