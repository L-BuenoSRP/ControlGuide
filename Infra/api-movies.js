import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3/";

const baseUrlImage = "https://image.tmdb.org/t/p/";

const apiKey = "5e6e857002adbbd14ae96042862c8aad";
const tamanhosImagem = ["w500", "original"];
const functionsApi = {
  getConfiguracoes: function() {
    return (
      "api_key=" +
      apiKey +
      "&language=pt-BR&append_to_response=images&include_image_language=pt-BR,null"
    );
  },
  getImagem: function(url, tamanho) {
    return baseUrlImage + tamanhosImagem[tamanho] + url;
  },
  getTendencias: async function(component) {
    await axios
      .get(baseUrl + "trending/all/week?" + this.getConfiguracoes())
      .then(res => {
        component.setState({ listaTendenciasRest: res.data });
      });
  },
  buscaSerie: function(id) {
    return axios
      .get(baseUrl + "tv/" + id + "?" + this.getConfiguracoes())
      .then(res => {
        return res.data;
      });
  },
  buscaFilme: function(id) {
    return axios
      .get(baseUrl + "movie/" + id + "?" + this.getConfiguracoes())
      .then(res => {
        return res.data;
      });
  },
  searchContent: async function(conditionText, component) {
    return axios
      .get(
        baseUrl +
          "search/multi?" +
          this.getConfiguracoes() +
          "&query=" +
          conditionText +
          "&adult=false"
      )
      .then(res => {
        component.setState({ listaPesquisaRest: res.data });
      });
  }
};

export default functionsApi;
