import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';



export default function ({ onPress, isSubmitting, title }) {
 

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        primary
        onPress={onPress}
        disabled={isSubmitting}
        title={title}
        >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.text}> {title} </Text>
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#120549',
    width: 330,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    width: 330,
    borderRadius: 50,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 13,
    color: 'white',
  },
});
