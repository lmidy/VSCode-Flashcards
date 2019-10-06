import { AsyncStorage } from 'react-native'
import { formatDecksResults, FLASHCARD_STORAGE_KEY } from './_decks'

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(formatDecksResults)
}

export function saveDeck(key, deck) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function saveCard(key, question, answer) {
    AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then((result) => {
        let decks = JSON.parse(result)
        decks[key].questions.push({question: question, answer: answer})
        AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
    })
}