import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { View, Platform, StatusBar } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Icon from "@expo/vector-icons";
import {
  gray,
  white,
  blue,
  blue4,
  blue2,
  black
} from "./utils/colors";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import Test from "./components/Test";
import { setLocalNotification } from './utils/helpers';

function AppStatusBar() {
  return (
    <View style={{ backgroundColor: gray }}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
    </View>
  );
}

const Tabs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Icon.MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <Icon.MaterialCommunityIcons
          name="library-plus"
          size={30}
          color={tintColor}
        />
      )
    }
  },
  Test: {
    screen: Test,
    navigationOptions: {
      tabBarLabel: "Test",
      tabBarIcon: ({ tintColor }) => (
        <Icon.AntDesign name="stepforward" size={30} color={tintColor} />
      )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: white,
    labelStyle: {
      fontSize: 10,
      paddingBottom: 10,
      fontWeight: "bold"
    },
    style: {
      height: 65,
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
  Platform.OS === "ios"
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
          title: "Add Deck"
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
            justifyContent: "center",
            textAlign: "center"
          },
          title: "Add Card"
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
            justifyContent: "center",
            textAlign: "center"
          },
          title: "Deck"
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor: blue2,
          headerStyle: {
            backgroundColor: blue
          },
          title: "Quiz"
        }
      }
    },
    { headerLayoutPreset: "center" }
  )
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <AppStatusBar backgroundColor={gray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
