import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from './Colors';



const Button = ({ onPress, title, style }) => {


    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.color1,
        width: "100%",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
    },
    text: {
        fontWeight: 'bold',
        // textTransform: 'uppercase',
        fontSize: 18,
        color: "white",
    },
});


export default Button