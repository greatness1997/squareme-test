import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageThree, imageSqm } from "../../component/images";
import { s } from "react-native-size-matters";


const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.1)',]}
                locations={[0.3, 1]}
                style={styles.gradient}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={imageSqm}
                        style={{
                            resizeMode: "contain",
                            width: s(300),
                            height: s(300),
                            alignSelf: "center"
                        }}
                    />
                </View>

                <View style={[styles.textContainer]}>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>Create an account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.nextButton2}>
                            <Text style={styles.nextButtonText2}>I have an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00005a"
    },
    imageContainer: {
        bottom: "40%",
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        marginLeft: 20,
    },

    textContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: s(10),
        paddingBottom: s(20),
    },
    textContent: {
        padding: s(10),
    },
    title: {
        color: "white",
        fontWeight: "500",
        fontSize: s(24),
    },
    subtitle: {
        color: "white",
        marginTop: s(10),
    },
    buttons: {

        padding: s(10),
        marginTop: s(40)
    },
    skip: {
        color: "white",
        fontWeight: "600",
    },
    nextButton: {
        width: "100%",
        height: s(45),
        backgroundColor: "white",
        borderRadius: s(10),
        alignItems: "center",
        justifyContent: "center",
    },
    nextButton2: {
        width: "100%",
        height: s(45),
        backgroundColor: "transparent",
        borderRadius: s(10),
        alignItems: "center",
        justifyContent: "center",
        marginTop: s(10),
        borderWidth: s(1),
        borderColor: "white",
    },
    nextButtonText: {
        color: "black",
        fontWeight: "600",
    },
    nextButtonText2: {
        color: "white",
        fontWeight: "600",
    },
});

export default Login;
