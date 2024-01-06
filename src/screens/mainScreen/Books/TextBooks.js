import React, { useEffect, useState } from "react"
import { View, ActivityIndicator, RefreshControl, Alert, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { house1, house2 } from "../../../constants/images";
import { Formik } from 'formik';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useSelector } from 'react-redux'
import cred from '../../../config'
import axios from 'axios'

import "intl"
import "intl/locale-data/jsonp/en";


const TextBooks = ({ navigation }) => {

    const [books, setBooks] = useState([])
    const [loading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const { auth: { user } } = useSelector(state => state)


    const getMyBooks = async () => {

        setIsLoading(true)

        let url;
        if (user.userType === "lecturer") {
            url = `${cred.URL}/books/my-books?page=1&limit=10&orderBy=title&order=asc`;
        } else {
            url = `${cred.URL}/books?page=1&limit=10&orderBy=title&order=asc&populate=createdBy`;
        }

        const options = { headers: { Authorization: `Bearer ${user.token}` } }

        try {
            const response = await axios.get(url, options);
            const { success, data, message } = response.data;

            if (success === "success") {
                setBooks(data.docs)
                setIsLoading(false)

            } else {
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



    const refreshData = async () => {
        setRefreshing(true);
        // Call your refresh data function here
        await getMyBooks();
        setRefreshing(false);
    };

    const format = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2
    })

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         getMyBooks()
    //     }, 5000);
    //     return () => clearInterval(intervalId);
    // }, [])

    useEffect(() => {
        getMyBooks()
    }, [])

    const renderItem = ({ item }) => {
        let originalText = item.description;
        let limitedText = originalText.split(' ').slice(0, 10).join(' ');
    
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ViewBooks", { data: item })} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.house} />
                <View style={{ marginTop: s(10) }}>
                    <Text style={{ fontSize: s(13), fontWeight: "bold", color: "white" }}>{item.title}</Text>
                    <Text style={{ fontSize: s(13), color: "white", fontStyle: 'italic'  }}>{item.author}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: s(14), color: "grey" }}>{`₦${format.format(item.price)}`}</Text>
                    <Text style={{ fontSize: s(11), color: "white", marginTop: s(3) }}>{limitedText} ...</Text>
                    {/* <TouchableOpacity onPress={() => navigation.navigate("ViewBooks", { data: item })} style={styles.button}>
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: s(12) }}>VIEW</Text>
                        </TouchableOpacity> */}
                </View>
            </TouchableOpacity>
        );
    };

return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View style={{ padding: s(10), backgroundColor: "black", height: "100%" }}>
        <View style={{ marginTop: s(40), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left-thick" color="white" size={s(22)} />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: s(14), fontWeight: "bold" }}>My Book List</Text>
            <Text></Text>
        </View>
        <View style={{ marginTop: s(10), marginBottom: s(120) }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <View style={{ width: "85%", marginBottom: s(10) }}>
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
                                <View>
                                    <View style={styles.searchContainer}>
                                        <MaterialCommunityIcons name="magnify" size={s(22)} color="grey" style={{ marginRight: s(10) }} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Search Book Title?'
                                            placeholderTextColor="grey"
                                            onChangeText={(text) => {
                                                handleChange('book')(text);
                                                // filterBanks(text);
                                            }}
                                        // value={values.banks}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </View>
                {user.userType === "lecturer" && (<TouchableOpacity onPress={() => navigation.navigate("AddBooks")} style={styles.add}>
                    <MaterialCommunityIcons name="plus" color="white" size={s(20)} />
                </TouchableOpacity>)}
            </View>

            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={{ justifyContent: 'space-between' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshData}
                        colors={['white']} // Set your desired loading indicator color
                    />
                }
            />

            {loading && (<View style={styles.overlay}>
                <ActivityIndicator size="large" color="white" />
            </View>)}

            {refreshing && <View style={styles.overlay}>
                <ActivityIndicator size="large" color="white" />
                <Text style={{ color: 'white', marginTop: 10 }}>Refreshing...</Text>
            </View>}

        </View>
    </View>
)
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: s(35),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginTop: s(8)
    },
    house: {
        width: "100%",
        height: s(80),
        resizeMode: "cover"
    },
    card: {
        marginTop: s(10),
        width: "48%",
        borderWidth: 1,
        borderColor: "grey",
        padding: s(8),
        borderRadius: s(10),
        marginRight: s(10),
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: "lightgrey",
        paddingBottom: s(1),
        width: '100%',
        marginTop: s(20),
        height: s(40),
        paddingLeft: s(10),
        borderRadius: s(10),
        backgroundColor: "white"
    },
    input: {
        flex: 1,
        color: "black"
    },
    add: {
        width: s(30),
        height: s(30),
        backgroundColor: "#454545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(50),
        marginTop: s(10)
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default TextBooks