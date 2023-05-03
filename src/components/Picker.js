import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Picker } from '@react-native-picker/picker'




export default function PickerInput({ onValueChange, value, placeholder, itemLabel, itemValue, children, }) {
  return (
    <View style={styles.container}>

      <View style={styles.textHolder}>
        <Picker
          mode="dropdown"
          // iosIcon={<Ionicons name="ios-arrow-down"/>}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={value}
          onValueChange={onValueChange}>
          <Picker.Item label={placeholder} value="" />
          {children.map((data) => (
            <Picker.Item key={`${data[itemValue]}`} value={`${data[itemValue]}`} label={`${data[itemLabel]}`} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 13,
  },
  textHolder: {
    borderRadius: 3,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    // marginRight: 0,
  },
});
