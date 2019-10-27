import React, { Component } from "react";
import { Container, Text, Icon, Button, Content, Card, CardItem, View } from "native-base";
import styles from "../styles";
import MyHeader from "../Comum/MyHeader";
import { StatusBar } from "react-native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
export default class MinhaLisa extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var openDrawer = this.props.navigation.openDrawer;
    return (
      <Container style={styles.container}>
        <StatusBar translucent />
        <MyHeader title="Minha Lista" middle="Bg" left="drawer" openDrawer={openDrawer} />
        <Content style={styles.minhaListaContent}>

          <Collapse
            style={styles.collapseContainer}
            isCollapsed={true} >
            <CollapseHeader
              style={styles.collapseHeader}
            >
              <View style={styles.collapseHeaderView}>
                <Icon name="fastforward" style={styles.iconCollapse} />
                <Text style={styles.titleCollapse}>Sequencias</Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <Text>Finja que aqui existem muitas series</Text>
              <Button
                style={{ alignSelf: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Screen");
                }}
              >
                <Text>Botao</Text>
              </Button>
            </CollapseBody>
          </Collapse>

          {/* ------------------------------------- */}


          <Collapse
            style={styles.collapseContainer}
            isCollapsed={true} >
            <CollapseHeader
              style={styles.collapseHeader}
            >
              <View style={styles.collapseHeaderView}>
                <Icon name="done-all" style={styles.iconCollapse} />
                <Text style={styles.titleCollapse}>Concluídos</Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <Text>Finja que aqui existem muitas series</Text>

            </CollapseBody>
          </Collapse>


          {/* ---------------------------------- */}
          <Collapse
            style={styles.collapseContainer}
            isCollapsed={true} >
            <CollapseHeader
              style={styles.collapseHeader}
            >
              <View style={styles.collapseHeaderView}>
                <Icon name="play" style={styles.iconCollapse} />
                <Text style={styles.titleCollapse}>Desejos</Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <Text>Finja que aqui existem muitas series</Text>
        
            </CollapseBody>
          </Collapse>

          <View
            style={styles.bottomViewMinhaLista}
          />

        </Content>
      </Container>
    );
  }
}
