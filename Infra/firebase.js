import firebase from "firebase";
import { Alert, AsyncStorage } from "react-native";
import styles from "../styles";
import functions from "../functions";
const firebaseApp = {
  InitApp: function() {
    var firebaseConfig = {
      apiKey: "AIzaSyAv9H6mXe7yWerozqj2EHOh6Ns_s452TIo",
      authDomain: "control-app-series.firebaseapp.com",
      databaseURL: "https://control-app-series.firebaseio.com",
      projectId: "control-app-series",
      storageBucket: "control-app-series.appspot.com",
      messagingSenderId: "1000025285712",
      appId: "1:1000025285712:web:23d8c111e827901e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  },
  AuthState: function(component) {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null && user != undefined) {
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        AsyncStorage.setItem("usuarioLogado", email);
        AsyncStorage.setItem("idUsuarioLogado", uid);
        component.props.navigation.navigate("App");
      } else {
        component.props.navigation.navigate("Auth");
      }
    });
  },
  CreateUser: function(user, component) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.senha)
      .then(res => {
        AsyncStorage.setItem("usuarioLogado", user.email.toLowerCase());

        // user.generos = user.generoStr.split(";");
        {
          // firebase
          //   .database()
          //   .ref("Users/" + res.user.uid)
          //   .set({
          //     nomeComp: user.nomeComp,
          //     tipoUsuario: user.tipoUsuario,
          //     generos: user.generos
          //   })
          //   .then(data => {
          //     //ideia: usar redux para gravar e receber a informacao na view home para informar que é primeiro acesso, apos isso mostrar um modal de bem bindo
          //   })
          //   .catch(error => {
          //     this.setState({ loading: false });
          //     Alert.alert("Atenção", functions.translate(error.message));
          //     //olhar como deletar o usuario
          //   });
        }
      })
      .catch(error => {
        component.setState({ loading: false });
        Alert.alert("Atenção", functions.translate(error.message));
      });
  },
  LogOut: function(component) {
    firebase.auth().signOut();
    AsyncStorage.removeItem("usuarioLogado").then(valor => {
      console.log(valor);
    });
    component.props.navigation.navigate("Auth");
  },
  Login: function(userParam, component) {
    firebase
      .auth()
      .signInWithEmailAndPassword(userParam.email, userParam.senha)
      .then(user => {
        component.setState({ loading: false });
        let parametros = {
          NotFirstAccess: true
        };
        AsyncStorage.setItem("usuarioLogado", userParam.email.toLowerCase());
        AsyncStorage.setItem("idUsuarioLogado", user.user.uid);
        // this.props.logonState();
        component.props.navigation.navigate("App", parametros);
      })
      .catch(error => {
        component.setState({ loading: false });
        console.log(error);
        Alert.alert("Atenção", functions.translate(error.message));
      });
  },
  buscaMeusConteudosTendencia: async function(component) {
    const user = await AsyncStorage.getItem("idUsuarioLogado");

    let itemsRef = await firebase.database().ref("MeusConteudos/" + user + "/");

    await itemsRef.on("value", snapshot => {
      var conteudos = [];

      // criar mudança no app para que funcione
      // com sincronização de dados entre async storage e firebase
      // apos login ou em outro momento
      snapshot.forEach(childSnapshot => {
        conteudos.push(childSnapshot.val());
        //firebase.database().ref("MeusConteudos/" + user + "/"+childSnapshot.key).remove();
      });

      results = component.state.listaTendenciasRest.results;
      results = results.filter(el => {
        if (conteudos.length > 0) {
          var isShow = true;

          conteudos.forEach(item => {
            if (isShow) {
              if (el.name) {
                if (item.name && item.id) {
                  //se é serie
                  if (
                    el.name.toLowerCase() == item.name.toLowerCase() &&
                    el.id == item.id
                  ) {
                    //se é serie e esta no meus conteudos
                    //verifica status e retorna se estiver nao visto (curr_time: 0 ou 00:00+)
                    isShow = item.curr_time.toString() != "-1";
                    el.curr_time = item.curr_time;
                  } else {
                    //se é serie e não esta no meus conteudos
                    isShow = true;
                  }
                } else {
                  isShow = true;
                }
              } else if (el.title) {
                if (item.title && item.id) {
                  //se é filme
                  if (
                    el.title.toLowerCase() == item.title.toLowerCase() &&
                    el.id == item.id
                  ) {
                    //se é filme e esta no meus conteudos
                    isShow = item.curr_time.toString() != "-1";
                    el.curr_time = item.curr_time;
                  } else {
                    //se é filme e não esta no meus conteudos
                    isShow = true;
                  }
                } else {
                  isShow = true;
                }
              }
            }
          });

          return isShow;
        } else {
          return true;
        }
      });
      // saveJsonResult('antes', JSON.stringify(results));
      results.sort((a, b) => {
        if (
          a.curr_time &&
          Number(
            String(a.curr_time)
              .substr(0, 1)
              .toString()
          ) >= 0 &&
          !b.curr_time
        ) {
          return -1;
        } else if (
          !a.curr_time ||
          Number(
            String(a.curr_time)
              .substr(0, 1)
              .toString()
          ) < 0 ||
          b.curr_time
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      // saveJsonResult('depois', JSON.stringify(results));
      component.setState({ listaTendencias: results });
    });
  },
  addToConteudos: async function(data, status) {
    const user = await AsyncStorage.getItem("idUsuarioLogado");
    var existe = false;
    var itemExistente = "";
    await firebase
      .database()
      .ref("MeusConteudos/" + user)
      .once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          if (data.name) {
            if (childSnapshot.val().name && childSnapshot.val().id) {
              if (!existe)
                if (
                  data.id == childSnapshot.val().id &&
                  data.name.toLowerCase() ==
                    childSnapshot.val().name.toLowerCase()
                ) {
                  existe = true;
                  if (existe) {
                    itemExistente = childSnapshot.key;
                  }
                }
            }
          } else if (data.title) {
            if (childSnapshot.val().title && childSnapshot.val().id) {
              if (!existe)
                if (
                  data.id == childSnapshot.val().id &&
                  data.title.toLowerCase() ==
                    childSnapshot.val().title.toLowerCase()
                ) {
                  existe = true;
                  if (existe) {
                    itemExistente = childSnapshot.key;
                  }
                }
            }
          }
        });
      });
    if (existe) {
      if (status == "visto") {
        await firebase
          .database()
          .ref("MeusConteudos/" + user + "/" + itemExistente)
          .update({
            curr_time: "-1"
          })
          .then(res => {
            if (data.name)
              console.log(
                "Serie " +
                  data.name +
                  " adicionada com sucesso ao usuario " +
                  user
              );
            if (data.title)
              console.log(
                "Filme " +
                  data.title +
                  " adicionado com sucesso ao usuario " +
                  user
              );
          });
      }
    } else {
      var conteudo = {};
      if (data.name) {
        conteudo.name = data.name;
        conteudo.id = data.id;
        conteudo.first_air_date = data.first_air_date;
        conteudo.created_by = data.created_by;
        conteudo.genres = data.genres;
        conteudo.networks = data.networks;
        conteudo.origin_country = data.origin_country;
        conteudo.overview = data.overview;
        conteudo.original_name = data.original_name;
        conteudo.poster_path = data.poster_path;
        conteudo.production_companies = data.production_companies;
        conteudo.vote_average = data.vote_average;
        conteudo.backdrop_path = data.backdrop_path;
        if (status == "visto") {
          //coloca para o ultimo ep e temp com time = -1
          if (data.last_episode_to_air && !data.next_episode_to_air) {
            conteudo.curr_sesion = data.last_episode_to_air.season_number;
            conteudo.cur_episode = data.last_episode_to_air.episode_number;
            conteudo.curr_time = "-1";
            conteudo.total_sesions = data.last_episode_to_air.season_number;
            conteudo.total_episodes_lstSesion =
              data.last_episode_to_air.episode_number;
          } else if (
            data.last_episode_to_air != null &&
            data.next_episode_to_air != null
          ) {
            conteudo.curr_sesion = data.next_episode_to_air.season_number;
            conteudo.cur_episode = data.next_episode_to_air.episode_number;
            conteudo.curr_time = "0";
            conteudo.total_sesions = data.last_episode_to_air.season_number;
            conteudo.total_episodes_lstSesion =
              data.last_episode_to_air.episode_number;
          }
        } else if (status == "desejos") {
          if (data.last_episode_to_air) {
            conteudo.curr_sesion = 1;
            conteudo.cur_episode = 1;
            conteudo.curr_time = "0";
            conteudo.total_sesions = data.last_episode_to_air.season_number;
            conteudo.total_episodes_lstSesion =
              data.last_episode_to_air.episode_number;
          }
        }
      } else if (data.title) {
        conteudo.title = data.title;
        conteudo.id = data.id;
        conteudo.backdrop_path = data.backdrop_path;
        conteudo.genres = data.genres;
        conteudo.original_title = data.original_title;
        conteudo.overview = data.overview;
        conteudo.poster_path = data.poster_path;
        conteudo.production_companies = data.production_companies;
        conteudo.production_countries = data.production_countries;
        conteudo.vote_average = data.vote_average;
        conteudo.release_date = data.release_date;

        //belongs_to_collection
        if (status == "visto") {
          //coloca para o ultimo ep e temp com time = -1
          conteudo.curr_time = "-1";

          if (data.belongs_to_collection) {
            console.log(data.belongs_to_collection);
            Alert.alert("O filme " + data.id + " possui belongs collection");
            console.log(JSON.stringify(data.belongs_to_collection));
          }
        } else if (status == "desejos") {
          conteudo.curr_time = "0";
        }
      }
      await firebase
        .database()
        .ref("MeusConteudos/" + user)
        .push(conteudo)
        .then(res => {
          if (data.name)
            console.log(
              "Serie " +
                data.name +
                " adicionada com sucesso ao usuario " +
                user
            );
          if (data.title)
            console.log(
              "Filme " +
                data.title +
                " adicionado com sucesso ao usuario " +
                user
            );
        });
    }
  }
};

const saveJsonResult = function(filename, data) {
  if (__DEV__) {
    console.log(filename + "=|" + data);
    console.log("------------------------");
  }
};

export default firebaseApp;
