import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity } from 'react-native'
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
import ToastNotification from '../../components/Toast'
import { useSelector } from "react-redux"




const UserDetail = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')


    const Schema = Yup.object().shape({
        // fistName: Yup.string().required(''),
        // lastName: Yup.string().required('Password field is required'),

    });

    const { auth: { user } } = useSelector(state => state)

    const Details = async (res) => {

        const url = `${cred.URL}/mobile/user-details`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            setIsLoadking(true)
            const response = await axios.post(url, res, options)
            const { status, message } = response.data

            if (status !== "success") {
                showToast(message)
                setIsLoadking(false)
            } else {
                navigation.navigate("CompleteDetails")
                setIsLoadking(false)
            }

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            showToast(message)
            setIsLoadking(false)
        }
    }

    const showToast = (message) => {
        setMessage(message);
        setIsToastVisible(true);

        // Set a timeout to hide the toast after 5 seconds
        setTimeout(() => {
            setIsToastVisible(false);
        }, 3000);
    };

    return (
        <>

            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={message} />}
                {!isToastVisible && <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: s(40) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="arrow-left" size={s(25)} color="white" />
                        <Text style={{ marginLeft: s(5), fontWeight: "bold", fontSize: s(14), color: "white" }}>Tell Us About Yourself</Text>
                    </View>
                </TouchableOpacity>}

                {!isToastVisible && <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(18), padding: s(8) }}>
                    <Text style={{ color: "white", fontSize: s(13) }}>Profile Information</Text>
                    <Text style={{ color: "white", fontSize: s(10) }}>step 2 of 4</Text>
                </View>}

                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ firstName: "", lastName: "", address: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    Details(res)
                                }).catch((error) => {

                                    setError("All fields are required")
                                    console.log(error)

                                })
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(25) }}>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter First Name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("firstName")(text);
                                                setError(null);
                                            }}
                                            value={values.firstName}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Last Name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("lastName")(text);
                                                setError(null);
                                            }}
                                            value={values.lastName}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), marginTop: s(5), fontSize: s(12), marginLeft: s(5) }}>Address</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Address'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("address")(text);
                                                setError(null);
                                            }}
                                            value={values.address}
                                        />

                                    </View>

                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
                                    {/* <AppButton title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} /> */}
                                    <AppButton title="Continue To Next Step" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />


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
        borderWidth: s(2.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "#000c27",
        width: '100%',
        height: s(55),
        marginTop: '2%',
        marginBottom: '2%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(2.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#414a5e",
        backgroundColor: "#000c27",
        width: '100%',
        height: s(55),
        marginBottom: s(15),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "white",
        paddingLeft: s(10),
        fontSize: s(12)
    },
    btn: {
        backgroundColor: "#a9c2f8",
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    }
})

export default UserDetail



