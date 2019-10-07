import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { black, white, gray, blue4 } from "../utils/colors";
import { connect } from "react-redux";
import Deck from "./Deck";
import { withNavigation } from "react-navigation";

class DeckList extends React.Component {
  render() {
    const { id, title, count, navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.deckitem}
        onPress={() =>
          navigation.navigate("Deck", { deckId: id, deckName: title })
        }
      >
        <Text style={styles.decktitle}>{title}</Text>
        <Text style={styles.count}>
          {count} {count === 1 ? `card` : `cards`}
        </Text>
      </TouchableOpacity>
    );
  }
}
//would be cool to add badges

function mapStateToProps(decks, props) {
  const { id } = props;
  return {
    id,
    title: decks[id].title,
    count: decks[id].questions.length
  };
}

export default withNavigation(connect(mapStateToProps)(DeckList));

const styles = StyleSheet.create({
  decktitle: {
    fontSize: 25,
    color: black
  },
  count: {
    marginTop: 10,
    fontSize: 18,
    color: gray
  },
  deckitem: {
    backgroundColor: white,
    borderRadius: 0,
    borderColor: blue4,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center"
  }
});