import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity } from 'react-native'
import { color } from '../../../constants/color'
import { Logo, FingerPrint, image } from '../../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../../components/AppButtonBlue'
import cred from '../../../config'
import axios from 'axios'

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import TouchID from 'react-native-touch-id'
import DeviceInfo from 'react-native-device-info';
import KeyboardAvoidView from '../../../components/KeyboardAvoidingView'
import moment from 'moment'




const ProfileEdit = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState({})


    const Schema = Yup.object().shape({
        address: Yup.string().required('Address is required'),
        firstName: Yup.string().required('First Name field is required'),
        lastName: Yup.string().required('Last Name field is required'),
        stateOfOrigin: Yup.string().required('State of origin is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        localGovernment: Yup.string().required('Local government is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        gender: Yup.string().required('Gender is required'),
        companyName: Yup.string().required('Company name is required'),
    });

    const { auth: { user } } = useSelector(state => state)


    const updateUser = async (res) => {
        setIsLoadking(true)

        const url = `${cred.URL}/user/profile`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            address: res.address,
            firstName: res.firstName,
            lastName: res.lastName,
            stateOfOrigin: res.stateOfOrigin,
            phoneNumber: res.phoneNumber,
            dateOfBirth: moment(userData.dateOfBirth).format('MM-DD-YYYY'),
            localGovernment: res.localGovernment,
            gender: res.gender,
            companyName: res.companyName
        }

        try {
            setIsLoadking(true)
            const response = await axios.put(url, body, options)
            const { status, message, } = response.data

            
            if (status !== "success") {
                setError(message)
                setIsLoadking(false)
            } else {
                setIsLoadking(false)
                Alert.alert(`${message}`)
                navigation.navigate('Profile')
            }

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const { message } = error.response.data
            setError(message)
            setIsLoadking(false)
        }
    }

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

    return (
        <>

            <View style={styles.container}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: s(30) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={s(22)} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600" }}>Profile Info</Text>
                    <Text></Text>
                </View>

                <KeyboardAvoidView>
                    <Formik
                        initialValues={{
                            address: userData.address || "",
                            firstName: userData.firstName || "",
                            lastName: userData || "",
                            stateOfOrigin: userData || "",
                            phoneNumber: userData.phoneNumber || "",
                            dateOfBirth: moment(userData.dateOfBirth).format('MMM DD, YYYY') || "",
                            localGovernment: userData.localGovernment || "",
                            gender: userData.gender || "",
                            companyName: userData.companyName || ""
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    updateUser(res)
                                }).catch((error) => {
                                    console.log(error)
                                    setError('Please fill in all fields')
                                })
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(30) }}>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Address</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Address'
                                            onChangeText={(text) => {
                                                handleChange("address")(text);
                                                setError(null);
                                            }}
                                            value={values.address}
                                        />
                                    </View>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your First Name'
                                            onChangeText={(text) => {
                                                handleChange("firstName")(text);
                                                setError(null);
                                            }}
                                            value={values.firstName}
                                        />
                                    </View>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Last Name'
                                            onChangeText={(text) => {
                                                handleChange("lastName")(text);
                                                setError(null);
                                            }}
                                            value={values.lastName}
                                        />
                                    </View>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>State of Orign</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your state of origin'
                                            onChangeText={(text) => {
                                                handleChange("stateOfOrigin")(text);
                                                setError(null);
                                            }}
                                            value={values.stateOfOrigin}
                                        />
                                    </View>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Phone Number</Text>
                                    <View style={styles.loginContainer2}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Your Phone Number'
                                            onChangeText={(text) => {
                                                handleChange("phoneNumber")(text);
                                                setError(null);
                                            }}
                                            value={values.phoneNumber}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Local Government</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your local government'
                                            onChangeText={(text) => {
                                                handleChange("localGovernment")(text);
                                                setError(null);
                                            }}

                                            value={values.localGovernment}
                                        />
                                        {/* <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback> */}

                                    </View>

                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5), marginTop: s(20) }}>Date of Birth</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter Date of Birth'
                                            onChangeText={(text) => {
                                                handleChange("dateOfBirth")(text);
                                                setError(null);
                                            }}

                                            value={values.dateOfBirth}
                                        />
                                        {/* <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback> */}

                                    </View>

                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5), marginTop: s(20) }}>Gender</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your Gender'
                                            onChangeText={(text) => {
                                                handleChange("gender")(text);
                                                setError(null);
                                            }}

                                            value={values.gender}
                                        />
                                        {/* <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback> */}

                                    </View>

                                    <Text style={{ color: "#717171", marginBottom: s(10), fontSize: s(12), marginLeft: s(5), marginTop: s(20) }}>Company Name</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your company name'
                                            onChangeText={(text) => {
                                                handleChange("companyName")(text);
                                                setError(null);
                                            }}

                                            value={values.companyName}
                                        />
                                        {/* <TouchableWithoutFeedback onPress={() => { setVisible(!visible), setShowPassword(!showPassword) }}>
                                            <MaterialCommunityIcons
                                                name={showPassword === true ? "eye-outline" : "eye-off-outline"}
                                                size={s(25)}

                                            />
                                        </TouchableWithoutFeedback> */}

                                    </View>


                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
                                    <AppButton title="Update Info" onPress={handleSubmit} isSubmitting={loading} style={{ marginTop: s(20) }} />


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

        // backgroundColor: "#060C27",
        padding: s(15)

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
        borderColor: "#BABABA",
        backgroundColor: "#F5F5F5",
        width: '100%',
        height: s(50),
        marginTop: '0%',
    },
    loginContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(1),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#BABABA",
        backgroundColor: "#F5F5F5",
        width: '100%',
        height: s(50),
        marginBottom: s(20),
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
        marginTop: s(20),
        height: s(50),
        marginBottom: s(20)
    }
})

export default ProfileEdit



