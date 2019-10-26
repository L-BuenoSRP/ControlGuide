import React, { Component } from "react";
import { Container, Text, Icon, Button, Content } from "native-base";
import styles from "../styles";
import MyHeader from "../Comum/MyHeader";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var openDrawer = this.props.navigation.openDrawer;
    return (
      <Container style={styles.container}>
        <MyHeader title="Preferências" middle="Bg" left="drawer" openDrawer={openDrawer} />
        <Content>
          <Text> Tela de Preferências </Text>

        </Content>
      </Container>
    );
  }
}
