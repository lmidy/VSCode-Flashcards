import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { black, white, blue4 } from "../utils/colors";
import { withNavigation } from "react-navigation";
import CustomButton from "./CustomButton";

function Score(props) {
  const { correct, incorrect, restart, deck, deckId, navigation } = props;

  return (
    <View style={styles.center}>
      <Text style={styles.totalScore}>
        You Scored {Math.round((correct / deck.questions.length) * 100)}
      </Text>
      <Text style={styles.score}>Correct: {correct}</Text>
      <Text style={styles.score}>Incorrect: {incorrect}</Text>

      <CustomButton style={styles.button} onPress={restart}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </CustomButton>

      <CustomButton
        style={styles.button}
        onPress={() =>
          navigation.navigate("Deck", { deckId: deckId, deckName: deck.title })
        }
      >
        <Text style={styles.buttonText}>Back to Deck</Text>
      </CustomButton>
    </View>
  );
}

export default withNavigation(Score);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: white,
    fontSize: 16,
    alignItems: "center",
  },
  score: {
    color: black,
    fontSize: 25,
    marginBottom: 5
  },
  totalScore: {
    color: blue4,
    fontSize: 50
  }
});