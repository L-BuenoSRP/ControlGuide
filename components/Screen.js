import React, { Component } from "react";
import { Container, Text, Icon, Button, Content } from "native-base";
import styles from "../styles";
import MyHeader from "../Comum/MyHeader";
export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    var back = this.props.navigation.goBack;
    return (
      <Container style={styles.container}>
        <MyHeader backGo={back} title="Uma Testes" middle="noBg" left="back" />
        <Content>
          <Text> Tela de Testes </Text>
        </Content>
      </Container>
    );
  }
}
