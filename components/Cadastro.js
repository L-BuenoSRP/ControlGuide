import React from "react";
import {
  Container,
  Text,
  Button,
  Content,
  View,
  Picker,
  Form,
  Input,
  Item,
  Label,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title
} from "native-base";
import Loader from "./Loader";
import { Alert, Keyboard, ImageBackground } from "react-native";
import User from "../models/User";
import styles from "../styles";
import functions from "../functions";
import MyHeader from "../Comum/MyHeader";
import firebaseApp from "../Infra/firebase";
// import { signInState } from "../redux/initReducerFunctions";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
      confSenha: "",
      loading: false,
      tipoUsuario: "key",
      nomeComp: "",
      generos: "",
      error: []
    };
  }
  cadastro = () => {
    var user = new User();
    user.nomeComp = this.state.nomeComp;
    user.email = this.state.usuario;
    user.senha = this.state.senha;
    user.confSenha = this.state.confSenha;
    user.generoStr = this.state.generos;
    user.tipoUsuario = this.state.tipoUsuario;
    let load = this.state.loading;
    Keyboard.dismiss();
    // alert(functions.hashCode("leandro"));
    // load = true;
    if (!load) {
      load = true;
      if (this.canBeSubmitted(user)) {
        if (user.senha != user.confSenha) {
          const errors = this.validade(user);
          console.log(this.state.error);
          errors.senha = true;
          errors.confSenha = true;
          this.setState({ error: errors });
          console.log(this.state.error);
          Alert.alert("Atenção", "As senhas devem ser iguais.");
        } else {
          // FUNCAO
          firebaseApp.CreateUser(user, this);
        }
      } else {
        Alert.alert("Atenção", "Preencha os campos marcados para proseguir.");
      }
    }
  };
  canBeSubmitted = user => {
    const errors = this.validade(user);

    this.setState({
      error: errors
    });
    const invalid = Object.keys(errors).some(x => errors[x]);
    return !invalid;
  };

  validade = user => {
    return {
      // nomeComp: user.nomeComp.length === 0,
      email: user.email.length === 0,
      senha: user.senha.length === 0,
      confSenha: user.confSenha.length === 0
      // tipoUsuario: user.tipoUsuario == "key",
      // generoStr: user.generoStr.length === 0
    };
  };

  render() {
    var back = this.props.navigation.goBack;
    return (
      <Container style={styles.container}>
        <MyHeader
          backGo={back}
          title="Realize seu cadastro"
          middle="noBg"
          left="back"
        />
        <Content style={styles.contentCadastro}>
          <Form style={styles.formCadastro}>
            <ImageBackground
              source={require("../assets/logo-2.png")}
              resizeMode="contain"
              style={styles.backgroundImage}
            >
              <Item
                floatingLabel
                last
                style={
                  !this.state.error.nomeComp
                    ? styles.inputContainer
                    : styles.inputContainerError
                }
              >
                <Label
                  style={
                    !this.state.error.nomeComp
                      ? styles.labelLogin
                      : styles.labelLoginError
                  }
                >
                  Nome Completo
                </Label>
                <Input
                  style={styles.inputLogin}
                  value={this.state.nomeComp}
                  disabled={true}
                  onChangeText={nomeComp => this.setState({ nomeComp })}
                  maxLength={25}
                />
                {this.state.error.nomeComp && (
                  <Icon name="close-circle" style={styles.iconError} />
                )}
              </Item>
              <Item
                floatingLabel
                last
                style={
                  !this.state.error.email
                    ? styles.inputContainer
                    : styles.inputContainerError
                }
              >
                <Label
                  style={
                    !this.state.error.email
                      ? styles.labelLogin
                      : styles.labelLoginError
                  }
                >
                  E-mail
                </Label>
                <Input
                  style={styles.inputLogin}
                  onChangeText={usuario => this.setState({ usuario })}
                  value={this.state.usuario}
                  maxLength={25}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                {this.state.error.email && (
                  <Icon name="close-circle" style={styles.iconError} />
                )}
              </Item>
              <Item
                floatingLabel
                last
                style={
                  !this.state.error.senha
                    ? styles.inputContainer
                    : styles.inputContainerError
                }
              >
                <Label
                  style={
                    !this.state.error.senha
                      ? styles.labelLogin
                      : styles.labelLoginError
                  }
                >
                  Senha
                </Label>
                <Input
                  style={styles.inputLogin}
                  secureTextEntry={true}
                  value={this.state.senha}
                  onChangeText={senha => this.setState({ senha })}
                  maxLength={25}
                />
                {this.state.error.senha && (
                  <Icon name="close-circle" style={styles.iconError} />
                )}
              </Item>
              <Item
                floatingLabel
                last
                style={
                  !this.state.error.confSenha
                    ? styles.inputContainer
                    : styles.inputContainerError
                }
              >
                <Label
                  style={
                    !this.state.error.confSenha
                      ? styles.labelLogin
                      : styles.labelLoginError
                  }
                >
                  Confirmar Senha
                </Label>
                <Input
                  style={styles.inputLogin}
                  secureTextEntry={true}
                  value={this.state.confSenha}
                  onChangeText={confSenha => this.setState({ confSenha })}
                  maxLength={25}
                />
                {this.state.error.confSenha && (
                  <Icon name="close-circle" style={styles.iconError} />
                )}
              </Item>
              <Item
                last
                rounded
                style={
                  !this.state.error.tipoUsuario
                    ? styles.pickerContainer
                    : styles.pickerContainerError
                }
              >
                <Label
                  style={
                    !this.state.error.tipoUsuario
                      ? styles.labelLoginPicker
                      : styles.labelLoginErrorPicker
                  }
                >
                  Perfil:
                </Label>
                <Picker
                  renderHeader={backAction => (
                    <Header
                      iosBarStyle="default"
                      androidStatusBarColor="#023c69"
                      style={styles.header}
                    >
                      <Left style={styles.leftHeader}>
                        <Button style={styles.btnVoltar} onPress={backAction}>
                          <Icon style={styles.iconVoltar} name="arrow-back" />
                          <Text style={styles.textVoltar}>Voltar</Text>
                        </Button>
                      </Left>
                      <Body style={styles.bodyHeader}>
                        <Title style={styles.titleHeader}>Selecione</Title>
                      </Body>
                      <Right style={styles.rightHeader} />
                    </Header>
                  )}
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  selectedValue={this.state.tipoUsuario}
                  onValueChange={tipoUsuario => this.setState({ tipoUsuario })}
                  enabled={false}
                >
                  <Picker.Item label="Selecione" value="key" color="gray" />
                  <Picker.Item label="Músico" value="key0" />
                  <Picker.Item label="Fã/Agente Musical" value="key1" />
                </Picker>
                {this.state.error.tipoUsuario && (
                  <Icon name="close-circle" style={styles.iconErrorPicker} />
                )}
              </Item>
            </ImageBackground>
            <Button
              disabled={this.state.loading}
              block
              style={
                this.state.loading
                  ? styles.btnCadastroDisabled
                  : styles.btnCadastro
              }
              onPress={() => this.cadastro()}
            >
              <Text>Entrar</Text>
            </Button>
          </Form>
          <Loader loading={this.state.loading} />
        </Content>
      </Container>
    );
  }
}
// const mapStateToProps = state => {
//   const { initState } = state;
//   return { initState };
// };
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       signInState
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Cadastro);
