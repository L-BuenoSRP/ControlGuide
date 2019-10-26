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
  Card,
  CardItem
} from "native-base";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "../styles";
import functionsApi from "../Infra/api-movies";
import firebaseApp from "../Infra/firebase";
export default class CardConteudoHome extends React.Component {
  constructor(props) {
    super(props);
  }

  addConteudoFilme = async (id, status) => {
    functionsApi
      .buscaFilme(id)
      .then(res => {
        firebaseApp.addToConteudos(res, status);
      })
      .catch(err => console.log("Axios err: ", err));

    //busca mais dados da serie e add ao banco
  };

  addConteudoSerie = async (id, status) => {
    functionsApi
      .buscaSerie(id)
      .then(res => {
        firebaseApp.addToConteudos(res, status);
      })
      .catch(err => console.log("Axios err: ", err));

    //busca mais dados da serie e add ao banco
  };

  formatDate = dateString => {
    if (dateString && dateString.length > 0) {
      var date = new Date(dateString);
      var month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var year = date.getFullYear();
      return month + "/" + year;
    } else {
      return "Indisponivel";
    }
  };
  getStarAverage = average => {
    var color = "";
    if (average > 7) {
      color = "#e8e006";
    } else if (average > 4.5) {
      color = "#d87709";
    } else {
      color = "red";
    }
    return <Icon name="star" style={{ color: color, fontSize: 15 }} />;
  };

  formatTitle = value => {
    if (value.length >= 23) {
      return (
        value.substr(0, 20) +
        "..." +
        value.substr(value.length - 2, value.length - 1)
      );
    } else {
      return value;
    }
  };

  setImageSource = imgUrl => {
    if (imgUrl && imgUrl.length > 0) {
      return {
        uri: functionsApi.getImagem(imgUrl, 0)
      };
    } else {
      return require("../assets/not-found.png");
    }
  };
  render() {
    var tipoConteudo = "";
    if (
      this.props.dataItem.name != undefined &&
      this.props.dataItem.title == undefined &&
      !this.props.dataItem.known_for_department
    ) {
      tipoConteudo = "serie";
    } else if (
      this.props.dataItem.name == undefined &&
      this.props.dataItem.title != undefined &&
      !this.props.dataItem.known_for_department
    ) {
      tipoConteudo = "filme";
    } else if (
      (this.props.dataItem.name != undefined ||
        this.props.dataItem.title != undefined) &&
      this.props.dataItem.known_for_department
    ) {
      tipoConteudo = "pessoa";
    }
    return (
      <ListItem style={styles.listItemCard}>
        {tipoConteudo == "serie" ? (
          <TouchableOpacity
            style={styles.contentTouch}
            onPress={() => {
              console.log("teste");
            }}
          >
            <Card style={styles.contentCard}>
              <CardItem style={styles.contentCardItemTop}>
                <Body style={styles.contentItemTopBody}>
                  <Text style={styles.contentTitle}>
                    {this.formatTitle(this.props.dataItem.name)}
                  </Text>
                  <View style={styles.contentAverageContainer}>
                    {this.getStarAverage(this.props.dataItem.vote_average)}
                    <Text style={styles.contentAverageText} note>
                      {this.props.dataItem.vote_average}
                    </Text>
                  </View>
                </Body>
              </CardItem>
              <CardItem cardBody style={styles.contentCardItemMiddle}>
                <Thumbnail
                  square
                  style={styles.contentImage}
                  resizeMode="contain"
                  source={this.setImageSource(this.props.dataItem.poster_path)}
                />
              </CardItem>
              <CardItem style={styles.contentCardItemBottom}>
                <Text style={styles.contentLancamento}>
                  Lançamento:{" "}
                  {this.formatDate(
                    this.props.dataItem.first_air_date == undefined
                      ? console.log(this.props.dataItem)
                      : this.props.dataItem.first_air_date
                  )}
                </Text>

                <Menu>
                  <MenuTrigger>
                    <View style={styles.contentLancamentoButton}>
                      <Icon
                        name="more"
                        style={styles.contentLancamentoButtonIcon}
                      />
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={styles.MenuOptionsContainer}
                  >
                    {this.props.dataItem.curr_time == 0 && (
                      <MenuOption
                        style={styles.MenuOptionBorderBottom}
                        // onSelect={() => {
                        //   this.addConteudoSerie(
                        //     this.props.dataItem.id,
                        //     "visto"
                        //   );
                        // }}
                      >
                        <Text style={{}}>Nenhuma Opção Disponivel</Text>
                      </MenuOption>
                    )}
                    {this.props.dataItem.curr_time != 0 && (
                      <MenuOption
                        style={styles.MenuOptionBorderBottom}
                        onSelect={() => {
                          this.addConteudoSerie(
                            this.props.dataItem.id,
                            "visto"
                          );
                        }}
                      >
                        <Text style={{}}>Já Visto</Text>
                      </MenuOption>
                    )}
                    {!this.props.dataItem.curr_time && (
                      <MenuOption
                        onSelect={() => {
                          this.addConteudoSerie(
                            this.props.dataItem.id,
                            "desejos"
                          );
                        }}
                      >
                        <Text style={{}}>Adicionar à Desejos</Text>
                      </MenuOption>
                    )}
                  </MenuOptions>
                </Menu>
              </CardItem>
            </Card>
          </TouchableOpacity>
        ) : tipoConteudo == "filme" ? (
          <TouchableOpacity
            style={styles.contentTouch}
            onPress={() => {
              console.log("teste");
            }}
          >
            <Card style={styles.contentCard}>
              <CardItem style={styles.contentCardItemTop}>
                <Body style={styles.contentItemTopBody}>
                  <Text style={styles.contentTitle}>
                    {this.formatTitle(this.props.dataItem.title)}
                  </Text>
                  <View style={styles.contentAverageContainer}>
                    {this.getStarAverage(this.props.dataItem.vote_average)}
                    <Text style={styles.contentAverageText} note>
                      {this.props.dataItem.vote_average}
                    </Text>
                  </View>
                </Body>
              </CardItem>
              <CardItem cardBody style={styles.contentCardItemMiddle}>
                <Thumbnail
                  square
                  style={styles.contentImage}
                  resizeMode="contain"
                  source={this.setImageSource(this.props.dataItem.poster_path)}
                />
              </CardItem>
              <CardItem style={styles.contentCardItemBottom}>
                <Text style={styles.contentLancamento}>
                  Lançamento:{" "}
                  {this.formatDate(this.props.dataItem.release_date)}
                </Text>
                <Menu>
                  <MenuTrigger>
                    <View style={styles.contentLancamentoButton}>
                      <Icon
                        name="more"
                        style={styles.contentLancamentoButtonIcon}
                      />
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={styles.MenuOptionsContainer}
                  >
                    <MenuOption
                      style={styles.MenuOptionBorderBottom}
                      onSelect={() => {
                        this.addConteudoFilme(this.props.dataItem.id, "visto");
                      }}
                    >
                      <Text style={{}}>Já Visto</Text>
                    </MenuOption>
                    {!this.props.dataItem.curr_time && (
                      <MenuOption
                        onSelect={() => {
                          this.addConteudoFilme(
                            this.props.dataItem.id,
                            "desejos"
                          );
                        }}
                      >
                        <Text style={{}}>Adicionar à Desejos</Text>
                      </MenuOption>
                    )}
                  </MenuOptions>
                </Menu>
              </CardItem>
            </Card>
          </TouchableOpacity>
        ) : (
          <Text>{this.props.dataItem.name}</Text>
        )}
      </ListItem>
    );
  }
}
