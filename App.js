import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { View, Platform, StatusBar } from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcon } from '@expo/vector-icons';
import * as Icon from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gray,  white, blue, lightgreen, blue4, blue2, bluegray, black } from './utils/colors';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Decks from './components/Decks';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import DeckDetails from './components/DeckDetails';
import Test from './components/Test';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor: gray }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name='stepforward' size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'ADD DECK',
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name="addfolder" size={30} color={ tintColor } />
      )
    }
  },
  Test: {
    screen: Test,
    navigationOptions: {
      tabBarLabel: 'TEST',
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name='stepforward' size={30} color={tintColor} />
      )
    }
  },
};

const navigationOptions = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: white,
    labelStyle: {
      fontSize: 16,
      paddingBottom: 10,
      fontWeight: 'bold',
  },
    style: {
      height: 60,
      backgroundColor: blue4,
      shadowColor: black,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(Tabs, navigationOptions)
    : createMaterialTopTabNavigator(Tabs, navigationOptions)
);

const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: TabNav
      },
      AddDeck: { 
        screen: AddDeck,
        navigationOptions: {
          headerTintColor: blue2,
          headerStyle: {
            backgroundColor: blue
          },
          title: 'ADD DECK'
        }
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: {
          headerTintColor: blue2,
          headerStyle: {
            backgroundColor: blue
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'ADD CARD'
        }
      },
      Deck: {
        screen: Deck,
        navigationOptions: {
          headerTintColor: blue2,
          headerStyle: {
            backgroundColor: blue
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'DECK'
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor: blue2,
          headerStyle: {
            backgroundColor: blue
          },
           title: 'Quiz'
          }
        }
      },
      { headerLayoutPreset: 'center' }
    )
  );

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 , backgroundColor: '#FFFFFF'}}>
          <AppStatusBar backgroundColor={gray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
