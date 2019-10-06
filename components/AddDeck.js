import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, gray, blue, blue3 } from '../utils/colors'
import { generateUID } from '../utils/helpers'
import CustomButton from './CustomButton';


class AddDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nameOfDeck: ''
        }
    }

    submit = () => {
        const { nameOfDeck } = this.state
        if(nameOfDeck === ''){
            alert('You forgot to enter a Deck Name')
            return
        }
        const deckId = generateUID()
        const title = nameOfDeck
        const newDeck = {
            title: nameOfDeck.trim(), //remove whitespace
            questions: [] // creating an empty deck
        }
        this.props.dispatch(addDeck(deckId, newDeck))
        this.setState({nameOfDeck: ''})
        this.toDeck(deckId, title) // navigate to newly created deck
        saveDeck(deckId, newDeck) //save deck in asyncstorage
    };

    toDeck = (id, title) => {
        this.props.navigation.navigate('Deck', {deckId: id, deckName: title})
    };

    render(){
        const { nameOfDeck } = this.state

        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title} >Enter your Deck Name</Text>
                <TextInput
                 value={nameOfDeck}
                 style={styles.TextInputStyle}
                 placeholder="Enter Deck Name here"
                 onChangeText={(nameOfDeck) => this.setState({nameOfDeck})}
                />
                <CustomButton
                  onPress={this.submit}
                  styles={{ backgroundColor: blue3, borderColor: white,width: '100%' }}>
                    <Text>Create Deck</Text>
                </CustomButton>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 16
    },
    TextInputStyle:{
      textAlign: 'center',
      height: 40,
      width: '100%',
      borderWidth: 1, 
      borderColor: blue,
      borderRadius: 10
    },
})

export default connect()(AddDeck)