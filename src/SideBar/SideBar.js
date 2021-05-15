import React from "react";
import { Image, AsyncStorage } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Thumbnail,
  View
} from "native-base";
import styles from "../styles";
import { DrawerItems, NavigationActions } from "react-navigation";

const routes = [
  "Main",
  "Settings",
  "Main",
  "Settings",
  "Main",
  "Settings",
  "Main",
  "Settings",
  "Main",
  "Settings",
  "Main",
  "Settings"
];
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarioLogado: ""
    }
    this._getUserAsync();
  }

  _getUserAsync = async () => {
    if (this.state.usuarioLogado == "") {
      const value = await AsyncStorage.getItem("usuarioLogado");
      console.log(value);
      this.setState({ usuarioLogado: value })
    }
  };

  navigateToStack = (stackName, routeName, params) => {
    const navigateAction = NavigationActions.navigate({
      routeName: stackName,
      action: NavigationActions.navigate({
        routeName: routeName,
        params: params,
      })
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <Container style={styles.containerSidebar}>
        <Image
          source={require("../assets/bg-sidebar.png")}
          style={styles.sidebarImageBg}
        />
        <Thumbnail
          square
          resizeMode="contain"
          source={require("../assets/logo-img.png")}
          style={styles.sidebarImage}
        />
        <View style={styles.sidebarUserContainer}>
          <Text>{this.state.usuarioLogado}</Text>
        </View>
        <Content>
          {/* <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 10 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          /> */}
          <DrawerItems {...this.props} onItemPress={
            (route, focused) => {
              this.props.onItemPress({ route, focused })
              var routeStack = route.route.key;
              var routeScreen = route.route.routes != undefined ? route.route.routes[0].routeName : "";
              this.navigateToStack(routeStack, routeScreen);
            }
          } />
        </Content>
      </Container>
    );
  }
}
