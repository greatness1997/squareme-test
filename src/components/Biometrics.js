import React, { useState, useEffect } from 'react';
import LocalAuthentication from 'react-native-local-authentication';
import { Image, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const BiometricImage = () => {
    const [biometricImage, setBiometricImage] = useState(null);

    useEffect(() => {
        const checkBiometricSupport = async () => {
            const supportedTypes = await LocalAuthentication.supportedTypes();
            if (supportedTypes.includes(LocalAuthentication.FaceID)) {
                setBiometricImage(<MaterialCommunityIcons name="face-recognition" color="white" size={100} />);
            } else if (supportedTypes.includes(LocalAuthentication.TouchID)) {
                setBiometricImage(<Image source={require('../assets/fingerPrint.png')} style={{ width: 100, height: 100 }} />);
            } else {
                setBiometricImage(null);
            }
        };

        checkBiometricSupport();
    }, []);

    return (
        <View>
            {biometricImage}
        </View>
    );
};

export default BiometricImage