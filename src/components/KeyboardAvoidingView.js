import React from "react";
import { 
    KeyboardAvoidingView,
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard } 
from 'react-native'



const KeyboardAvoidView = ({ children, style }) => {
    return (
        <KeyboardAvoidingView style={[{ flex: 1 }, style]} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidView