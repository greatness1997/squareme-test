import React, {useState} from 'react'
import { View, Text, SafeAreaView, TextInput, Image, StyleSheet, ScrollView, Alert} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { LogoBlue } from '../../../../constants/images';
import KeyboardAvoidView from '../../../../components/KeyboardAvoidingView';
import AppButton from '../../../../components/AppButtonBlue';

import { useSelector } from 'react-redux';
import cred from '../../../../config'
import axios from 'axios';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"



const ScreenTwo = ({ navigation, route }) => {

    const [ error, setError ] = useState(null)
    const [loading, setLoading] = useState(false)
    const { data } = route.params
    console.log(data)

    const Schema = Yup.object().shape({
        guarantorsFullName: Yup.string().required('Guarantors full name is required'),
        guarantorsProfession: Yup.string().required('Guarantors profession is required'),
        guarantorsEmail: Yup.string().email('"invalid email at guarantors email"').required('Guarantors email is required'),
        guarantorsResidence: Yup.string().required('Guarantors residence is required'),
        guarantorsOffice: Yup.string().required('Guarantors office is required'),
        guarantorsPhone: Yup.string().required('Guarantors phone number is required'),
        guarantorsRelationship: Yup.string().required('Guarantors relationship is required'),
    });

    const { auth: { user } } = useSelector(state => state)

    const updateDetails = async (res) => {
        const url = `${cred.URL}/auth/update-user-details`
        const options = { headers: { Authorization: `Bearer ${user.token}` } }
        const body = {
            "bvn": data.bvn,
            "dateOfBirth": data.dateOfBirth,
            "address": data.address,
             "businessName": data.businessName,
             "officeAddress": data.officeAddress,
             "officeState": data.officeState,
             "officeLga": data.officeLga,
             "gender": data.gender,
             "nokFullName": data.nokFullName,
             "nokEmail": data.nokEmail,
             "nokPhone": data.nokPhone,
             "guarantorsFullName": res.guarantorsFullName,
             "guarantorsProfession": res.guarantorsProfession,
             "guarantorsEmail": res.guarantorsEmail,
             "guarantorsResidence": res.guarantorsResidence,
             "guarantorsOffice": res.guarantorsOffice,
             "guarantorsPhone": res.guarantorsPhone,
             "guarantorsRelationship": res.guarantorsRelationship
         }

         console.log(body)
      
        try {
            setLoading(true)
            const response = await axios.post(url, body, options)
            const { status, message, } = response.data

            
            if (status !== "success") {
                setError(message)
                setLoading(false)
            } else {
                setLoading(false)
                Alert.alert(`${message}`)
                navigation.navigate('UploadDoc')
            }

        } catch (error) {
            console.log(error.response.data, 'from catch')
            const errors = error.response.data.errors
            setError(errors)
            setLoading(false)
        }
    }

    const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: s(10)
    },
    input: {
        color: "#6a6a6a",
        fontWeight: "600",fontSize: s(13)
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
                        <Text style={{ color: "#2A2F5C", fontWeight: "bold", fontSize: s(14) }}>Guarantor's Information</Text>
                        <Text style={{ color: "#A0A0A0", fontWeight: "300", fontSize: s(10), marginTop: s(4) }}>Please provide identification information</Text>
                    </View>
                    <KeyboardAvoidView>
                    
                        <Formik
                            initialValues={{ 
                                guarantorsFullName: "", 
                                guarantorsEmail: "", 
                                guarantorsResidence: "", 
                                guarantorsRelationship: "", 
                                guarantorsOffice: "", 
                                guarantorsPhone: "",
                                guarantorsProfession: "",
                            }}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                                Schema.validate(values)
                                    .then((res) => {
                                        updateDetails(res)
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
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}> Guarantor's full name</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter gurantors full name'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsFullName')(text)
                                                    setError(null)
                                                }}
                                                value={values.guarantorsFullName}
                                            />
                                        </View>

                                        <View style={styles.formContainer5}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Guarantors Email</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter Guarantors email'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsEmail')(text)
                                                    setError(null)
                                                }}
                                                value={values.guarantorsEmail}
                                            />
                                        </View>

                                        <View style={styles.formContainer5}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Guarantor's Residence</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter guarantors residence'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsResidence')(text)
                                                    setError(null)
                                                  }}
                                                value={values.guarantorsResidence}
                                            />
                                        </View>

                                        <View style={styles.formContainer5}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Gurantors Relationship</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter Guarantors relationship status'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsRelationship')(text)
                                                    setError(null)
                                                  }}
                                                value={values.guarantorsRelationship}
                                            />
                                        </View>

                                        <View style={styles.formContainer6}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Guarantors Office</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter Guarantors office location'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsOffice')(text)
                                                    setError(null)
                                                  }}
                                                value={values.guarantorsOffice}
                                            />
                                        </View>

                                        <View style={styles.formContainer6}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Guarantor's Number</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter Guarantors phone number'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsPhone')(text)
                                                    setError(null)
                                                  }}
                                                keyboardType='numeric'
                                                value={values.guarantorsPhone}
                                            />
                                        </View>

                                        <View style={styles.formContainer6}>
                                            <Text style={{ color: "#A0A0A0", marginBottom: s(10), fontSize: s(10), marginBottom: s(7) }}>Guarantor's Profession</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter Gurantors Profession'
                                                onChangeText={(text) => {
                                                    handleChange('guarantorsProfession')(text)
                                                    setError(null)
                                                  }}
                                                value={values.guarantorsProfession}
                                            />
                                        </View>
                                        {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                                        <AppButton title="Continue To Upload Document" isSubmitting={loading} onPress={handleSubmit} style={{ backgroundColor: "#060C27", height: s(60), marginTop: s(30) }} />
                                    </View>
                                );
                            }}
                        </Formik>
                        </KeyboardAvoidView>
                    </View>
                
         
        </SafeAreaView>
    )

    
}



export default ScreenTwo;