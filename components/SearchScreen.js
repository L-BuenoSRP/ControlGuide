import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  List,
  Header,
  Item,
  Icon,
  Input,
  Button
} from "native-base";
import MyHeader from "../Comum/MyHeader";
import styles from "../styles";
import Loader from "./Loader";
import firebaseApp from "../Infra/firebase";
import functionsApi from "../Infra/api-movies";
import CardConteudoHome from "./CardConteudoHome";
import SearchBar from "../Comum/SearchBar";
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    let parametroBusca = this.props.navigation.getParam(
      "parametroBusca",
      "Valor nao encontrado"
    );

    this.state = {
      listaPesquisa: null
    };
    this.getSearch(parametroBusca);
  }

  getSearch = async parametro => {
    this.setState({ listaPesquisa: null });
    await functionsApi.searchContent(parametro, this);
    //firebaseApp.buscaMeusConteudosSearch(this);
  };

  render() {
    var back = this.props.navigation.goBack;
    return (
      <Container style={styles.container}>
        <MyHeader backGo={back} title="Busca" middle="noBg" left="back" />
        <Content style={styles.ContentW100Perc}>
          <SearchBar
            function={this.getSearch}
          />

          {this.state.listaPesquisa != null && (
            <List
              dataArray={this.state.listaPesquisa}
              contentContainerStyle={styles.styleContentContainerListMain}
              style={styles.styleListSearch}
              numColumns={2}
              // horizontal={false}
              renderRow={item => (
                <CardConteudoHome dataItem={item} componentOrigin={this} />
              )}
            ></List>
          )}

          <Loader loading={this.state.listaPesquisa == null} />
        </Content>
      </Container>
    );
  }
}
