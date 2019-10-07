import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import { black, gray, white } from "../utils/colors";
import CustomButton from "./CustomButton";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0)
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params;
    return {
      title: deckName
    };
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();
  }

  render() {
    const { opacity } = this.state;
    const { deckId } = this.props;
    const { questions, title } = this.props.deck;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.deck, { opacity }]}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.count}>
            {questions.length} {questions.length === 1 ? `card` : `cards`}
          </Text>
          <CustomButton
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { deckId: deckId })
            }
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </CustomButton>
          <CustomButton
            style={styles.button}
            onPress={() =>
              questions.length === 0
                ? alert("Please add a few cards first")
                : this.props.navigation.navigate("Quiz", { deckId: deckId })
            }
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </CustomButton>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  deck: {
    alignItems: "center",
    flex: 1,
    margin: 10
  },
  deckTitle: {
    fontSize: 25,
    color: black
  },
  count: {
    marginTop: 20,
    fontSize: 20,
    color: gray
  },
  button: {
    height: 40,
    width: 315
  },
  buttonText: {
    fontSize: 16,
    color: white
  }
});