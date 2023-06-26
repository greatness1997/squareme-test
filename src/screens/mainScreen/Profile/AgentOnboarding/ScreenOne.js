import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { LogoBlue } from '../../../../constants/images';
import KeyboardAvoidView from '../../../../components/KeyboardAvoidingView';
import AppButton from '../../../../components/AppButtonBlue';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'



const ScreenOne = ({ navigation }) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [genderText, setGenderText] = useState('male')

    const gender = [{ label: "Male", name: "male" }, { label: "Female", name: "female" }, { label: "Others", name: "others" }]

    const setGender = (gender) => {
        setGenderText(gender)
    }

    const close = () => {
        setModalVisible(false)
    }

    const Schema = Yup.object().shape({
        dateOfBirth: Yup.string().required('Date of birth is required '),
        bvn: Yup.string().required('Bank Verification Number is required'),
        address: Yup.string().required('Address is required'),
        businessName: Yup.string().required('Business Name is required'),
        officeAddress: Yup.string().required('Office Address is required'),
        officeState: Yup.string().required('Office State is required'),
        officeLga: Yup.string().required('Office L.G.A is required'),
        gender: Yup.string().required('Gender is required'),
        nokFullName: Yup.string().required('Next of kin name is required'),
        nokEmail: Yup.string().email("invalid email at next of kin email").required('Next of kin email is required'),
        nokPhone: Yup.string().required('Next of kin phone number is required'),
    });

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            padding: s(10)
        },
        input: {
            color: "#6a6a6a",
            fontWeight: "600", fontSize: s(13),
            height: s(40),
        },
        formContainer: {
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec"
        },
        formContainer2: {
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            flexDirection: "row",

        },
        formContainer3: {
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            width: "48%"
        },
        formContainer4: {
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            width: "48%"
        },
        formContainer5: {
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            marginTop: 10
        },
        formContainer6: {
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: error ? "#DD1515" : "#327fec",
            marginTop: 10,
            // width: "100%"
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

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(10) }}>
                    <MaterialCommunityIcon name="arrow-left" size={s(25)} onPress={() => navigation.goBack()} />
                    <Image source={LogoBlue} />
                    <Text></Text>
                </View>


                <View style={{ marginTop: s(30) }}>
                    <Text style={{ color: "#2A2F5C", fontWeight: "bold", fontSize: s(14) }}>Personal Info</Text>
                    <Text style={{ color: "#A0A0A0", fontWeight: "300", fontSize: s(10), marginTop: s(4) }}>Please provide your personal info</Text>
                </View>
                <KeyboardAvoidView>

                    <Formik
                        initialValues={{
                            bvn: "",
                            dateOfBirth: "",
                            address: "",
                            businessName: "",
                            officeAddress: "",
                            officeState: "",
                            officeLga: "",
                            gender: genderText || "",
                            nokFullName: "",
                            nokEmail: "",
                            nokPhone: ""
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    setLoading(true)
                                    navigation.navigate("GuarantorDetails", { data: res })
                                })
                                .catch((err) => {
                                    setError(`${err}`)
                                });
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <View style={{ marginTop: s(20) }}>

                                    <View style={styles.formContainer}>
                                        <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}> Address</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your home'
                                            onChangeText={(text) => {
                                                handleChange('address')(text)
                                                setError(null)
                                            }}
                                            value={values.address}
                                        />
                                    </View>

                                    <View style={styles.formContainer5}>
                                        <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Office Address</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your office'
                                            onChangeText={(text) => {
                                                handleChange('officeAddress')(text)
                                                setError(null)
                                            }}
                                            value={values.officeAddress}
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                        <View style={styles.formContainer3}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Office State</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter your office State'
                                                onChangeText={(text) => {
                                                    handleChange('officeState')(text)
                                                    setError(null)
                                                }}
                                                value={values.officeState}
                                            />
                                        </View>
                                        <View style={styles.formContainer4}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Office LGA</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter your office LGA'
                                                onChangeText={(text) => {
                                                    handleChange('officeLga')(text)
                                                    setError(null)
                                                }}
                                                value={values.officeLga}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.formContainer5}>
                                        <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Next of kin Full Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter next of Kin FullName'
                                            onChangeText={(text) => {
                                                handleChange('nokFullName')(text)
                                                setError(null)
                                            }}
                                            value={values.nokFullName}
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                        <View style={styles.formContainer3}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Next of kin Email</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter next of Kin Email'
                                                onChangeText={(text) => {
                                                    handleChange('nokEmail')(text)
                                                    setError(null)
                                                }}
                                                value={values.nokEmail}
                                            />
                                        </View>
                                        <View style={styles.formContainer4}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Next of kin Phone Number</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter next of Kin Phone No.'
                                                onChangeText={(text) => {
                                                    handleChange('nokPhone')(text)
                                                    setError(null)
                                                }}
                                                keyboardType='numeric'
                                                value={values.nokPhone}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.formContainer5}>
                                        <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Business Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your Business Name'
                                            onChangeText={(text) => {
                                                handleChange('businessName')(text)
                                                setError(null)
                                            }}
                                            value={values.businessName}
                                        />
                                    </View>

                                    <View style={{ height: 1, backgroundColor: "lightgrey", marginTop: s(20) }}></View>

                                    <View style={{ marginTop: s(20) }}>
                                        <Text style={{ color: "#2A2F5C", fontWeight: "bold", fontSize: s(14) }}>Identification Info</Text>
                                        <Text style={{ color: "#A0A0A0", fontWeight: "300", fontSize: s(10), marginTop: s(4) }}>Please provide Identification info</Text>
                                    </View>

                                    <View style={styles.formContainer6}>
                                        <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Bank Verification Number</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Enter your BVN'
                                            onChangeText={(text) => {
                                                handleChange('bvn')(text)
                                                setError(null)
                                            }}
                                            keyboardType='numeric'
                                            value={values.bvn}
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                        <View style={styles.formContainer3}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Date Of Birth</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='MM-DD-YYYY'
                                                onChangeText={(text) => {
                                                    handleChange('dateOfBirth')(text)
                                                    setError(null)
                                                }}
                                                value={values.dateOfBirth}
                                            />
                                        </View>
                                        <View style={styles.formContainer4}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ color: "#A0A0A0", fontSize: s(10), marginBottom: s(7) }}>Select Gender</Text>
                                                <MaterialCommunityIcon name="chevron-down" size={s(25)} />
                                            </TouchableOpacity>
                                            <Text style={{ color: "#6a6a6a", fontWeight: "500" }}>{genderText}</Text>
                                        </View>
                                    </View>
                                    {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                                    <AppButton title="Next To Guarantors Info" isSubmitting={loading} onPress={handleSubmit} style={{ backgroundColor: "#060C27", height: s(60), marginTop: s(30) }} />
                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAvoidView>

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
                                    <MaterialCommunityIcon name="close-circle" size={s(25)} />   
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: s(15), fontWeight: "600" }}>Gender Options</Text>
                                <Text></Text>
                            </View>
                            <View style={{ padding: 0, marginTop: 0, width: "100%" }}>
                                <View style={{ padding: s(10), marginBottom: s(0), }}>
                                    {gender.map((item, key) => (
                                        <TouchableOpacity key={key} onPress={() => { setGender(item.name), setModalVisible(false) }}>
                                            <Text style={{ fontSize: s(18), marginBottom: s(15) }}>{item.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            </View>
                        </SafeAreaView>
                    </View>
                </Modal>
            </View>


        </SafeAreaView>
    )


}



export default ScreenOne;