import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, ScrollView, Modal, Text, Alert, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from '../../../constants/color'
import { Formik } from 'formik'
import * as Yup from "yup"
import AppButton from '../../../components/AppButtonBlue'
import { mtn, airtel, glo, nineMobile } from '../../../constants/images'
import cred from '../../../config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
// import { useSelector } from 'react-redux'
import KeyboardAvoidingViewNB from '../../../components/KeyboardAvoidingView'

const AirtimeData = ({ navigation, route }) => {


    const network = [
        { name: "Mtn", image: mtn },
        { name: "Glo", image: glo },
        { name: "Airtel", image: airtel },
        { name: "9mobile", image: nineMobile },
    ]

    const [selectedOption, setSelectedOption] = useState("Airtime")
    const [phase, setPhase] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [networkValue, setNetworkValue] = useState({ name: "", image: null });
    const [dataPlan, setDataPlan] = useState([])
    const [plan, setPlan] = useState(null)
    const [loading, setIsLoading] = useState(false)
    const [itemCode, setItemCode] = useState("")
    const [tranId, setTranId] = useState("")
    const [amnt, setAmnt] = useState("")

    const handleOptionPress = (option) => {
        setSelectedOption(option)
    }

    const close = () => {
        setModalVisible(false)
    }

    const setValue = (name, image) => {
        setNetworkValue({ name, image });
    };
    const thePlan = (allowance, amount, validity, code) => {
        setItemCode(code)
        setAmnt(amount)
        setPlan({ allowance, amount, validity })
        setDataPlan([])
    }

    useEffect(() => {
        if (phase === 2) {
            setValue('', null);
        } else if (phase === 1) {
            setValue('', null)
        }
    }, [phase]);

    const Schema = Yup.object().shape({
        amount: Yup.string().required('Enter amount'),
        phoneNumber: Yup.string().required('Enter phone number')
    });

    const Schema1 = Yup.object().shape({
        phoneNumber: Yup.string().required('Enter phone number')
    });


    const { auth: { user } } = useSelector(state => state)



    return (
        <>
            <View style={{ flexDirection: "row", marginTop: s(70), marginLeft: s(18) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} color="black" />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(90) }}>
                    <Text style={{ fontSize: s(16), fontWeight: "bold", color: "black" }}>Buy Airtime</Text>
                </View>

            </View>

            <ScrollView>
                <View style={{ alignItems: "center", marginTop: s(35) }}>
                    <Formik
                        initialValues={{ phoneNumber: "", amount: "" }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            Schema.validate(values)
                                .then((res) => {
                                    navigation.navigate("AirtimeSummary", { data: res, networkName: networkValue.name ? networkValue.name : "mtn", networkImage: networkValue.image ? networkValue.image : mtn })
                                })
                                .catch((err) => Alert.alert('Please provide proper details',));
                        }}>
                        {(props) => {
                            const { handleChange, values, handleSubmit } = props;

                            return (
                                <>
                                    <View>
                                        <Text style={{ marginLeft: 5, color: "grey" }}>Enter Phone Number</Text>
                                        <View style={styles.loginContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Phone Number'
                                                placeholderTextColor="grey"
                                                onChangeText={handleChange('phoneNumber')}
                                                keyboardType='numeric'
                                                maxLength={11}
                                                value={values}
                                            />
                                            <Image source={networkValue.image ? networkValue.image : mtn} style={{ width: s(35), height: s(35) }} />
                                            <TouchableWithoutFeedback style={styles.serviceContainer} onPress={() => setModalVisible(true)} >
                                                <MaterialCommunityIcons name='chevron-down' size={30} color="grey" />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <Text style={{ marginLeft: 5, color: "grey" }}>Enter Amount</Text>
                                        <View style={styles.loginContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Amount'
                                                placeholderTextColor="grey"
                                                onChangeText={handleChange('amount')}
                                                keyboardType='numeric'
                                                value={values}
                                            />
                                        </View>

                                        <Modal
                                            visible={modalVisible}
                                            animationType='slide'
                                            transparent={true}
                                        >


                                            <View style={styles.modalScreen}>
                                                <View style={styles.transparentContainer}></View>
                                                <View style={styles.contentContainer}>

                                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', padding: s(5) }}>
                                                        <TouchableWithoutFeedback onPress={close}>
                                                            <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                                                        </TouchableWithoutFeedback>
                                                    </View>

                                                    {network.map((item, key) => {
                                                        return (
                                                            <View>
                                                                <TouchableOpacity style={styles.networkContainer} onPress={() => { close(); setValue(item.name, item.image); }}>
                                                                    <Image source={item.image} style={{ width: s(35), height: s(35) }} />
                                                                    <Text style={{ marginLeft: s(25), color: "black", fontWeight: "bold", fontSize: s(14), }}>{`${item.name}  Airtime`}</Text>
                                                                </TouchableOpacity>
                                                                <View style={{ width: "90%", height: s(1), backgroundColor: "lightgrey", marginLeft: s(18) }}></View>
                                                            </View>
                                                        )
                                                    })}

                                                </View>
                                            </View>
                                        </Modal>



                                    </View>
                                    <AppButton title="Buy Airtime" style={{ width: "90%", marginLeft: s(8) }} onPress={handleSubmit} />
                                </>
                            );

                        }}

                    </Formik>


                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType='slide'
                transparent={true}
            >


                <View style={styles.modalScreen}>
                    <View style={styles.transparentContainer}></View>
                    <View style={styles.contentContainer}>

                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', padding: s(5) }}>
                            <TouchableWithoutFeedback onPress={close}>
                                <MaterialCommunityIcons name="close-circle" size={s(22)} color="black" />
                            </TouchableWithoutFeedback>
                        </View>

                        {network.map((item, key) => {
                            return (
                                <View>
                                    <TouchableOpacity style={styles.networkContainer} onPress={() => { close(), setValue(item.name, item.image), dataValidate(item.name.toLowerCase()), setPlan(null) }}>
                                        <Image source={item.image} style={{ width: s(35), height: s(35) }} />
                                        <Text style={{ marginLeft: s(25), color: "black", fontWeight: "bold", fontSize: s(14), }}>{`${item.name}  Data`}</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: "90%", height: 2, backgroundColor: "lightgrey", marginLeft: s(18) }}></View>
                                </View>
                            )
                        })}

                    </View>
                </View>

            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: s(8),
        padding: s(8),
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: s(45),
        marginTop: '2%',
        marginBottom: s(22)
    },
    dataPlanCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: s(8),
        padding: s(8),
        borderColor: "white",
        backgroundColor: "white",
        width: '90%',
        height: s(45),
        marginTop: '2%',
        marginBottom: s(22)
    },
    input: {
        flex: 1,
        height: s(35),
        color: "black"
    },

    selectedOption: {
        borderWidth: 2,
        borderColor: color.primary2,
        paddingLeft: s(22),
        paddingRight: s(22),
        paddingTop: s(8),
        paddingBottom: s(8),
        color: "black",
        fontWeight: "600"
    },
    unselectedOption: {
        borderBottomWidth: 0,
        color: "black",
        fontWeight: "600"
    },
    serviceContainer: {
        width: s(75),
        height: (95),
        borderRadius: (8),
        alignItems: "center",
    },
    networkContainer: {
        padding: 5,
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: s(8),
        marginTop: s(16)
    },
    modalScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(10),
        paddingVertical: s(10),
    },
})

export default AirtimeData

