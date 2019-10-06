import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { red, white, black, blue4, green, blue } from '../utils/colors'
import CustomButton from './CustomButton'

export default function Card(props){
    const { index, deck, showAnswer, flip, answer } = props
    const card = deck.questions[index]

    return(
        <View style={styles.center}>
            <View style={styles.studycard}>
                <Text style={styles.cardText}>{showAnswer ? card.answer : card.question}</Text>
                <TouchableOpacity
                onPress={flip}
                style={{marginTop: 20, marginBottom: 50, fontSize: 18, fontWeight:'bold'}}
                >
                <Text> {showAnswer ? 'Show Question' : 'Show Answer'}
                </Text>           
                </TouchableOpacity>
            </View>
            <CustomButton
             style={styles.correctButton}
             onPress={() => answer('correct')}
            >
                <Text style={styles.buttonText}>Correct</Text>
            </CustomButton>
            <CustomButton
             style={styles.incorrectButton}
             onPress={() => answer('incorrect')}
            >
                <Text style={styles.buttonText}>Incorrect</Text>
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    studycard: {
        backgroundColor: blue,
        borderRadius: 0,
        borderColor: blue4,
        borderWidth: 1,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    correctButton: {
        width: 200,
        height: 50,
        backgroundColor: green,
        borderRadius: 0,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incorrectButton: {
        width: 200,
        height: 50,
        backgroundColor: red,
        borderRadius: 0,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: white,
        fontSize: 16
    },
    cardText: {
        fontSize: 25,
        color: black,
        marginLeft: 15,
        marginRight: 15
    },
})