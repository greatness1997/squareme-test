import React, { useState } from 'react'
import { Modal, SafeAreaView, View, StyleSheet, Text, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Validate = ({ navigation }) => {

    const banks = [{ name: "gtbank" }, { name: "sterling" }, { name: "opay" }, { name: "first bank" },]

    const [modalVisible, setModalVisible] = useState(false)

    const close = () => {
        setModalVisible(false)
    }

    const Schema = Yup.object().shape({
        banks: Yup.string().required('Please enter a bank name'),
    });

    return (
        <View style={{ flex: 1, marginTop: 40, marginLeft: 20, width: "90%" }}>

            <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}> 
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: 100 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Send Money To</Text>
                </View>
            </View>

            <Formik
                initialValues={{ banks: "" }}
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
                            <View style={styles.emailContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Select Recipient Bank'
                                    onChangeText={handleChange('banks')}
                                    value={values}
                                />
                                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                                    <MaterialCommunityIcons name='chevron-down' size={30} />
                                </TouchableWithoutFeedback>

                            </View>
                        </View>
                    );
                }}
            </Formik>

            <Modal
                visible={modalVisible}
                animationType='slide'
                style={{ height: "80%" }}
            >
                <SafeAreaView>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', padding: 20 }}>
                        <TouchableWithoutFeedback onPress={close}>
                            <MaterialCommunityIcons name="close-circle" size={25} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ padding: 20 }}>
                        {banks.map((item) => {
                            return (
                                <View style={styles.bankList}>
                                    <TouchableWithoutFeedback onPress={close} >
                                        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.name.toUpperCase()}</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        })}
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 2,
        width: '100%',
        height: 50,
        marginTop: '2%',
    },
    input: {
        flex: 1
    },
    bankList: {
        padding: 8
    }
})

export default Validate