import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Modal, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image, lock } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'

import CheckBox from '@react-native-community/checkbox'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButtonWhite'
import AppButtonblue from '../../components/AppButtonBlue'
import cred from '../../config'
import axios from 'axios'
import Clipboard from '@react-native-clipboard/clipboard'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import TouchID from 'react-native-touch-id'
import DeviceInfo from 'react-native-device-info';
import KeyboardAvoidView from '../../components/KeyboardAvoidingView'
import ToastNotification from '../../components/Toast'




const Register = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [toggleCheckbox, setToggleCheckbox] = useState(false)
    const [ref, setRef] = useState(false)
    const [pin, setPin] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [fields, setFields] = useState({})

    const Schema = Yup.object().shape({
        email: Yup.string().email('Invalid Email').required('Email field is required'),
        firstName: Yup.string().required('First Name field is required'),
        lastName: Yup.string().required('Last Name field is required'),
        phoneNumber: Yup.string().required('Phone Number field is required'),
        password: Yup.string().required('Password field is required'),
    });

    const handleCheckboxToggle = (index) => {

    };

    const handleCopy = async () => {
        try {
            await Clipboard.setString(pin)
            navigation.navigate("authOTP", { data: fields.email })
            Alert.alert("Copied!")
            setModalVisible(false)
        } catch (error) {
            console.log(error)
        }
    }


    const Register = async (res) => {
        setFields(res)
        const url = `${cred.URL}/mobile/create-user`;

        try {
            setIsLoadking(true);
            const response = await axios.post(url, res);
            const { status, message, activationPin } = response.data;
            console.log(response.data)

            if (status === "success") {
                if (activationPin === null) {
                    // If activationPin is null, navigate to "authOTP" directly
                    navigation.navigate("authOTP", { data: res.email });
                } else {
                    // If activationPin is not null, set it to the state variable "pin"
                    setPin(activationPin.toString());
                    // Show the modal
                    setModalVisible(true);
                }
            } else {
                showToast(message);
                setIsLoadking(false)
            }

            setIsLoadking(false);
        } catch (error) {
            console.log(error.response.data, 'from catch');
            const { message } = error.response.data;
            showToast(message);
            setIsLoadking(false);
        }
    };

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
            <StatusBar barStyle={Platform.select({ android: 'dark-content', ios: 'dark-content' })} />

            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={message} />}
                {!isToastVisible && <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: s(40) }}>
                    <MaterialCommunityIcons name="arrow-left" size={s(25)} color="#49001b" />
                </TouchableOpacity>}
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: s(5), marginTop: s(20) }}>
                    <Text style={{ color: "#49001b", fontSize: s(20), fontWeight: "bold", marginRight: s(7)  }}>Sign Up</Text>
                    <MaterialCommunityIcons name="account-plus" size={s(25)} color="#49001b" />
                </View>

                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ email: "", firstName: "", lastName: "", phoneNumber: "", password: "", referenceEmail: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    Register(res)
                                }).catch((error) => {

                                    setError("All fields are required")
                                    console.log(error)

                                })
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(30) }}>
                                    <Text style={{ color: "#49001b", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Email</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='example@gmail.com'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("email")(text);
                                                setError(null);
                                            }}
                                            value={values.email}
                                        />
                                    </View>

                                    <Text style={{ color: "#49001b", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Your first name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("firstName")(text);
                                                setError(null);
                                            }}
                                            value={values.firstName}
                                        />
                                    </View>

                                    <Text style={{ color: "#49001b", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Your last name'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("lastName")(text);
                                                setError(null);
                                            }}
                                            value={values.lastName}
                                        />
                                    </View>

                                    <Text style={{ color: "#49001b", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Phone Number</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Active phone number'
                                            placeholderTextColor="#414a5e"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                handleChange("phoneNumber")(text)
                                                setError(null);
                                            }}
                                            value={values.phoneNumber}
                                        />
                                    </View>

                                    <Text style={{ color: "#49001b", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("password")(text);
                                                setError(null);
                                            }}
                                            secureTextEntry={visible}
                                            value={values.password}
                                        />
                                        <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}
                                                color="#49001b"
                                            />
                                        </TouchableWithoutFeedback>

                                    </View>
                                    <Text style={{ marginLeft: 5, marginTop: 10, color: "#c66e54", fontSize: 12 }}>Min. of 6 characters </Text>

                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
                                    {/* <AppButton title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} /> */}
                                    <AppButtonblue title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />


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
        backgroundColor: "white",
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
        height: s(50),
        marginTop: '2%',
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
        height: s(50),
        marginBottom: s(20),
    },
    input: {
        flex: 1,
        height: s(40),
        color: "black",
        paddingLeft: s(10),
        fontSize: s(12)
    },
    btn2: {
        backgroundColor: "#000c27",
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    },
    btn: {
        backgroundColor: "#49001b",
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    },
    checkbox: {
        width: s(18),
        height: s(18),

    },
    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(10),
        paddingVertical: s(60),

    },

    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%', // Set the width to 100% so that it spans the entire container
        alignItems: 'center', // Center the image horizontally
        marginTop: s(-100), // Adjust the top margin as needed
    },
    otpBox: {
        width: s(60),
        height: s(70),
        backgroundColor: "#eaf0ff",
        justifyContent: "center",
        alignItems: "center"
    },
    otpText: {
        fontSize: s(25),
        fontWeight: "bold",
        color: "#1b2d56"
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: s(5)
    },
    image: {
        width: s(150),
        height: s(180),

    },
    // imageContainer: {
    //     position: "absolute",
    //     top: 0
    // }
})

export default Register



