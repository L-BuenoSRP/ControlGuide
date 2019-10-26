import React, { Component } from "react";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  View,
  Thumbnail
} from "native-base";
import styles from "../styles";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  executaGoBack = () => {
    var back = this.props.backGo;
    back();
  };

  executaOpenDrawer = () => {
    var openDrawer = this.props.openDrawer;
    openDrawer();
  };
  
  executaLogOut = () => {
    var logOut = this.props.logOut;
    logOut();
  };
  render() {
    var left = this.props.left;
    var right = this.props.right;
    var middle = this.props.middle;
    var title = this.props.title;
    return (
      <Header
        iosBarStyle="default"
        androidStatusBarColor="#870808"
        style={styles.header}
      >
        <Left style={styles.leftHeader}>
          {left == "back" && (
            <Button
              style={styles.btnHeader}
              onPress={() => this.executaGoBack()}
            >
              <Icon style={styles.iconHeader7} name="arrow-back" />
              {/* <Text style={styles.textVoltar}>Voltar</Text> */}
            </Button>
          )}
          {left == "drawer" && (
            <Button
              style={styles.btnHeader}
              onPress={() => this.executaOpenDrawer()}
            >
              <Icon style={styles.iconHeader6} name="menu" />
              {/* <Text style={styles.textVoltar}>Voltar</Text> */}
            </Button>
          )}
        </Left>
        <Body style={styles.bodyHeader}>
          {middle == "noBg" && <Title style={styles.titHeader}>{title}</Title>}
          {middle == "Bg" && (
            <View
              style={styles.headerBgTitleContainer}
            >
              <Title style={styles.titHeaderBg}>{title}</Title>
            </View>
          )}
          {middle == "BgImage" && (
            <View
              style={styles.headerBgImageContainer}
            >
              <Thumbnail
                square
                resizeMode="contain"
                source={require("../assets/logo-img.png")}
                style={styles.headerBgImageContent}
              />
            </View>
          )}
        </Body>
        <Right style={styles.rightHeader}>
          {right == "logOut" && (
            <Button
              style={styles.btnHeader}
              onPress={() => this.executaLogOut()}
            >
              <Icon style={styles.iconHeader7} name="log-out" />
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}
