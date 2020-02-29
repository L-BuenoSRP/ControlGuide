import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import Constants from "expo-constants";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2fc",
    ...Platform.select({
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  containerSidebar: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#f0f2fc",
    ...Platform.select({
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  sidebarImageBg: {
    height: 120,
    width: "100%",
    alignSelf: "stretch"
  },
  sidebarImage: {
    height: 84,
    width: "100%",
    position: "absolute",
    alignSelf: "center",
    top: 20
  },
  sidebarUserContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  containerAuth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2fc",
    ...Platform.select({
      android: {
        paddingTop: Constants.statusBarHeight
      }
    })
  },
  backgroundImage: {
    width: Dimensions.get("window").width - 20,
    alignSelf: "center"
  },
  titHeader: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold"
  },
  titHeaderBg: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    height: "80%"
  },
  btnCadastro: {
    marginTop: 25,
    backgroundColor: "#7f0a0a",
    width: "60%",
    alignSelf: "center",
    borderRadius: 8
  },
  btnCadastroDisabled: {
    marginTop: 25,
    backgroundColor: "#969696",
    width: 320,
    alignSelf: "center"
  },
  header: {
    backgroundColor: "#b71c1c",
    alignSelf: "flex-start",
    marginLeft: -5,
    marginRight: -5,
    opacity: 0.9
  },
  headerBgTitleContainer: {
    backgroundColor: "#7f0000",
    width: "85%",
    height: "100%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 9
  },
  headerBgImageContainer: {
    backgroundColor: "#7f0000",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    borderRadius: 5
  },
  headerBgImageContent: {
    height: "80%"
  },
  leftHeader: { flex: 1 },
  bodyHeader: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  },
  rightHeader: { flex: 1 },
  titleHeader: { color: "#606060", alignSelf: "center" },
  btnHeader: {
    backgroundColor: "#7f0000",
    width: 45,
    borderColor: "#606060",
    borderRadius: 15
  },
  iconHeader7: { marginLeft: 7, marginRight: -7 },
  iconHeader6: { marginLeft: 6, marginRight: -7 },
  textVoltar: { marginRight: -6 },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#d9d9d9",
    height: 130,
    width: 130,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  indicatorLoaderScreen: { marginBottom: 10, flex: 0 },
  indicatorLoaderScreenDev: { marginTop: 10, marginBottom: 10, flex: 0 },
  textLoaderScreen: { fontSize: 20, marginBottom: 10 },
  imgLogin: {
    alignSelf: "center",
    marginBottom: 25,
    height: 150,
    resizeMode: "contain"
  },
  inputContainer: {
    borderColor: "gray",
    paddingBottom: 2,
    marginBottom: -12,
    width: "85%"
  },
  inputContainerError: {
    borderColor: "red",
    paddingBottom: 2,
    marginBottom: -12
  },
  labelLogin: { marginLeft: -10 },
  labelLoginError: { marginLeft: -10, color: "red" },
  inputLogin: {
    marginLeft: -10
  },
  iconError: {
    alignSelf: "flex-end",
    marginBottom: 7,
    marginRight: 10,
    color: "red"
  },
  pickerContainer: {
    paddingLeft: 2,
    marginLeft: 0,
    marginTop: 25,
    borderColor: "gray"
  },
  pickerContainerError: {
    paddingLeft: 2,
    marginLeft: 0,
    marginTop: 25,
    borderColor: "red"
  },
  iconErrorPicker: {
    alignSelf: "flex-end",
    marginBottom: 12,
    marginRight: 10,
    color: "red"
  },
  contentCadastro: {
    width: "100%",
    height: "100%",
    marginTop: 60
  },
  formCadastro: { width: "80%", height: "100%", alignSelf: "center" },
  labelLoginPicker: { marginLeft: 2 },
  labelLoginErrorPicker: { marginLeft: 2, color: "red" },
  top20: { marginTop: 20 },
  textLogin: {
    alignSelf: "center",
    fontSize: 18
  },
  btnLoginCadastro: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f0a0a",
    width: "100%",
    height: 50
  },
  textCadastro: {
    fontSize: 20,
    color: "#FFF"
  },
  btnLoginDisabled: {
    marginTop: 25,
    backgroundColor: "#969696",
    width: "45%",
    alignSelf: "center",
    borderRadius: 8
  },
  btnLogin: {
    marginTop: 25,
    backgroundColor: "#7f0a0a",
    width: "45%",
    alignSelf: "center",
    borderRadius: 8
  },
  btnLoginText: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center"
  },
  collapseContainer: {
    borderColor: "gray",
    borderWidth: 2,
    width: "99%",
    alignSelf: "center",
    marginVertical: 5
  },
  collapseHeader: {
    backgroundColor: "#b2b2b2",
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 10,
    padding: 5
  },
  minhaListaContent: { width: "100%", paddingTop: 10, paddingHorizontal: "2%" },
  collapseHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15
  },
  titleCollapse: { fontSize: 17 },
  iconCollapse: { marginRight: 10, fontSize: 18 },
  collapseBody: { padding: 5, backgroundColor: "#e5e5e5" },
  styleContentContainerListMain: {
    flexDirection: "column" /*, flexWrap: 'wrap'*/,
    marginTop: 9
  },
  styleListMain: {
    alignSelf: "center",
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 3
  },
  styleListSearch: {
    alignSelf: "center",
    paddingLeft: 4,
    paddingRight: 4
  },
  bottomViewMinhaLista: { height: 10 },
  listItemCard: {
    width: width / 2 - 15,
    marginLeft: 6,
    marginTop: -18,
    paddingRight: 0,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent"
  },
  contentTouch: { width: "90%" },
  contentCard: { width: "100%" },
  contentCardItemTop: { paddingBottom: 2, marginTop: 5 },
  contentItemTopBody: {
    height: 45,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  contentTitle: { fontSize: 13.5 },
  contentAverageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentAverageText: { marginLeft: 5, width:"27%" },
  contentContentType: { textAlign: "right", width:"55%" },
  contentCardItemMiddle: { justifyContent: "center", paddingBottom: 0 },
  contentImage: { height: 180, width: "90%", padding: 0 },
  contentCardItemBottom: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingHorizontal: 0,
    paddingTop: 3
  },
  contentLancamento: {
    fontSize: 13.7,
    marginTop: 0,
    paddingTop: 0,
    width: 90
  },
  contentLancamentoButton: {
    marginLeft: 5,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  contentLancamentoButtonIcon: {},
  MenuOptionsContainer: {
    width: 125,
    paddingHorizontal: 10,
    borderColor: "#c4c4c4",
    borderWidth: 5
  },
  MenuOptionBorderBottom: {
    borderBottomColor: "#d6d6d6",
    borderBottomWidth: 1
  },
  ContentW100Perc: { width: "100%" },
  HeaderSearchBar: { width: "100%", backgroundColor: "#b71c1c", marginTop: 7 },
  HearderSearchItem: { flex: 4 },
  HeaderSearchButton: { flex: 1, marginLeft: 10, height: "70%", height: "70%" }
});

export default styles;
