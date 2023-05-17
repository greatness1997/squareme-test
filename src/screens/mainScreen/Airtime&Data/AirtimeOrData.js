import React, { useState } from 'react'
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from '../../../constants/color'
import { Formik } from 'formik'
import AppButton from '../../../components/AppButtonBlue'
import { mtn, airtel, glo } from '../../../constants/images'

const ElectricityValidation = ({ navigation }) => {

    const [selectedOption, setSelectedOption] = useState("Airtime")
    const [phase, setPhase] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }

    const close = () => {
        setModalVisible(false)
    }


    return (
        <>
            <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: 100 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Airtime & Data</Text>
                </View>

            </View>

            <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => { handleOptionPress('Airtime'), setPhase(1) }}>
                    <Text style={selectedOption === "Airtime" ? styles.selectedOption : styles.unselectedOption}>Airtime</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleOptionPress('Data'), setPhase(2) }}>
                    <Text style={selectedOption === "Data" ? styles.selectedOption : styles.unselectedOption}>Data</Text>
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
                                <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleChange('meterNumber')}
                                        value={values}
                                    />
                                    <Image source={mtn} style={{ width: 40, height: 40 }} />
                                    <TouchableWithoutFeedback style={styles.serviceContainer} onPress={() => setModalVisible(true)} >
                                        <MaterialCommunityIcons name='chevron-down' size={30} />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        onChangeText={handleChange('name')}
                                        value={values}
                                    />
                                </View>

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
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={mtn} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>MTN</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={glo} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>GLO</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={airtel} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>AIRTEL</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                    </SafeAreaView>
                                </Modal>
                            </View>
                        );
                    }}
                </Formik>

                <AppButton title="Buy Airtime" style={{ width: "90%", marginLeft: 20 }} />
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
                                <Text style={{ marginLeft: 5 }}>Enter Phone Number</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Meter Number'
                                        onChangeText={handleChange('meterNumber')}
                                        value={values}
                                    />
                                    <Image source={mtn} style={{ width: 40, height: 40 }} />
                                    <TouchableWithoutFeedback style={styles.serviceContainer} onPress={() => setModalVisible(true)} >
                                        <MaterialCommunityIcons name='chevron-down' size={30} />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={{ marginLeft: 5 }}>Enter Amount</Text>
                                <View style={styles.loginContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Name'
                                        onChangeText={handleChange('name')}
                                        value={values}
                                    />
                                    <TouchableWithoutFeedback style={styles.serviceContainer} onPress={() => setModalVisible(true)} >
                                        <MaterialCommunityIcons name='chevron-down' size={30} />
                                    </TouchableWithoutFeedback>
                                </View>

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
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={mtn} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>MTN</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={glo} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>GLO</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.networkContainer}>
                                                <Image source={airtel} style={{ width: 60, height: 60 }} />
                                                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18, }}>AIRTEL</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: 20 }}></View>
                                        </View>
                                    </SafeAreaView>
                                </Modal>
                            </View>
                        );
                    }}
                </Formik>

                <AppButton title="Buy Data Bundle" style={{ width: "90%", marginLeft: 20 }} />
            </View>)}

           
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
    },
    serviceContainer: {
        width: 80,
        height: 100,
        borderRadius: 10,
        alignItems: "center",
    },
    networkContainer: {
        padding: 5,
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 20
    }
})

export default ElectricityValidation

