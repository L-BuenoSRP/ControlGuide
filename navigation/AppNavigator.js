import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import Login from "../components/Login";
import MainScreen from "../components/MainScreen";
import Settings from "../components/Settings";
import Cadastro from "../components/Cadastro";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import SideBar from "../SideBar/SideBar.js";
import { Dimensions } from "react-native";
import styles from "../styles";
import Screen from "../components/Screen";
import SearchScreen from "../components/SearchScreen";
import MinhaLista from "../components/MinhaLista";
import { Icon, Text } from "native-base";

const MainStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  }
});

const MyListStack = createStackNavigator(
  {
    MinhaLista: {
      screen: MinhaLista,
      navigationOptions: {
        header: null
      }
    },
    Screen: {
      screen: Screen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "MinhaLista",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0F9D58"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppStack = createDrawerNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        header: null,
        drawerIcon: ({ tintColor }) => (
          <Icon style={{ fontSize: 24, color: tintColor }} name="home" />
        ),
        drawerLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 18, color: tintColor }}>Inicio</Text>
        )
      }
    },
    MinhaLista: {
      screen: MyListStack,
      navigationOptions: {
        header: null,
        drawerIcon: ({ tintColor }) => (
          <Icon style={{ fontSize: 24, color: tintColor }} name="list" />
        ),
        drawerLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 18, color: tintColor }}>Minha Lista</Text>
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
        drawerIcon: ({ tintColor }) => (
          <Icon style={{ fontSize: 24, color: tintColor }} name="options" />
        ),
        drawerLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 18, color: tintColor }}>Preferências</Text>
        )
      }
    }
  },
  {
    initialRouteName: "MinhaLista",
    // drawerWidth: Dimensions.get('window').width,
    drawerPosition: "left",
    headerMode: "float",
    backBehavior: "none",
    // drawerType: "slide",
    // overlayColor: '000000',
    contentComponent: props => <SideBar {...props} />,
    contentOptions: {
      activeTintColor: "#870808",
      itemsContainerStyle: {
        marginTop: -7,
        borderColor: "red",
        borderTopWidth: 3
      },
      itemStyle: {
        height: 40
      }
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Cadastro: {
      screen: Cadastro,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Login",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0F9D58"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
