import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Modal, View, StatusBar, Image, TextInput, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
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
    const [load, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [toggleCheckbox, setToggleCheckbox] = useState(false)
    const [ref, setRef] = useState(false)
    const [pin, setPin] = useState("")
    const [userType, setUserType] = useState("")
    const [instName, setInstName] = useState("")
    const [depName, setDepName] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [fields, setFields] = useState({})
    const [institution, setInstitution] = useState([])
    const [institutionId, setInstitutionId] = useState("")
    const [department, setDepartment] = useState([])
    const [departmentId, setDepartmentId] = useState("")

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

    const type = [{ label: "Student", name: "student" }, { label: "Lecturer", name: "lecturer" }, { label: "Regular", name: "regular" }]

    const setType = (type) => {
        setUserType(type)
    }

    const institutionName = (name) => {
        setInstName(name)
    }

    const departmentName = (name) => {
        setDepName(name)
    }

    const close = () => {
        setModalVisible(false)
        setModalVisible2(false)
        setModalVisible3(false)
    }


    const Register = async (res) => {

        const url = `${cred.URL}/auth/register`;
        const body = {
            "firstName": res.firstName,
            "lastName": res.lastName,
            "email": res.email,
            "phoneNumber": res.phoneNumber,
            "password": res.password,
            "userType": userType,
            "institution": institutionId,
            "department": departmentId
        }


        try {
            setIsLoadking(true);
            const response = await axios.post(url, body);
            console.log(response.data)
            const { success, message } = response.data;

            if (success === "success") {
                navigation.navigate("authOTP", { data: res.phoneNumber });
                Alert.alert("Success", `${message}`)
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

    const getInstitution = async () => {
        setLoading(true)
        const url = `${cred.URL}/misc/institutions`

        try {
            const res = await axios.get(url)
            const { status, message, data } = res.data
            setInstitution(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
            console.log(error.response.data)
            setIsLoadking(false)
        }

    }

    const getDepartment = async () => {
        setLoading(true)
        const url = `${cred.URL}/misc/departments`

        try {
            const res = await axios.get(url)
            const { status, message, data } = res.data
            setDepartment(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
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
            <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'light-content' })} />

            <View style={styles.container}>
                {isToastVisible && <ToastNotification message={message} />}
                {!isToastVisible && <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: s(40) }}>
                    <MaterialCommunityIcons name="arrow-left" size={s(25)} color="white" />
                </TouchableOpacity>}
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: s(5), marginTop: s(20) }}>
                    <Text style={{ color: "#c66e54", fontSize: s(20), fontWeight: "bold", marginRight: s(7) }}>Sign Up</Text>
                    <MaterialCommunityIcons name="account-plus" size={s(25)} color="#c66e54" />
                </View>

                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ email: "", firstName: "", lastName: "", phoneNumber: "", password: "" }}
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
                                    <Text style={{ color: "#c66e54", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Email</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "#c66e54", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
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

                                    <Text style={{ color: "#c66e54", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>First Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "#c66e54", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
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

                                    <Text style={{ color: "#c66e54", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Last Name</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "#c66e54", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
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

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ color: "#c66e54", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Phone Number</Text>
                                        <Text style={{ color: "#c66e54", fontSize: s(11), marginBottom: s(4), }}>Select User Type</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={styles.loginContainer3}>
                                            {/* <Text style={{ color: "#c66e54", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                            <TextInput
                                                style={styles.input}
                                                placeholder='11 Digits'
                                                placeholderTextColor="#414a5e"
                                                keyboardType='numeric'
                                                onChangeText={(text) => {
                                                    handleChange("phoneNumber")(text)
                                                    setError(null);
                                                }}
                                                value={values.phoneNumber}
                                            />
                                        </View>

                                        <View style={styles.formContainer5}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ color: "black", fontWeight: "500", fontSize: s(14), marginLeft: s(6) }}>{userType}</Text>
                                                <MaterialCommunityIcons name="chevron-down" size={s(22)} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text style={{ color: "#c66e54", fontSize: s(11), marginBottom: s(4), }}>Select Institution</Text>
                                    <View style={styles.formContainer6}>
                                        <TouchableOpacity onPress={() => { setLoading(true), setModalVisible2(true), getInstitution() }} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={{ color: "black", fontWeight: "500", fontSize: s(14), marginLeft: s(6) }}>{instName}</Text>
                                            <MaterialCommunityIcons name="chevron-down" size={s(22)} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={{ color: "#c66e54", fontSize: s(11), marginBottom: s(5), marginTop: s(10), }}>Select Department</Text>
                                    <View style={styles.formContainer6}>
                                        <TouchableOpacity onPress={() => { setLoading(true), setModalVisible3(true), getDepartment() }} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={{ color: "black", fontWeight: "500", fontSize: s(14), marginLeft: s(6) }}>{depName}</Text>
                                            <MaterialCommunityIcons name="chevron-down" size={s(22)} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={{ color: "#c66e54", marginBottom: s(10), marginTop: s(10), fontSize: s(12), marginLeft: s(5) }}>Password</Text>
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

            <Modal
                visible={modalVisible}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.modalScreen}>
                    <View style={styles.transparentContainer} />
                    <SafeAreaView style={styles.contentContainer}>
                        <View style={styles.closeIconContainer}>
                            <TouchableWithoutFeedback onPress={close}>
                                <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                            </TouchableWithoutFeedback>
                            <Text style={{ fontSize: s(15), fontWeight: "600", color: "black" }}>Select User Type</Text>
                            <Text></Text>
                        </View>
                        <View style={{ padding: 0, marginTop: 0, width: "100%" }}>
                            <View style={{ padding: s(10), marginBottom: s(0), }}>
                                {type.map((item, key) => (
                                    <TouchableOpacity key={key} onPress={() => { setType(item.name), setModalVisible(false) }}>
                                        <Text style={{ fontSize: s(14), marginBottom: s(15), marginLeft: s(10), color: "black" }}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>

            <Modal
                visible={modalVisible2}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.modalScreen2}>
                    <View style={styles.transparentContainer2} />
                    <SafeAreaView style={styles.contentContainer2}>
                        <View style={styles.closeIconContainer}>
                            <TouchableWithoutFeedback onPress={close}>
                                <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                            </TouchableWithoutFeedback>
                            <Text style={{ fontSize: s(15), fontWeight: "600", color: "black" }}>Select Institution</Text>
                            <Text></Text>
                        </View>
                        <ScrollView style={{ padding: 0, marginTop: 0, width: "100%" }}>
                            {load && <ActivityIndicator color="black" />}
                            <View style={{ padding: s(10), marginBottom: s(0), }}>
                                {institution.map((item, key) => (
                                    <>
                                        <TouchableOpacity key={key} onPress={() => { institutionName(item.name), setInstitutionId(item._id), setModalVisible2(false) }}>
                                            <Text style={{ fontSize: s(14), marginBottom: s(15), marginLeft: s(10), color: "black" }}>{item.name}</Text>
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: 'grey', height: s(0.3), marginBottom: s(5) }}></View>
                                    </>
                                ))}
                            </View>

                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>

            <Modal
                visible={modalVisible3}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.modalScreen3}>
                    <View style={styles.transparentContainer3} />
                    <SafeAreaView style={styles.contentContainer3}>
                        <View style={styles.closeIconContainer}>
                            <TouchableWithoutFeedback onPress={close}>
                                <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                            </TouchableWithoutFeedback>
                            <Text style={{ fontSize: s(15), fontWeight: "600", color: "black" }}>Select Department</Text>
                            <Text></Text>
                        </View>
                        <ScrollView style={{ padding: 0, marginTop: 0, width: "100%" }}>
                            {load && <ActivityIndicator color="black" />}
                            <View style={{ padding: s(10), marginBottom: s(0), }}>
                                {department.map((item, key) => (
                                    <>
                                        <TouchableOpacity key={key} onPress={() => { departmentName(item.name), setDepartmentId(item._id), setModalVisible3(false) }}>
                                            <Text style={{ fontSize: s(14), marginBottom: s(15), marginLeft: s(10), color: "black" }}>{item.name}</Text>
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: 'grey', height: s(0.3), marginBottom: s(5) }}></View>
                                    </>
                                ))}
                            </View>

                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
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
    loginContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#49001b",
        backgroundColor: "white",
        width: '48%',
        height: s(50),
        marginBottom: s(15),
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
    formContainer5: {
        justifyContent: 'space-between',
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#49001b",
        backgroundColor: "white",
        width: '48%',
        height: s(50),
        marginTop: '1%',
    },

    formContainer6: {
        justifyContent: 'space-between',
        borderWidth: s(1.5),
        borderRadius: s(50),
        padding: ms(10),
        borderColor: "#49001b",
        backgroundColor: "white",
        width: '100%',
        height: s(50),
        marginTop: '1%',
    },
    // imageContainer: {
    //     position: "absolute",
    //     top: 0
    // },

    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer: {
        flex: 3,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(20),

    },
    closeIconContainer: {
        marginLeft: s(10),
        marginTop: s(20),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },

    modalScreen2: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer2: {
        flex: 3,
        backgroundColor: 'transparent',
    },
    contentContainer2: {
        flex: 6,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(20),

    },

    modalScreen3: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer3: {
        flex: 3,
        backgroundColor: 'transparent',
    },
    contentContainer3: {
        flex: 6,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingVertical: s(20),

    },
    closeIconContainer: {
        marginLeft: s(10),
        marginTop: s(20),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
})

export default Register



