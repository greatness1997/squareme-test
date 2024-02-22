import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageTwo, imageSqm } from "../../component/images";
import { s } from "react-native-size-matters";


const LandingPageTwo = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={imageTwo}
                style={[styles.image, { width: '100%', height: '100%' }]}
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
                            width: s(150),
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
                            <View style={{ width: s(30), height: s(4), backgroundColor: "white", borderRadius: 2, marginRight: s(5) }}></View>
                            <View style={{ width: s(30), height: s(4), backgroundColor: "grey", borderRadius: 2 }}></View>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.title}>A super secure way to pay</Text>
                            <Text style={styles.title}>your bills</Text>
                            <Text style={styles.subtitle}>Pay your bills with the cheapest rate in town</Text>
                        </View>
                        <View style={styles.buttons}>
                            <Text style={styles.skip}>Skip</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("landingthree")} style={styles.nextButton}>
                                <Text style={styles.nextButtonText}>Next</Text>
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
        resizeMode: 'contain',
        
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: s(10),
        marginTop: s(40)
    },
    skip: {
        color: "white",
        fontWeight: "600",
    },
    nextButton: {
        width: s(90),
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

export default LandingPageTwo;
