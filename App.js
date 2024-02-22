import "react-native-gesture-handler"
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/navigation/AppNavigator'





const app = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'light-content' })} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#060C27"
  }
})


export default app

