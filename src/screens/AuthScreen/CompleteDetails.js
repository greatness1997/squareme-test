import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Image, TextInput, SafeAreaView, TouchableWithoutFeedback, Alert, Platform, TouchableOpacity } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint, image } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
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

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'




const CompleteDetails = ({ navigation, route }) => {

    const [loading, setIsLoadking] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [visible, setVisible] = useState(true)
    const [error, setError] = useState(null)
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')


    const [modalVisible, setModalVisible] = useState(false)
    const [genderText, setGenderText] = useState('male')
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('');
    const [date, setDate] = useState(new Date());
    const [startText, setStartText] = useState('')


    const onChange = (selectedDate) => {
        setShow(false);
        if (!selectedDate) return; // Handle case when no date is selected
      
        setDate(selectedDate);
      
        if (mode === 'date') {
          setStartText(formatDate(selectedDate));
        } 
        setMode('');
      };

    const formatDate = (date) => {
        if (!date) return '';
        return moment(date).format('MMM DD, YYYY');
        
      };

      const showMode = (currentMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const gender = [{ label: "Male", name: "male" }, { label: "Female", name: "female" }, { label: "Others", name: "others" }]

    const setGender = (gender) => {
        setGenderText(gender)
    }

    const close = () => {
        setModalVisible(false)
    }


    const Schema = Yup.object().shape({
        // fistName: Yup.string().required(''),
        // lastName: Yup.string().required('Password field is required'),

    });

    const { auth: { user } } = useSelector(state => state)

    const Details = async (res) => {

        const url = `${cred.URL}/mobile/complete-details`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            "bvn": res.bvn,
            "dateOfBirth": startText,
            "gender": genderText
        }

        console.log(body)

        try {
            setIsLoadking(true)
            const response = await axios.post(url, body, options)
            const { status, message } = response.data

            if (status !== "success") {
                showToast(message)
                setIsLoadking(false)
            } else {
                Alert.alert(`${message}`)
                navigation.navigate("Document")
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
                {!isToastVisible && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: s(40) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <MaterialCommunityIcons name="arrow-left" size={s(25)} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: s(5), fontWeight: "bold", fontSize: s(14), color: "white" }}>Tell Us About Yourself</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Document")}>
                        <Text style={{ fontSize: s(14), fontWeight: "bold", color: "#a9c2f8" }}>Skip</Text>
                    </TouchableOpacity>
                </View>}

                {!isToastVisible && <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(18), padding: s(8) }}>
                    <Text style={{ color: "white", fontSize: s(13) }}>Profile Information</Text>
                    <Text style={{ color: "white", fontSize: s(10) }}>step 3 of 4</Text>
                </View>}

                <View>
                    <Text style={{ color: "#b1b1b1cc", padding: 4, marginLeft: "1.5%", marginTop: 10 }}>You can skip this step, however you won't be able to use the app to it's best </Text>
                </View>

                <KeyboardAvoidView>
                    <Formik
                        initialValues={{ bvn: "" }}
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
                                <View style={{ marginTop: s(30) }}>
                                    <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Bank Verification Number (BVN)</Text>
                                    <View style={styles.loginContainer2}>
                                        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: s(15), marginLeft: s(5) }}>+234</Text> */}
                                        <TextInput
                                            style={styles.input}
                                            placeholder='11 Digit Number'
                                            placeholderTextColor="#414a5e"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                handleChange("bvn")(text);
                                                setError(null);
                                            }}
                                            value={values.bvn}
                                        />
                                    </View>

                                    {/* <Text style={{ color: "white", marginBottom: s(10), fontSize: s(12), marginLeft: s(5) }}>Date Of Birth</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='DD/MM/YY'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("dateOfBirth")(text);
                                                setError(null);
                                            }}
                                            value={values.dateOfBrth}
                                        />
                                    </View>

                                    <Text style={{ color: "white", marginBottom: s(10), marginTop: s(5), fontSize: s(12), marginLeft: s(5) }}>Address</Text>
                                    <View style={styles.loginContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Select Gender'
                                            placeholderTextColor="#414a5e"
                                            onChangeText={(text) => {
                                                handleChange("gender")(text);
                                                setError(null);
                                            }}
                                            value={values.gender}
                                        />

                                    </View> */}

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                        <View style={styles.formContainer4}>
                                            <TouchableOpacity onPress={() => showMode("date")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ color: "white", fontSize: s(10), marginBottom: s(7), marginLeft: s(6) }}>Select Gender</Text>
                                                <Ionicons name="calendar" size={s(20)} color="white" style={{ marginRight: s(5) }} />
                                            </TouchableOpacity>
                                            <Text style={{ color: "white", fontWeight: "500", fontSize: s(13), marginLeft: s(6) }}>{startText}</Text>
                                        </View>

                                        <View style={styles.formContainer5}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ color: "white", fontSize: s(11), marginBottom: s(7), marginLeft: s(6) }}>Select Gender</Text>
                                                <MaterialCommunityIcons name="chevron-down" size={s(22)} color="white" />
                                            </TouchableOpacity>
                                            <Text style={{ color: "white", fontWeight: "500", fontSize: s(13), marginLeft: s(6) }}>{genderText}</Text>
                                        </View>
                                    </View>

                                    {error && <Text style={{ fontSize: s(12), marginTop: s(10), color: "red", marginLeft: s(8) }}>{error}</Text>}
                                    {/* <AppButton title="Sign Up" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} /> */}
                                    <AppButton title="Continue To Next Step" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />


                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAvoidView>

                {show && (
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        date={date}
                        onConfirm={onChange}
                        onCancel={() => setShow(false)}
                    />
                )}

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
                                    <MaterialCommunityIcons name="close-circle" size={s(22)} />
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: s(15), fontWeight: "600" }}>Gender Options</Text>
                                <Text></Text>
                            </View>
                            <View style={{ padding: 0, marginTop: 0, width: "100%" }}>
                                <View style={{ padding: s(10), marginBottom: s(0), }}>
                                    {gender.map((item, key) => (
                                        <TouchableOpacity key={key} onPress={() => { setGender(item.name), setModalVisible(false) }}>
                                            <Text style={{ fontSize: s(14), marginBottom: s(15), marginLeft: s(10) }}>{item.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            </View>
                        </SafeAreaView>
                    </View>
                </Modal>

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
        marginTop: s(40),
        height: s(50),
        marginBottom: s(20)
    },
    formContainer4: {
        marginTop: 10,
        borderWidth: s(2.5),
        borderRadius: 50,
        padding: 10,
        borderColor: "#414a5e",
        width: "48%",
        height: s(55)
    },
    formContainer5: {
        marginTop: 10,
        borderWidth: s(2.5),
        borderRadius: 50,
        padding: 10,
        borderColor: "#414a5e",
        width: "48%",
        height: s(55)
    },

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
        marginTop: s(10),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
})

export default CompleteDetails



