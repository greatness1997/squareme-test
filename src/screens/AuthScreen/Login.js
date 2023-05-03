import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableWithoutFeedback } from 'react-native'
import { color } from '../../constants/color'
import { Logo, FingerPrint } from '../../constants/images'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from '@react-navigation/native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../../components/AppButton'

const Login = ({ navigation }) => {

    const Schema = Yup.object().shape({
        password: Yup.string().required('Password field is required'),
    });

    // useFocusEffect(
    //     React.useCallback(() => {
    //         StatusBar.setBarStyle('dark-content');
    //         StatusBar.setBackgroundColor(color.primary)
    //     })
    // )

    return (
        <>
        
        <View style={styles.container}>
           
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image source={Logo} />
            </View>

            <View style={{ alignItems: "center", padding: 20 }}>
                <View style={styles.profileImage}></View>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Sanusi T. Segun</Text>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>Not You?</Text>
                        <Text style={{ color: color.colorTwo, fontSize: 15, fontWeight: "500" }}>Switch Account</Text>
                    </View>
                </View>
            </View>
            <View>
                <Formik
                    initialValues={{ password: "" }}
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
                            <View style={styles.loginContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter Password'
                                    onChangeText={handleChange('password')}
                                    value={values}
                                />
                                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                                    <MaterialCommunityIcons name='eye-off-outline' size={30} />
                                </TouchableWithoutFeedback>

                            </View>
                        );
                    }}
                </Formik>
            </View>
            <View style={{ marginTop: 20, alignItems: "flex-end" }}>
                <Text style={{ color: color.colorTwo, fontSize: 15, fontWeight: "500" }}>Forget Password?</Text>
            </View>
            <AppButton title="Sign In" onPress={() => navigation.navigate("Home")} style={styles.btn} />
            <View style={{ marginTop: 50, alignItems: "center" }}>
                <TouchableWithoutFeedback onPress={() => console.log("Finger Print")} >
                    <Image source={FingerPrint} />
                </TouchableWithoutFeedback>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: "white", fontSize: 14, fontWeight: "300" }}>Forget Password?</Text>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#060C27",
        padding: 10

    },
    profileImage: {
        width: 120,
        height: 120,
        borderWidth: 8,
        borderRadius: 100,
        borderColor: color.colorOne,
        backgroundColor: "white",
        marginTop: 20
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        borderColor: "white",
        backgroundColor: color.colorOne,
        width: '100%',
        height: 60,
        marginTop: '2%',
    },
    input: {
        flex: 1,
        height: 20,
        color: "white"
    },
    btn: {
        backgroundColor: "white",
        marginTop: 30
    }
})

export default Login

