import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';



const Service = ({ navigation }) => {

    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", marginTop: s(15), marginLeft: s(15) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left-thick' size={s(22)} color="black" />
                </TouchableWithoutFeedback>

                <View style={{ justifyContent: "center", marginLeft: s(95) }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Service</Text>
                </View>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginTop: s(35), marginLeft: s(20), color: "black" }}>Services selected for you, choosee what you want.</Text>
            <View style={[styles.billsCont,]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ProviderTv")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont}>
                            <MaterialCommunityIcons name="book-open-page-variant" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>Text Books</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Airtime")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont}>
                            <MaterialCommunityIcons name="signal-cellular-3" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>Airtime</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Data")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont}>
                            <MaterialCommunityIcons name="cellphone-wireless" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>Data</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", marginTop: s(12) }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ProviderTv")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont}>
                            <MaterialCommunityIcons name="lightbulb-on" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>Electricity</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Airtime")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont2}>
                            <MaterialCommunityIcons name="television-classic" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>TV</Text>
                        </View>

                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => navigation.navigate("Data")} style={{ alignItems: "center" }}>
                        <View style={styles.productCont}>
                            <MaterialCommunityIcons name="cellphone-wireless" size={s(30)} color="#410018" />
                            <Text style={{ fontSize: s(12), marginTop: s(8), color: "#410018" }}>Data</Text>
                        </View>

                    </TouchableOpacity> */}
                </View>

                

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    billsCont: {
        width: "100%",
        borderRadius: s(10),
        marginTop: s(5),
        padding: s(20)
    },
    productCont: {
        width: s(95),
        height: s(85),
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: s(10)
    },
    productCont2: {
        width: s(95),
        height: s(85),
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: s(10),
        marginLeft: s(15)
    }
})

export default Service