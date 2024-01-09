import {Text, View} from "react-native"
import colors from "../../component/Colors"
import {s} from "react-native-size-matters"


const HomeScreen = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center",  }}>
            <Text style={{ fontWeight: "bold", fontSize: s(16), color: colors.color3}}>Home</Text>
        </View>
    )
}

export default HomeScreen