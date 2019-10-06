import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import CustomButton from './CustomButton';
import { gray, green, white, textGray } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import { generateUID } from '../utils/helpers'
import { StackActions, NavigationActions } from 'react-navigation';

export class AddDeck extends Component {
  constructor(props){
    super(props)
    this.state = {
        text: ''
    }
}

  handleChange = text => {
    this.setState({ text });
  };

  handleSubmit = () => {
    const { nameOfDeck } = this.state
    if(nameOfDeck === ''){
        alert('Give this deck a name senpai!')
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

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'H' }),
        NavigationActions.navigate({
          routeName: 'DeckDetails',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };
  render() {
    const { text }= this.state;
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <CustomButton
          btnStyle={{ backgroundColor: green, borderColor: white }}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray
  },
  block: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20
  }
});

export default connect()(AddDeck);