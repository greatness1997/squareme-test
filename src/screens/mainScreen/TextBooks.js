import React, { useEffect } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { house1, house2 } from "../../constants/images";
import { Formik } from 'formik';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



const TextBooks = ({ navigation }) => {

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
            <View style={{ marginTop: s(10) }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                    <View style={{ width: "85%" }}>
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
                    <TouchableOpacity onPress={() => navigation.navigate("AddBooks")} style={styles.add}>
                        <MaterialCommunityIcons name="plus" color="white" size={s(20)} />
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <View style={styles.card} >
                        <Image source={house2} style={styles.house} />
                        <View style={{ marginTop: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "bold", color: "white" }}>LAST LAUGH</Text>
                            <Text style={{ fontSize: s(13), color: "white" }}>by Remi Ani</Text>
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "grey" }}>₦1,500</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12) }}>VIEW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card} >
                        <Image source={house2} style={styles.house} />
                        <View style={{ marginTop: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "bold", color: "white" }}>THINGS FALL APART</Text>
                            <Text style={{ fontSize: s(13), color: "white" }}>by Chinua Achebe</Text>
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "grey" }}>₦2,000</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12) }}>VIEW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card} >
                        <Image source={house2} style={styles.house} />
                        <View style={{ marginTop: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "bold", color: "white" }}>PALACE GUARD</Text>
                            <Text style={{ fontSize: s(13), color: "white" }}>by Remi Ani</Text>
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "grey" }}>₦1,500</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12) }}>VIEW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card} >
                        <Image source={house2} style={styles.house} />
                        <View style={{ marginTop: s(10) }}>
                            <Text style={{ fontSize: s(13), fontWeight: "bold", color: "white" }}>DEEP</Text>
                            <Text style={{ fontSize: s(13), color: "white" }}>by John Doe</Text>
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "grey" }}>₦1,000</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: s(12) }}>VIEW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: s(35),
        backgroundColor: "#00bdfe",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(5),
        marginTop: s(8)
    },
    house: {
        width: "100%",
        height: s(80),
        resizeMode: "contain"
    },
    card: {
        marginTop: s(15),
        width: "48%",
        borderWidth: 1,
        borderColor: "grey",
        padding: s(8),
        borderRadius: s(10)
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
        backgroundColor: "#00bdfe",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(50),
        marginTop: s(10)
    }
})

export default TextBooks