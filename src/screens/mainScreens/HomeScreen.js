import React from "react";
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { imageThree, imageSqm } from "../../component/images";
import { s } from "react-native-size-matters";
import Tabs from "../../component/Tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Octicons from "react-native-vector-icons/Octicons"
import { empty } from "../../component/images";


const HomeScreen = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <LinearGradient
                    colors={['rgba(0, 198, 251, 0.4)', '#fff', 'rgba(255, 255, 255, 0.5)']} // Adjusted opacity for the last color
                    locations={[0.0, 0.25, 1]} // Increased location of the last color
                    style={styles.gradient}
                >

                    <View style={{ marginTop: s(20), flexDirection: "row", justifyContent: "space-between", padding: s(15), alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: s(30), height: s(30), backgroundColor: "black", borderRadius: s(50) }}></View>
                            <View style={{ marginLeft: s(5) }}>
                                <Text style={{ color: "grey", fontWeight: "400", fontSize: s(12) }}>Hello,</Text>
                                <Text style={{ color: "#0c0c26", fontWeight: "600", fontSize: s(12), marginTop: s(2) }}>David Oloye</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={{ justifyContent: "center", alignItems: "center", width: s(30), height: s(30), backgroundColor: "white", borderRadius: s(50), marginRight: s(5) }}>
                                <MaterialIcons name="qr-code-scanner" size={s(18)} color="black" />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", width: s(30), height: s(30), backgroundColor: "white", borderRadius: s(50), marginRight: s(5) }}>
                                <Octicons name="bell" size={s(18)} color="black" />
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center", marginTop: s(10) }}>
                        <Text style={{ color: "#000a4a", marginBottom: s(30) }}>Wallet Balance</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: s(30) }}>
                            <Text style={{ color: "#000a4a", fontSize: s(15), marginBottom: s(5), position: 'relative', top: -10, fontWeight: "bold" }}>₦</Text>
                            <Text style={{ color: "#000a4a", fontSize: s(25), position: 'relative', top: -15, fontWeight: "bold" }}>XXXXX</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <View style={[styles.buttonContainer, { backgroundColor: "#000a4a" }]}>
                                <Text style={{ color: "white", fontWeight: "500" }}>Fund</Text>
                            </View>
                            <View style={[styles.buttonContainer, { backgroundColor: "#e1e1e1" }]}>
                                <Text style={{ color: "#747474", fontWeight: "500" }}>Withdraw</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{ marginTop: s(20), marginLeft: s(20), fontWeight: "bold", fontSize: s(14), color: "#656565" }}>Quick Access</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "60%", marginTop: s(10), padding: s(10), marginLeft: s(10) }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ backgroundColor: "#f6effb", width: s(35), height: s(35), justifyContent: "center", alignItems: "center", borderRadius: s(50) }}>
                                    <FontAwesome5 name="clipboard-list" size={s(18)} color="#9f56d4" />
                                </View>
                                <Text style={{ fontWeight: "500", color: "black", marginTop: s(10) }}>Pay Bills</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={{ backgroundColor: "#f6effb", width: s(35), height: s(35), justifyContent: "center", alignItems: "center", borderRadius: s(50) }}>
                                    <MaterialIcons name="wallet-giftcard" size={s(18)} color="#9f56d4" />
                                </View>
                                <Text style={{ fontWeight: "500", color: "black", marginTop: s(10) }}>Giftcards</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View style={{ backgroundColor: "#f6effb", width: s(35), height: s(35), justifyContent: "center", alignItems: "center", borderRadius: s(50) }}>
                                    <MaterialIcons name="credit-card" size={s(18)} color="#9f56d4" />
                                </View>
                                <Text style={{ fontWeight: "500", color: "black", marginTop: s(10) }}>Cards</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{ marginTop: s(10), marginLeft: s(20), color: "#656565", fontWeight: "600", fontSize: s(14) }}> Recent Transactions</Text>
                        <View style={{ marginTop: s(10), alignItems: "center" }}>
                            <View style={{ alignItems: "center" }}>
                                <Image source={empty} style={{ width: s(80), height: s(80) }} />
                                <Text style={{ fontWeight: "bold", fontSize: s(14), color: "#4F4F4F" }}>No Recent transaction</Text>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ marginTop: s(10), fontWeight: "500", fontSize: s(13), color: "#9a9a9a", textAlign: "center", lineHeight: s(18) }}>
                                        You have not performed any transaction, you can start sending and requesting money from your contacts.
                                    </Text>

                                </View>
                            </View>
                        </View>
                    </View>

                </LinearGradient>

                <Tabs navigation={navigation} keyPad={false}  />
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    gradient: {
        flex: 1,
    },

    buttonContainer: {
        width: s(120),
        height: s(42),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        marginHorizontal: s(10),
    },



});

export default HomeScreen;
