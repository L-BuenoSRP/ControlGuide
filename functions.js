const functions = {
  translate: function(string) {
      console.log("chegou no translate");
    if (string == "The email address is badly formatted.") {
      return "Formato do endereço de e-mail inválido.";
    } else if (
      string == "The password is invalid or the user does not have a password."
    ) {
      return "Senha inválida.";
    } else if (
      string ==
      "Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later"
    ) {
      return "Muitas tentativas de login, tente outras credencias, se necessário, acione nosso suporte.";
    } else if (
      string ==
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      return "Não há registro de usuário correspondente a esse identificador. O usuário pode ter sido excluído.";
    } else if (
      string ==
      "A network error (such as timeout, interrupted connection or unreachable host) has occurred."
    ) {
      return "Ocorreu um erro de rede (como tempo limite, conexão interrompida ou host inacessível).";
    } else if (
      string == "The email address is already in use by another account."
    ) {
      return "O endereço de e-mail já está sendo usado por outra conta.";
    } else if (string == "Password should be at least 6 characters") {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    return string;
  },
  upLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

export default functions;
