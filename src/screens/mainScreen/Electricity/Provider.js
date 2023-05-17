import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { aa, abdc, bedc, kadc, kdc, eedc, ekedc, phdc, ibedc, ikedc } from "../../../constants/images"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Provider = ({ navigation }) => {
    return (
        <>
            <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={25} />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: 100 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Electricity</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: 40, marginLeft: 20 }}>Choose a provider to continue</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: 10, marginTop: 20, width: "100%" }}>
                <TouchableOpacity onPress={() => navigation.navigate("ElectricityValidation")}>
                    <ImageBackground
                        source={ekedc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ikedc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={abdc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={ibedc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={phdc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={eedc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={kadc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={aa}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity><TouchableOpacity>
                    <ImageBackground
                        source={bedc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
                    >

                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground
                        source={kdc}
                        style={{ height: 120, width: 120, alignItems: "center", justifyContent: "center" }}
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

