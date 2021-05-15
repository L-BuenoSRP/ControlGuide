import React from "react";
import { StatusBar, AsyncStorage } from "react-native";
import styles from "../styles";
import { Container, Text } from "native-base";
import {
    DotIndicator,
} from 'react-native-indicators';
import firebaseApp from '../Infra/firebase';
import firebase from "firebase";
export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._verifyAsync();
    }

    _verifyAsync = async () => {
        firebaseApp.AuthState(this);
    };

    render() {
        return (
            <Container style={styles.containerAuth}>
                <StatusBar barStyle="default" />
                <Text style={styles.textLoaderScreen}>Carregando</Text>
                <DotIndicator size={18} color="#b70909" style={styles.indicatorLoaderScreen} />
            </Container>
        );
    }
}
