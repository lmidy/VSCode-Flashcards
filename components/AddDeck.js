import React from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { addDeck } from "../actions";
import { saveDeck } from "../utils/api";
import { connect } from "react-redux";
import { white, black, gray, blue, blue3 } from "../utils/colors";
import { generateUID } from "../utils/helpers";
import CustomButton from "./CustomButton";

class AddDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfDeck: ""
    };
  }

  submit = () => {
    const { nameOfDeck } = this.state;
    if (nameOfDeck === "") {
      alert("You forgot to enter a Deck Name");
      return;
    }
    const deckId = generateUID();
    const title = nameOfDeck;
    const newDeck = {
      title: nameOfDeck.trim(),
      questions: []
    };
    this.props.dispatch(addDeck(deckId, newDeck));
    this.setState({ nameOfDeck: "" });
    this.toDeck(deckId, title);
    saveDeck(deckId, newDeck);
  };

  toDeck = (id, title) => {
    this.props.navigation.navigate("Deck", { deckId: id, deckName: title });
  };

  render() {
    const { nameOfDeck } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Enter your Deck name</Text>
        <TextInput
          value={nameOfDeck}
          style={styles.TextInputStyle}
          placeholder="Enter Deck name here"
          onChangeText={nameOfDeck => this.setState({ nameOfDeck })}
        />
        <CustomButton onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    margin: 30
  },
  TextInputStyle: {
    textAlign: "center",
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 10
  },
  button: {
    height: 40,
    width: 315
  },
  buttonText: {
    color: white,
    textAlign: "center"
  }
});