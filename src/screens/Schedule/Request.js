import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import colors from "../../component/Colors"
import { s } from "react-native-size-matters"
import Ionicons from "react-native-vector-icons/Ionicons"
import Material from "react-native-vector-icons/MaterialCommunityIcons"


const Request = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.header}>
                    <View style={style.iconContainer}>
                        <Ionicons name="chevron-back-outline" size={s(20)} color={colors.color3} />
                    </View>
                    <Text style={{ fontWeight: "500", fontSize: s(15), color: colors.color3 }}>Schedule Request</Text>
                    <View style={style.iconContainer}>
                        <Material name="bell" size={s(14)} color={colors.color3} />
                    </View>
                </View>

                <View style={{ marginTop: s(40) }}>
                    <TouchableOpacity onPress={() => navigation.navigate("PickUp")} style={style.serviceContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={style.iconContainer2}>
                                <Material name="truck" size={18} color={colors.color5} />
                            </View>

                            <View>
                                <Text style={{ fontWeight: "600", marginLeft: 20, color: colors.color3 }}>Schedule Pickup</Text>
                                <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Request for waste pickup at a goal</Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward-outline" size={s(20)} color={colors.color3} />
                    </TouchableOpacity>

                    <View style={style.serviceContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={style.iconContainer2}>
                                <Material name="map-marker" size={18} color={colors.color5} />
                            </View>

                            <View>
                                <Text style={{ fontWeight: "600", marginLeft: 20, color: colors.color3 }}>Schedule Drop-off</Text>
                                <Text style={{ fontWeight: "500", marginLeft: 20, marginTop: 5, fontSize: 10 }}>Request for waste drop-off at a goal</Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward-outline" size={s(20)} color={colors.color3} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    iconContainer: {
        width: s(30),
        height: s(30),
        backgroundColor: colors.color4,
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer2: {
        width: s(30),
        height: s(30),
        backgroundColor: colors.color1,
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: s(10)
    },
    serviceContainer: {
        backgroundColor: colors.color5,
        width: "90%",
        height: 70,
        borderRadius: 10,
        padding: 5,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingLeft: 20
    }
})

export default Request