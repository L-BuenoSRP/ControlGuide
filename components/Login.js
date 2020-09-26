import React from "react";
import {
    Container,
    Text,
    Button,
    View,
    Item,
    Label,
    Input,
    Form,
} from "native-base";
import {
    Alert,
    Keyboard,
    StatusBar,
    Image
} from "react-native";
import Loader from "./Loader";
import styles from "../styles";
import User from "../models/User";
import firebaseApp from "../Infra/firebase";
// import { bindActionCreators } from "redux";
// import { logonState } from "../redux/initReducerFunctions";
// import { connect } from "react-redux";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: "leandro-bs95@hotmail.com",
            senha: "abc123",
            image: require("../assets/logo-default.png"),
            loading: false
        };
        // this.props.navigation.navigate("App");
    }
    login = () => {
        var user = new User();
        user.email = this.state.usuario;
        user.senha = this.state.senha;
        let load = this.state.loading;
        Keyboard.dismiss();
        if (!load) {
            load = true;
            if (user.email != "" && user.senha != "") {
                //faz login no banco
                firebaseApp.Login(user, this);
                this.setState({
                    loading: load
                });
            } else {
                Alert.alert(
                    "Atenção",
                    "Digite seu e-mail e senha para realizar a autenticação."
                );
            }
        }
    };
    goToCadastro = () => {
        this.props.navigation.navigate("Cadastro");
    };
    render() {
        return (
            <Container style={styles.containerLogin}>
                <StatusBar translucent />
                <Image
                    source={this.state.image}
                    style={styles.imgLogin}
                />
                <Form>
                    <Item floatingLabel last style={styles.inputContainer}>
                        <Label style={styles.labelLogin}>E-mail</Label>
                        <Input
                            style={styles.inputLogin}
                            onChangeText={usuario => this.setState({ usuario })}
                            value={this.state.usuario}
                            maxLength={25}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                    </Item>
                    <Item floatingLabel last style={styles.inputContainer}>
                        <Label style={styles.labelLogin}>Senha</Label>
                        <Input
                            style={styles.inputLogin}
                            secureTextEntry={true}
                            value={this.state.senha}
                            onChangeText={senha => this.setState({ senha })}
                            maxLength={25}
                        />
                    </Item>
                    <Button
                        disabled={this.state.loading}
                        block
                        style={
                            this.state.loading ? styles.btnLoginDisabled : styles.btnLogin
                        }
                        onPress={() => this.login()}
                    >
                        <Text style={styles.btnLoginText}>Entrar</Text>
                    </Button>

                </Form>

                <Loader loading={this.state.loading} />

                <View style={styles.top20} />
                <Text style={styles.textLogin}>Não tem uma conta?</Text>
                <View style={styles.top20} />

                <Button style={styles.btnLoginCadastro}
                    onPress={() => this.goToCadastro()}>
                    <Text
                        style={styles.textCadastro}
                        uppercase={false}
                    >
                        Cadastre-se
                    </Text>
                </Button>

            </Container>
        );
    }
    // // componentDidMount() {
    // //   //    firebase.auth().signOut();
    // //   firebase.auth().onAuthStateChanged(user => {
    // //     console.log(user);
    // //     if (user) {
    // //       this.props.navigation.navigate("Main");
    // //     }
    // //     this.setState({ searchBool: true });
    // //   });
    // // }
}
// const mapStateToProps = state => {
//     const { initState } = state;
//     return { initState };
// };
// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//             logonState
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Login);