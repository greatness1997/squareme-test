import React, { useEffect } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { house1, house2 } from "../../constants/images";
import { Formik } from 'formik';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



const AddBooks = ({ navigation }) => {

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
                    <TouchableOpacity style={styles.image}>
                        <MaterialCommunityIcons name="image-plus" size={s(60)} color="grey" />
                    </TouchableOpacity>

                    <View style={{ width: "100%" }}>
                        <Formik
                            initialValues={{ book: "" }}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                                Schema.validate(values)
                                    .then((res) => {

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
                                                    placeholder='Amount'
                                                    placeholderTextColor="grey"
                                                    onChangeText={(text) => {
                                                        handleChange('amount')(text);
                                                        // filterBanks(text);
                                                    }}
                                                // value={values.banks}
                                                />
                                            </View>

                                            <View style={styles.textContainer}>
                                                <TextInput
                                                    style={[styles.input, { height: 100 }]}
                                                    multiline={true}
                                                    placeholder='About Book'
                                                    placeholderTextColor="grey"
                                                    onChangeText={(text) => {
                                                        handleChange('about')(text);
                                                        // filterBanks(text);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={{ color: "black", fontWeight: "bold", fontSize: s(13) }}>Add Book</Text>
                                        </TouchableOpacity>
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
    image: {
        width: s(70),
        height: s(70),
        backgroundColor: "lightgrey",
        borderRadius: s(5),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddBooks