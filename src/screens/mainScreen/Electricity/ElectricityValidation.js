import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from '../../../constants/color'
import { Formik } from 'formik'
import AppButton from '../../../components/AppButtonBlue'

const ElectricityValidation = ({ navigation }) => {

    const [selectedOption, setSelectedOption] = useState("prepaid")
    const [phase, setPhase] = useState(1)

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }


    return (
        <>
            <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: 100 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Electricity</Text>
                </View>

            </View>

            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => {handleOptionPress('prepaid'), setPhase(1)}}>
                    <Text style={selectedOption === "prepaid" ? styles.selectedOption : styles.unselectedOption}>Prepaid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {handleOptionPress('postpaid'), setPhase(2)}}>
                    <Text style={selectedOption === "postpaid" ? styles.selectedOption : styles.unselectedOption}>Postpaid</Text>
                </TouchableOpacity>

            </View>

            {phase === 1 && (<View style={{ alignItems: "center", marginTop: 40 }}>
                <Formik
                    initialValues={{ meterNumber: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;

                        return (
                            <View>
                                <Text style={{ marginLeft: 5 }}>Enter Meter Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleChange('meterNumber')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Customer's Name</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        onChangeText={handleChange('name')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Amount'
                                        onChangeText={handleChange('amount')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Phone Number'
                                        onChangeText={handleChange('phone')}
                                        value={values}
                                    />
                                </View>
                            </View>
                        );
                    }}
                </Formik>
            </View>)}


            {/* phase 2  */}

            {phase === 2 && (<View style={{ alignItems: "center", marginTop: 40 }}>
                <Formik
                    initialValues={{ meterNumber: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        Schema.validate(values)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => Alert.alert('Please provide proper details',));
                    }}>
                    {(props) => {
                        const { handleChange, values, handleSubmit } = props;

                        return (
                            <View>
                                <Text style={{ marginLeft: 5 }}>Enter Meter Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleChange('meterNumber')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Customer's Name</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        onChangeText={handleChange('name')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Amount'
                                        onChangeText={handleChange('amount')}
                                        value={values}
                                    />
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Phone Number'
                                        onChangeText={handleChange('phone')}
                                        value={values}
                                    />
                                </View>
                            </View>
                        );
                    }}
                </Formik>
            </View>)}

            <AppButton title="Confirm Transfer" style={{ width: "90%", marginLeft: 20 }} />
        </>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: 50,
        marginTop: '2%',
        marginBottom: 25
    },
    input: {
        flex: 1,
        height: 20,
        color: "white"
    },

    selectedOption: {
        borderWidth: 2,
        borderColor: color.primary2,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    unselectedOption: {
        borderBottomWidth: 0
    }
})

export default ElectricityValidation

