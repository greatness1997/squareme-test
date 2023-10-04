import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, Switch, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { airtel, mtn, glo } from '../../../constants/images'
import AppButton from '../../../components/AppButtonBlue'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { s } from 'react-native-size-matters'

import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'


const Settings = ({ navigation }) => {

    const [activeBox, setActiveBox] = useState(null)
    const [touchIdSupported, setTouchIdSupported] = useState(false);
    const [isTouchIdEnabled, setIsTouchIdEnabled] = useState(false);
    const [value, setValue] = useState(false)

    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const toggleSwitch = () => {
        if (!isTouchIdEnabled) {
            // Check for Touch ID support before enabling it
            if (touchIdSupported) {
                // Enable Touch ID
                setIsTouchIdEnabled(true);
                saveBiometricSetting(true);
                Alert.alert("Enabled Successfully");
            } else {
                Alert.alert("Touch ID is not supported on this device.");
            }
        } else {
            // Disable Touch ID
            setIsTouchIdEnabled(false);
            saveBiometricSetting(false);
            Alert.alert("Disabled Successfully");
        }
    };


    const handleBoxPress = (boxIndex) => {
        setActiveBox(boxIndex)
    }

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('userData')
        } catch (e) {
            console.log(e)
        }

    }

    const saveBiometricSetting = async (enabled) => {
        try {
            await AsyncStorage.setItem('biometricEnabled', JSON.stringify(enabled));
        } catch (error) {
            console.error('Error saving biometric setting:', error);
        }
    };

    const getBiometricSetting = async () => {
        try {
            const value = await AsyncStorage.getItem('biometricEnabled');
            if (value !== null) {
                setIsTouchIdEnabled(JSON.parse(value));
            }
        } catch (error) {
            console.error('Error retrieving biometric setting:', error);
            return false;
        }
    };

    useEffect(() => {
        // Check for Touch ID support
        TouchID.isSupported()
            .then(biometryType => {
                // Success code
                if (biometryType === true) {
                    setTouchIdSupported(true)
                } else {
                    setIsTouchIdEnabled(false)
                }
            })
            .catch(error => {
                console.log(error);
            });

        // Load the saved Touch ID setting
        getBiometricSetting();
    }, []);


    // const authenticate = () => {
    //     TouchID.authenticate('To login to your account')
    //         .then(success => {
    //             navigation.navigate("home")
    //             console.log("Authentication Successful", success)
    //         })
    //         .catch(error => {
    //             Alert.alert("failed", `${error}`)
    //         });
    // }



    return (
        <SafeAreaView>


            <View style={{ padding: 0, marginTop: 0, width: "100%" }}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: s(20), marginBottom: s(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcon name="arrow-left" size={s(22)} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: s(17), fontWeight: "600", color: "black" }}>Settings</Text>
                    <Text></Text>
                </View>

                {/* <TouchableOpacity style={styles.serviceContainer} onPress={() => handleBoxPress(1)}>
                    <MaterialCommunityIcon name="gift" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Refer & Earn</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Refer your friends and get a bonus</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View> */}

                {/* <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="headset" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20 }}>Help Center</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Have an issue? Speak to our</Text>
                    </View>

                </TouchableOpacity> */}
                {/* <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View> */}
                <TouchableOpacity onPress={() => navigation.navigate("ResetCode2", { data: "from settings" })} style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="lock-reset" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20, color: "black" }}>Change Password</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10, color: "grey" }}>Change your old password</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity style={styles.serviceContainer} onPress={() => navigation.navigate("ResetCode3")}>
                    <MaterialCommunityIcon name="numeric" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20, color: "black" }}>Change Pin</Text>
                        <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10, color: "grey" }}>Change your transaction pin</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <View style={styles.serviceContainer}>
                    <MaterialCommunityIcon name="key-variant" size={30} color="#808080" />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontWeight: "500", marginLeft: 20, color: "black", marginRight: s(20) }}>Enable Finger / Face ID</Text>
                        <Switch
                            trackColor={{ false: 'grey', true: '#1B2D56' }}
                            thumbColor={isTouchIdEnabled ? 'lightgrey' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isTouchIdEnabled}
                        // disabled={!touchIdSupported}
                        />
                    </View>

                </View>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>
                <TouchableOpacity style={styles.serviceContainer} onPress={() => { navigation.navigate("login"), removeValue() }}>
                    <MaterialCommunityIcon name="logout" size={30} color="#808080" />
                    <View>
                        <Text style={{ fontWeight: "500", marginLeft: 20, color: "black" }}>Logout</Text>
                    </View>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "lightgrey", width: "80%", marginLeft: s(30) }}></View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        width: "90%",
        height: 70,
        borderRadius: 10,
        padding: 0,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        backgroundColor: "#f5f5f5"
    }
})

export default Settings

