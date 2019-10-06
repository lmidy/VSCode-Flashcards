import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'Udacity:FlashCards';

export const starterData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'Is React a Javascript UI library?',
        answer: 'Correct'
      },
      {
        question: 'Correct place to make Ajax requests is in a render method?',
        answer: 'Incorrect'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question:
          'Closure is a combination of a function and lexical environment within which that function was declared?',
        answer: 'Yes'
      },
      {
        question:
          'JavaScript is considered a weakly typed (or untyped) language?',
        answer: 'Correct'
      }
    ]
  }
};

function setData() {
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
    return decks
}

// setData = async () => {
//   try {
//     await AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
//   } catch (error) {
//     // Error saving data
//   }
// };
export function formatDecksResults(results) {
    return results === null ? setData() : JSON.parse(results)
}