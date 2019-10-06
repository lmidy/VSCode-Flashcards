import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue } from '../utils/colors';

export default function CustomButton({ children, onPress, style = {} }) {
  return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text style={[styles.buttonText, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
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
    color:'#fff',
    textAlign:'center',
  },
})