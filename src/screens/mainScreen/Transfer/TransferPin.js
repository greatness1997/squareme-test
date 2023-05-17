import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import KeyboardAvoidingViewNB from '../../../components/KeyboardAvoidingView'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InputFieldOTP from "./InputOTP"



const Verify = ({ navigation, route }) => {

    const data = route.params

    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const maxLength = 4


    return (
        <View style={styles.container}>
            {/* <Pressable onPress={Keyboard.dismiss}> */}
            <TouchableOpacity style={styles.iconCont} onPress={() => navigation.navigate('Home')}>
                        <MaterialCommunityIcons name="close-circle" size={30} />
                    </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 20 }}>
                    
                    <View style={styles.textCont}>
                        <Text style={styles.text2}>Enter To Complete</Text>
                        <Text style={styles.text1}>Transfer</Text>
                    </View>
                </View>
                <View>

                    <InputFieldOTP
                        code={code}
                        setCode={setCode}
                        setPinReady={setPinReady}
                        maxLength={maxLength}
                        navigation={navigation}
                        data={data}
                    />



                </View>
            {/* </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    textCont: {
        marginBottom: 40,
        alignItems: "center"
    },
    text2: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: "bold"
    },
    text1: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: "bold"
    },
    iconCont: {
        marginLeft: 10,
        marginTop: 10
    }, 
    container: {
        backgroundColor: "white",
        width: "90%",
        height: 300,
        marginLeft: 20,
        borderRadius: 20,
        marginTop: 150
    },
    // duration: {
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // durationT1: {
    //     fontSize: 15
    // },
    // durationT2: {
    //     fontSize: 17,
    //     fontWeight: 'bold',
    //     marginTop: 10,
    //     fontStyle: 'italic'
    // }
});

export default Verify