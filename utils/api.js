import { AsyncStorage } from 'react-native'
import { formatDecksResults, FLASHCARD_STORAGE_KEY, starterData } from './_decks'

export async function getDecks () {
    try {
        const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        if(storeResults == null){
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(starterData))
        }
        return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(formatDecksResults)

    }
    catch (err) {
        console.log(err);
    }
    
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