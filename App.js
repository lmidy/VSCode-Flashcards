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
import { red, gray, purple, white, blue, lightgreen } from './utils/colors';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Decks from './components/Decks';
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
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name='stepforward' size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name="addfolder" size={30} color={ tintColor } />
      )
    }
  },
  Test: {
    screen: Test,
    navigationOptions: {
      tabBarLabel: 'Test',
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
    style: {
      height: 60,
      backgroundColor: gray,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
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
      DeckDetails: { 
        screen: DeckDetails,
        navigationOptions: {
          headerTintColor: red,
          headerStyle: {
            backgroundColor: blue
          },
          title: 'Deck Details'
        }
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: {
          headerTintColor: lightgreen,
          headerStyle: {
            backgroundColor: lightgreen
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'Add Card'
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor: lightgreen,
          headerStyle: {
            backgroundColor: lightgreen
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
        <View style={{ flex: 1 , backgroundColor: '#dde'}}>
          <AppStatusBar backgroundColor={gray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
