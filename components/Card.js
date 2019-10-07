import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { red, white, black, blue4, green, blue } from "../utils/colors";
import CustomButton from "./CustomButton";

export default function Card(props) {
  const { index, deck, showAnswer, flip, answer } = props;
  const card = deck.questions[index];

  return (
    <View style={styles.center}>
      <View style={styles.studycard}>
        <Text style={styles.cardText}>
          {showAnswer ? card.answer : card.question}
        </Text>
        <TouchableOpacity
          onPress={flip}
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 18,
            fontWeight: "bold"
          }}
        >
          <Text style={styles.flipperText}>
            {" "}
            {showAnswer ? "Show Question" : "Show Answer"}
          </Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        style={styles.correctButton}
        onPress={() => answer("correct")}
      >
        <Text style={styles.buttonText}>Correct</Text>
      </CustomButton>
      <CustomButton
        style={styles.incorrectButton}
        onPress={() => answer("incorrect")}
      >
        <Text style={styles.buttonText}>Incorrect</Text>
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  studycard: {
    width: 300,
    height: 300,
    backgroundColor: white,
    borderRadius: 0,
    borderColor: blue4,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  correctButton: {
    width: 200,
    height: 50,
    backgroundColor: green,
    justifyContent: "center",
    alignItems: "center"
  },
  incorrectButton: {
    width: 200,
    height: 50,
    backgroundColor: red,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: white,
    fontSize: 16,
    textAlign: "center"
  },
  cardText: {
    fontSize: 25,
    color: black,
    marginLeft: 15,
    marginRight: 15
  },
  flipperText: {
    fontSize: 18,
    color: blue4,
    fontWeight: "bold",
    textAlign: "justify",
    alignItems: "flex-end"
  }
});