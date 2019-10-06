import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue, white } from '../utils/colors';

export default function CustomButton({ children, onPress, style = {} }) {
  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text style={[styles.buttonText, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create ({
  buttoncontainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: blue,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
    color: white,
    textAlign:'center',
  },
})