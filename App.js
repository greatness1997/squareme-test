import "react-native-gesture-handler"
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/navigation/AppNavigator'
import { color } from './src/constants/color';






const app = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'dark-content' })}  />
      </SafeAreaView>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


export default app

