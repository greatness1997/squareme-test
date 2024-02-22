import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageThree, imageSqm } from "../../component/images";
import { s } from "react-native-size-matters";


const LandingPageThree = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={imageThree}
                style={[styles.image, { width: '110%', height: '150%' }]}
            >

                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 1)',]}
                    locations={[0, 0.3, 1]}
                    style={styles.gradient}
                >
                    <Image
                        source={imageSqm}
                        style={{
                            resizeMode: "contain",
                            width: s(200),
                            margin: s(5),
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0
                        }}
                    />


                    <View style={[styles.textContainer]}>
                        <View style={{ flexDirection: "row", padding: s(10), marginBottom: s(10) }}>
                            <View style={{ width: s(30), height: s(4), backgroundColor: "grey", borderRadius: 2, marginRight: s(5) }}></View>
                            <View style={{ width: s(30), height: s(4), backgroundColor: "grey", borderRadius: 2, marginRight: s(5) }}></View>
                            <View style={{ width: s(30), height: s(4), backgroundColor: "white", borderRadius: 2 }}></View>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.title}>Spend your money easily</Text>
                            <Text style={styles.title}>without any complications</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "90%",
        height: s(45),
        backgroundColor: "white",
        borderRadius: s(10),
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonText: {
        color: "black",
        fontWeight: "600",
    },
});

export default LandingPageThree;
