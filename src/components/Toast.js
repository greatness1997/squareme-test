import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"


const ToastNotification = ({ style, message }) => {
    console.log(message)
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
                top: 35,
                backgroundColor: '#D90000',
                width: '95%',
                position: 'relative',
                borderRadius: 5,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                shadowColor: '#003049',
                shadowOpacity: 0.4,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
                marginLeft: "2%",
                marginBottom: "10%"
            }}
        >
            <Icon name="info" size={30} color="#F6F4F4" />
            <View style={{ flexDirection: "row", flex: 1, marginLeft: 10 }}>
                <Text
                    numberOfLines={3}
                    style={{
                        color: '#F6F4F4',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: 5,
                        flex: 1 
                    }}
                >
                    {message}
                </Text>
            </View>

        </Animated.View>
    )
}

export default ToastNotification;