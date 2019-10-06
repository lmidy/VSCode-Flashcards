import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
 
export default class Test extends Component {
 
 
  constructor()
  {
    super();
  
    this.state={
  
      textInputData : '',
 
      getValue : ''
  
    }
  }
 
  setValueLocally=()=>{
 
    AsyncStorage.setItem('Key_27', this.state.textInputData);
 
    Alert.alert("Value Stored Successfully.")
 
  }
 
  getValueLocally=()=>{
 
    AsyncStorage.getItem('Key_27').then((value) => this.setState({ getValue : value }))
 
  }
  
  render() {
   
    return (
 
      <View style={styles.MainContainer}>
 
 
      <TextInput
             
             placeholder="Enter Some Text here"
         
             onChangeText={ data => this.setState({textInputData : data}) }
 
             underlineColorAndroid='transparent'
         
             style={styles.TextInputStyle}
           />
      
      <TouchableOpacity onPress={this.setValueLocally} activeOpacity={0.7} style={styles.button} >
 
          <Text style={styles.buttonText}> SAVE VALUE LOCALLY </Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity onPress={this.getValueLocally} activeOpacity={0.7} style={styles.button} >
 
         <Text style={styles.buttonText}> GET VALUE LOCALLY SAVED </Text>
 
      </TouchableOpacity>
 
      <Text style={styles.text}> { this.state.getValue } </Text>
 
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
justifyContent: 'center',
alignItems: 'center',
flex:1,
margin: 10
 
},
 
TextInputStyle:{
 
  textAlign: 'center',
  height: 40,
  width: '100%',
  borderWidth: 1, 
  borderColor: '#028b53',
  borderRadius: 10
},
 
button: {
    
  width: '100%',
  height: 40,
  padding: 10,
  backgroundColor: '#4CAF50',
  borderRadius:7,
  marginTop: 10
},
 
buttonText:{
  color:'#fff',
  textAlign:'center',
},
 
text:{
 
  fontSize: 20,
  textAlign: 'center'
}
 
});