import React from "react";
import {
  View,
  Text,
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Icon,
  Thumbnail,
  List,
  ListItem,
  Input,
  Item
} from "native-base";
import Loader from "./Loader";
import styles from "../styles";
import { Alert, Keyboard, StatusBar, Image } from "react-native";
import MyHeader from "../Comum/MyHeader";
import firebaseApp from "../Infra/firebase";
import functionsApi from "../Infra/api-movies";
import CardConteudoHome from "./CardConteudoHome";
import SearchBar from "../Comum/SearchBar";
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.props.navigation.openDrawer();
    this.state = {
      listaTendencias: null,
      pesquisa: ""
    };
    this.getTrending();
    //this.realizaBusca('the batman')
  }

  LogOut = () => {
    firebaseApp.LogOut(this);
  };

  realizaBusca = value => {
    if (value.length > 0) {
      let parametros = {
        parametroBusca: value
      };
      this.props.navigation.navigate("Search", parametros);
    } else {
      Alert.alert("Info", "Digite algo para buscar");
    }
  };

  getTrending = async () => {
    if (this.state.listaTendencias == null) {
      await functionsApi.getTendencias(this);
      firebaseApp.buscaMeusConteudosTendencia(this);
    }
  };

  render() {
    // console.log(this.state.listaTendencias);
    var openDrawer = this.props.navigation.openDrawer;
    return (
      <Container style={styles.container}>
        <StatusBar translucent />
        <MyHeader
          middle="BgImage"
          left="drawer"
          openDrawer={openDrawer}
          right="logOut"
          logOut={this.LogOut}
        />
        <Content style={styles.ContentW100Perc}>
        <SearchBar
            function={this.realizaBusca}
          />

          {/* {console.log(this.state.listaTendencias)} */}

          {this.state.listaTendencias != null && (
            <List
              dataArray={this.state.listaTendencias}
              contentContainerStyle={styles.styleContentContainerListMain}
              style={styles.styleListMain}
              numColumns={2}
              // horizontal={false}
              renderRow={item => (
                <CardConteudoHome dataItem={item} componentOrigin={this} />
              )}
            ></List>
          )}

          <Loader loading={this.state.listaTendencias == null} />
        </Content>
      </Container>
    );
  }
}
