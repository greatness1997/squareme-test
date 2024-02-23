import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import  Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { s } from "react-native-size-matters";

const Tabs = ({ navigation, keyPad, style, tabColor }) => {

    return (
        <View style={[styles.tabsContainer, style]}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.tabItem}>
                <Ionicons name="home" size={s(18)} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Keyboard")} style={styles.tabItem}>
                <AntDesign name="appstore1" size={s(18)} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="person" size={s(18)} color="grey" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: s(10),
    },
    tabItem: {
        alignItems: "center",
    },
    tabLabel: {
        fontSize: 12,
        marginTop: s(3),
    },
})


export default Tabs