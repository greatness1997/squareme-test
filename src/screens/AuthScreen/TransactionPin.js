import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import PinField from '../../components/TranPinField';
import { Lock } from '../../constants/images.js';
import { s } from 'react-native-size-matters';
import AppButton from '../../components/AppButtonWhite';


const TransactionPin = ({ navigation, data }) => {
    const [code, setCode] = useState('');
    const [code2, setCode2] = useState('');
    const [pinReady, setPinReady] = useState(false);
    const maxLength = 4;

    return (

        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={Lock} style={styles.lockImage} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>Create Transaction Pin</Text>
                <Text style={styles.subtitle}>Please set a 4-digit pin you can remember</Text>
            </View>

            <View style={styles.pinFieldContainer}>
                <Text style={styles.pinText}>Create Pin</Text>
                <PinField
                    pin={code}
                    setPin={setCode}
                    pinConfirmation={code2}
                    setPinConfirmation={setCode2}
                    setPinReady={setPinReady}
                    maxLength={maxLength}
                    navigation={navigation}
                    data={data}
                    secureTextEntry={true}
                />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060C27',
    },
    imageContainer: {
        marginTop: s(40),
        alignItems: 'center',
    },
    lockImage: {
        width: s(60),
        height: s(60),
    },
    textContainer: {
        alignItems: 'center',
        marginTop: s(20),
    },
    title: {
        color: 'white',
        fontWeight: '600',
        fontSize: s(16),
        marginBottom: s(10),
    },
    subtitle: {
        color: '#6e6e6e',
        fontSize: s(12),
        fontWeight: '500',
    },
    pinFieldContainer: {
        marginTop: s(20),
        width: '100%',
    },
    pinText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: s(20),
    },
   
});

export default TransactionPin;
