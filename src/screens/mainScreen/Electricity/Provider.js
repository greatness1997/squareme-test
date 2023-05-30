import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { aa, abdc, bedc, kadc, kdc, eedc, ekedc, phdc, ibedc, ikedc } from "../../../constants/images"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {s} from 'react-native-size-matters'

const Provider = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: "row", marginTop: s(35), marginLeft: s(15) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(95) }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Electricity</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: s(35), marginLeft: s(20) }}>Choose a provider to continue</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: s(8), marginTop: s(10), width: "100%" }}>
                <TouchableOpacity onPress={() => navigation.navigate("ElectricityValidation")}>
                    <ImageBackground
                        source={ekedc}
                        style={{ height: s(100), width: s(100), alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ikedc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={abdc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ibedc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={phdc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={eedc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={kadc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={aa}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity><TouchableOpacity>
                    <ImageBackground
                        source={bedc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={kdc}
                        style={{ height: 100, width: 100, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Provider

