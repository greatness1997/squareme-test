import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { LogoBlue } from '../../../../constants/images';
import KeyboardAvoidView from '../../../../components/KeyboardAvoidingView';
import AppButton from '../../../../components/AppButtonBlue';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useSelector } from 'react-redux';
import cred from '../../../../config'
import axios from 'axios';


const UploadDoc = ({ navigation }) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [idCard, setIdCard] = useState(null)
    const [utility, setUtility] = useState(null)
    const [passport, setPassport] = useState(null)
    const [cac, setCac] = useState(null)
    const [guranId, setGuaranId] = useState(null)
    const [guranPass, setGuranPass] = useState(null)

    const [idCardUrl, setIdCardUrl] = useState(null)
    const [utilityUrl, setUtilityUrl] = useState(null)
    const [passportUrl, setPassportUrl] = useState(null)
    const [cacUrl, setCacUrl] = useState(null)
    const [guranIdUrl, setGuaranIdUrl] = useState(null)
    const [guranPassUrl, setGuranPassUrl] = useState(null)

    const uploadIdCard = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setIdCard(result.assets[0].fileName)
            setIdCardUrl(result.assets[0].uri)

        } catch (error) {
            console.log(error)
        }
    }

    const uploadUtility = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setUtility(result.assets[0].fileName)
            setUtilityUrl(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadPassport = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setPassport(result.assets[0].fileName)
            setPassportUrl(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadCac = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setCac(result.assets[0].fileName)
            setCacUrl(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadGuranId = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setGuaranId(result.assets[0].fileName)
            setGuaranIdUrl(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadGuranPass = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options)
            setGuranPass(result.assets[0].fileName)
            setGuranPassUrl(result.assets[0].uri)
        } catch (error) {
            console.log(error)
        }
    }

    const { auth: { user } } = useSelector(state => state)

    const uploadDocs = async () => {
        const url = `${cred.URL}/auth/upload-kyc-documents`
        const options = { headers: { Authorization: `Bearer ${user.token}`, "content-type": "multipart/form-data", } }

        const formData = new FormData();
        formData.append('idCard', { uri: idCardUrl, name: 'idCard.jpg', type: 'image/jpeg' });
        formData.append('utilityBill', { uri: utilityUrl, name: 'utilityBill.jpg', type: 'image/jpeg' });
        formData.append('passport', { uri: passportUrl, name: 'passport.jpg', type: 'image/jpeg' });
        formData.append('cacDocument', { uri: cacUrl, name: 'cacDocument.jpg', type: 'image/jpeg' });
        formData.append('guarantorsId', { uri: guranIdUrl, name: 'guarantorsId.jpg', type: 'image/jpeg' });
        formData.append('guarantorsPassport', { uri: guranPassUrl, name: 'guarantorsPassport.jpg', type: 'image/jpeg' });


        try {
            setLoading(true)
            const response = await axios.post(url, formData, options)
            console.log(response, "here here")
            const { status, message, } = response.data

            if (status !== "success") {
                setError(message)
                setLoading(false)
            } else {
                setLoading(false)
                Alert.alert(`${message}`)
                navigation.navigate('Profile')
            }

        } catch (error) {
            console.log(error, "got tot catch")

            if (error.response && error.response.data) {
                const { message } = error.response.data
                setError(message)
            } else {
                setError('An error occur while uploading documents')
            }
        }
    }



    return (
        <SafeAreaView>


            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(10), padding: s(10) }}>
                <MaterialCommunityIcon name="arrow-left" size={s(25)} onPress={() => navigation.goBack()} />
                <Image source={LogoBlue} />
                <Text></Text>
            </View>
            <View style={styles.container}>
                <ScrollView>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>ID Card</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadIdCard()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {idCard === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {idCard.length > 25 ? `${idCard.substring(0, 20)}...${idCard.substring(idCard.length - 4)}` : idCard}
                                </Text>
                            }
                        </View>
                        {idCard && <TouchableOpacity onPress={() => setIdCard(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>Utility Bill</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadUtility()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {utility === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {utility.length > 25 ? `${utility.substring(0, 20)}...${utility.substring(utility.length - 4)}` : utility}
                                </Text>
                            }
                        </View>
                        {utility && <TouchableOpacity onPress={() => setUtility(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>Passport</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadPassport()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {passport === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {passport.length > 25 ? `${passport.substring(0, 20)}...${passport.substring(passport.length - 4)}` : passport}
                                </Text>
                            }
                        </View>
                        {passport && <TouchableOpacity onPress={() => setPassport(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>Cac Document</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadCac()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {cac === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {cac.length > 25 ? `${cac.substring(0, 20)}...${cac.substring(cac.length - 4)}` : cac}
                                </Text>
                            }
                        </View>
                        {cac && <TouchableOpacity onPress={() => setCac(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>Gurantor's ID</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadGuranId()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {guranId === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {guranId.length > 25 ? `${guranId.substring(0, 20)}...${guranId.substring(guranId.length - 4)}` : guranId}
                                </Text>
                            }
                        </View>
                        {guranId && <TouchableOpacity onPress={() => setGuaranId(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    <Text style={{ marginBottom: s(7), fontWeight: "600", fontSize: s(12), color: "#777777" }}>Guarantor's Passport</Text>
                    <TouchableOpacity style={styles.upload} onPress={() => uploadGuranPass()}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcon name="image-plus" size={s(25)} color="#3381f2" />
                            {guranPass === null ?
                                <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    Tap Here To Upload
                                </Text> : <Text style={{ fontWeight: "400", fontSize: s(12), marginLeft: s(15), color: "#777777" }}>
                                    {guranPass.length > 25 ? `${guranPass.substring(0, 20)}...${guranPass.substring(guranPass.length - 4)}` : guranPass}
                                </Text>
                            }
                        </View>
                        {guranPass && <TouchableOpacity onPress={() => setGuranPass(null)}>
                            <MaterialCommunityIcon name="close-circle" size={s(25)} color="#b22222" />
                        </TouchableOpacity>}
                    </TouchableOpacity>

                    {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                    <AppButton title="Finish Uploading Documents" isSubmitting={loading} onPress={() => uploadDocs()} style={{ marginBottom: s(150) }} />

                </ScrollView>

            </View>
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: s(15)
    },
    upload: {
        flexDirection: "row",
        alignItems: "center",
        padding: s(10),
        borderWidth: s(1.5),
        borderColor: "#d5d5d5",
        borderRadius: s(5),
        marginBottom: s(15),
        justifyContent: "space-between"
    }
})

export default UploadDoc;