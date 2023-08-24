import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { LogoBlue } from '../../constants/images';
import AppButton from '../../components/AppButtonWhite';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useSelector } from 'react-redux';
import cred from '../../config'
import axios from 'axios';


const Document = ({ navigation }) => {

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

    const [isToastVisible, setIsToastVisible] = useState(false)
    const [message, setMessage] = useState('')

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
                showToast(message)
                setLoading(false)
            } else {
                setLoading(false)
                Alert.alert("Successfully Registered")
                navigation.navigate('login')
            }

        } catch (error) {
            console.log(error, "got tot catch")

            if (error.response && error.response.data) {
                const { message } = error.response.data
                showToast(message)
            } else {
                setError('An error occur while uploading documents')
            }
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
        <View style={styles.container1}>
            <SafeAreaView>
            {isToastVisible && <ToastNotification message={message} />}
                {!isToastVisible && <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: s(15), paddingLeft: s(10), paddingRight: s(14) }}>
                    <View style={{ flexDirection: "row", alignItems: "center",  }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <MaterialCommunityIcon name="arrow-left" size={s(25)} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: s(5), fontWeight: "bold", fontSize: s(14), color: "white" }}>Tell Us About Yourself</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("login")}>
                        <Text style={{ fontSize: s(14), fontWeight: "bold", color: "#a9c2f8" }}>Skip</Text>
                    </TouchableOpacity>
                </View>}

                {!isToastVisible && <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: s(18), paddingLeft: s(12), paddingRight: s(14) }}>
                    <Text style={{ color: "white", fontSize: s(13) }}>Profile Information</Text>
                    <Text style={{ color: "white", fontSize: s(10) }}>step 4 of 4</Text>
                </View>}

                <View style={{ paddingLeft: s(5), paddingRight: s(6), marginTop: s(10), marginBottom: s(5) }}>
                    <Text style={{ color: "#b1b1b1cc", padding: 4, marginLeft: "1.5%", marginTop: 10 }}>You can skip this step, however you won't be able to use the app to it's best </Text>
                </View>

                <View style={styles.container}>
                    <ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => uploadIdCard()} style={{ width: "47%", height: 120, backgroundColor: idCard ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: idCard ? "#1b2d56" : "white" }}>Govt given ID</Text>
                                    {idCard && <TouchableOpacity onPress={() => setIdCard(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {idCard === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: idCard ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {idCard.length > 25 ? `${idCard.substring(0, 8)}..${idCard.substring(idCard.length - 4)}` : idCard}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => uploadUtility()} style={{ width: "47%", height: 120, backgroundColor: utility ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: utility ? "#1b2d56" : "white" }}>Utility Bill</Text>
                                    {utility && <TouchableOpacity onPress={() => setUtility(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {utility === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: utility ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {utility.length > 25 ? `${utility.substring(0, 8)}..${utility.substring(utility.length - 4)}` : utility}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(18) }}>
                            <TouchableOpacity onPress={() => uploadCac()} style={{ width: "47%", height: 120, backgroundColor: cac ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: cac ? "#1b2d56" : "white" }}>CAC</Text>
                                    {cac && <TouchableOpacity onPress={() => setCac(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {cac === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: cac ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {cac.length > 25 ? `${cac.substring(0, 8)}..${cac.substring(cac.length - 4)}` : cac}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => uploadPassport()} style={{ width: "47%", height: 120, backgroundColor: passport ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: passport ? "#1b2d56" : "white" }}>Passport</Text>
                                    {passport && <TouchableOpacity onPress={() => setPassport(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {passport === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: passport ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {passport.length > 25 ? `${passport.substring(0, 8)}..${passport.substring(passport.length - 4)}` : passport}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: s(18) }}>
                            <TouchableOpacity onPress={() => uploadGuranId()} style={{ width: "47%", height: 120, backgroundColor: guranId ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: guranId ? "#1b2d56" : "white" }}>Gurantor's ID</Text>
                                    {guranId && <TouchableOpacity onPress={() => setGuaranId(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {guranId === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: guranId ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {guranId.length > 25 ? `${guranId.substring(0, 8)}..${guranId.substring(guranId.length - 4)}` : guranId}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => uploadGuranPass()} style={{ width: "47%", height: 120, backgroundColor: guranPass ? "white" : "#414a5e", padding: s(10), borderRadius: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: guranPass ? "#1b2d56" : "white" }}>Gurantor's Pass</Text>
                                    {guranPass && <TouchableOpacity onPress={() => setGuranPass(null)}>
                                        <MaterialCommunityIcon name="trash-can" size={s(22)} color="#d90000" />
                                    </TouchableOpacity>}
                                </View>
                                {guranPass === null ? (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="smart-card" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text style={{ color: "#777777", fontWeight: "bold" }}>Tap Here</Text>
                                        <Text style={{ color: "#777777", fontWeight: "bold", marginTop: s(2) }}>Top Upload</Text>
                                    </View>
                                </View>) : (<View style={{ flexDirection: "row", alignItems: "center", marginTop: s(10) }}>
                                    <View style={{ backgroundColor: guranPass ? "green" : "#1b2d56", width: s(35), height: s(35), borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                                        <MaterialCommunityIcon name="image-size-select-actual" size={s(20)} color="white" />
                                    </View>

                                    <View style={{ marginLeft: s(5) }}>
                                        <Text>
                                            {guranPass.length > 25 ? `${guranPass.substring(0, 8)}..${guranPass.substring(guranPass.length - 4)}` : guranPass}
                                        </Text>
                                    </View>
                                </View>)}
                            </TouchableOpacity>
                        </View>

                        {error && <Text style={{ marginTop: s(8), color: "#DD1515", }}>{error}</Text>}
                        <AppButton title="Confirm All Document" isSubmitting={loading} onPress={() => uploadDocs()} style={{ marginBottom: s(100), marginTop: s(30), backgroundColor: "#a9c2f8" }} />

                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )


}

const styles = StyleSheet.create({
    container1: {
        width: "100%",
        height: "100%",
        backgroundColor: "#060C27",
    },
    container: {
        padding: s(15),
        marginBottom: s(20)
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

export default Document;