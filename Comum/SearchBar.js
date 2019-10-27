import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header, Item, Icon, Input, Button } from "native-base";
import styles from "../styles";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisa: this.props.textSearch ? this.props.textSearch : "",
      focus: false
    };
  }

  executaFunction = conditionText => {
    var func = this.props.function;
    func(conditionText);
  };

  render() {
    return (
      <Header
        searchBar
        iosBarStyle="default"
        androidStatusBarColor="#870808"
        style={styles.HeaderSearchBar}
      >
        <Item style={styles.HearderSearchItem}>
          <Icon name="ios-film" />
          <Input
            onChangeText={pesquisa => this.setState({ pesquisa })}
            onSubmitEditing={() => {
              this.executaFunction(this.state.pesquisa);
            }}
            onFocus={() => {
              this.setState({ focus: true });
            }}
            onBlur={() => {
              this.setState({ focus: false });
            }}
            value={this.state.pesquisa}
            maxLength={15}
            placeholder="Buscar"
            textContentType="familyName"
            keyboardType="web-search"
          />
          {this.state.focus ? (
            <Button
              transparent
              onPress={() => {
                this.setState({ pesquisa: "" });
              }}
            >
              <Icon name="ios-close" />
            </Button>
          ) : (
            <Icon name="ios-desktop" />
          )}
        </Item>
        <Button
          transparent
          style={styles.HeaderSearchButton}
          onPress={() => {
            this.executaFunction(this.state.pesquisa);
          }}
        >
          <Icon name="ios-search" />
        </Button>
      </Header>
    );
  }
}
