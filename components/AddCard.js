import React from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { addCard } from "../actions";
import { saveCard } from "../utils/api";
import { connect } from "react-redux";
import { white, black, blue } from "../utils/colors";
import CustomButton from "./CustomButton";

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };
  }

  submit = () => {
    const { question, answer } = this.state;
    const { deckId, dispatch } = this.props;
    if (question === "" || answer === "") {
      alert("Please fill in both the input fields");
      return;
    }

    dispatch(addCard(deckId, question, answer));
    this.setState({
      question: "",
      answer: ""
    });
    saveCard(deckId, question, answer);
  
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          value={question}
          style={styles.TextInputStyle}
          placeholder="Enter Question here"
          onChangeText={question => this.setState({ question })}
          autoFocus={true}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          value={answer}
          style={styles.TextInputStyle}
          placeholder="Enter Answer here"
          onChangeText={answer => this.setState({ answer })}
        />
        <CustomButton style={styles.button} onPress={this.submit}>
          <Text style={styles.buttonTex}>Create Card</Text>
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId
  };
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 40
  },
  label: {
    fontSize: 18,
    alignSelf: "flex-start",
    color: black
  },
  question: {
    fontSize: 18,
    alignSelf: "flex-start",
    color: black
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
    width: 300
  },
  buttonText: {
    color: white,
    textAlign: "center"
  }
});
