import React, { useEffect, useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native"
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { house1, house2 } from "../../../constants/images";
import { Formik } from 'formik';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useSelector } from 'react-redux'
import cred from '../../../config'
import axios from 'axios'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';
import AppButton from "../../../components/AppButtonBlue";



const AddBooks = ({ navigation }) => {

    const [imageId, setImageId] = useState(null)
    const [imagePass, setImagePass] = useState(null)
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [loading, setIsLoading] = useState(false)

    const { auth: { user } } = useSelector(state => state)

    const Schema = Yup.object().shape({
        title: Yup.string().required('Title field is required'),
        author: Yup.string().required('Author field is required'),
        price: Yup.string().required('Price field is required'),
        description: Yup.string().required('Description field is required'),
    });

    const addBooks = async (values) => {

        setIsLoading(true)
       
        const url = `${cred.URL}/books`
        const options = { headers: { Authorization: `Bearer ${user.token}`, "content-type": "multipart/form-data", } }

        const formData = new FormData();
        formData.append('image', { uri: selectedImageUri, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('title', values.title);
        formData.append('author', values.author);
        formData.append('price', values.price);
        formData.append('description', values.description);

        try {
            const response = await axios.post(url, formData, options);
            const { success, data, message } = response.data;

            if(success === "success"){
                navigation.goBack()
                setIsLoading(false)
                Alert.alert(`${success}`, `Book with title ${data.title} successfully created`)

            }else{
                setIsLoading(false)
                Alert.alert("failed", "Failed to create book")
            }

        } catch (error) {
            setIsLoading(false)
            const { message } = error.response.data
            Alert.alert("failed", `${message}`)
            console.log(error.response.data);
        }
    }


    const uploadImage = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1
        };

        try {
            const result = await launchImageLibrary(options);
            setSelectedImageUri(result.assets[0]?.uri || null);
            setImageId(result.assets[0]?.fileName || null);
            setImagePass(result.assets[0]?.uri || null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ padding: s(10), backgroundColor: "black", height: "100%" }}>
            <View style={{ marginTop: s(40), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left-thick" color="white" size={s(22)} />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: s(14), fontWeight: "bold" }}>Add New Book</Text>
                <Text></Text>
            </View>
            <View style={{ marginTop: s(30) }}>

                <View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => uploadImage()} style={styles.image1}>
                            <MaterialCommunityIcons name="image-plus" size={s(60)} color="grey" />
                        </TouchableOpacity>

                        {selectedImageUri ? (
                            <View style={styles.image}>
                                <Image source={{ uri: selectedImageUri }} style={{ width: '100%', height: '100%', borderRadius: s(5) }} />
                            </View>
                        ) : null}
                    </View>


                    <View style={{ width: "100%" }}>
                        <Formik
                            initialValues={{ title: "", author: "", price: "", description: ""  }}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                                Schema.validate(values)
                                    .then((res) => {
                                        addBooks(res)
                                    })
                                    .catch((err) => Alert.alert('Please provide proper details', err.message));
                            }}>
                            {(props) => {
                                const { handleChange, values, handleSubmit } = props;

                                return (
                                    <>
                                        <View>
                                            <View style={styles.searchContainer}>
                                                {/* <MaterialCommunityIcons name="magnify" size={s(22)} color="grey" style={{ marginRight: s(10) }} /> */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Title'
                                                    placeholderTextColor="grey"
                                                    onChangeText={(text) => {
                                                        handleChange('title')(text);
                                                        // filterBanks(text);
                                                    }}
                                                // value={values.banks}
                                                />
                                            </View>

                                            <View style={styles.searchContainer}>
                                                {/* <MaterialCommunityIcons name="magnify" size={s(22)} color="grey" style={{ marginRight: s(10) }} /> */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Author'
                                                    placeholderTextColor="grey"
                                                    onChangeText={(text) => {
                                                        handleChange('author')(text);
                                                        // filterBanks(text);
                                                    }}
                                                // value={values.banks}
                                                />
                                            </View>

                                            <View style={styles.searchContainer}>
                                                {/* <MaterialCommunityIcons name="magnify" size={s(22)} color="grey" style={{ marginRight: s(10) }} /> */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder='Price'
                                                    placeholderTextColor="grey"
                                                    keyboardType="numeric"
                                                    onChangeText={(text) => {
                                                        handleChange('price')(text);
                                                        // filterBanks(text);
                                                    }}
                                                // value={values.banks}
                                                />
                                            </View>

                                            <View style={styles.textContainer}>
                                                <TextInput
                                                    style={[styles.input, { height: 100 }]}
                                                    multiline={true}
                                                    placeholder='Description'
                                                    placeholderTextColor="grey"
                                                    onChangeText={(text) => {
                                                        handleChange('description')(text);
                                                        // filterBanks(text);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        {/* <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                            <Text style={{ color: "black", fontWeight: "bold", fontSize: s(13) }}>Add Book</Text>
                                        </TouchableOpacity> */}
                                        <AppButton title="Add Book" onPress={handleSubmit} isSubmitting={loading} style={styles.btn} />
                                    </>
                                );
                            }}
                        </Formik>
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: s(40),
        backgroundColor: "#00bdfe",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginTop: s(20)
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "lightgrey",
        paddingBottom: s(1),
        width: '100%',
        marginTop: s(20),
        height: s(45),
        paddingLeft: s(10),
        borderRadius: s(10),
        backgroundColor: "white"
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "lightgrey",
        paddingBottom: s(1),
        width: '100%',
        marginTop: s(20),
        height: s(100),
        paddingLeft: s(10),
        borderRadius: s(10),
        backgroundColor: "white"
    },
    input: {
        flex: 1,
        color: "black"
    },
    image1: {
        width: s(70),
        height: s(70),
        backgroundColor: "lightgrey",
        borderRadius: s(5),
        justifyContent: "center",
        alignItems: "center",
        marginRight: s(10)
    },
    image: {
        width: s(70),
        height: s(70),
        backgroundColor: "lightgrey",
        borderRadius: s(5),
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        backgroundColor: "#454545",
        marginTop: s(20),
        height: s(45),
        marginBottom: s(20),
        borderRadius: s(10)
    },
})

export default AddBooks