import axios from "axios";

// deve ser explícito, por hora, trocar apenas para commitar
const clientID = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;

let accessToken;

export default class SpotifyApi {

  // recuperando o access token.
  // método statíco, não necessitando da criação de uma instância de SpotifyApi para que seja usado.
  static async getToken(code) {

    const body = {
      grant_type: "authorization_code",
      code: code,
      //redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      // deve ser explícito, por hora, trocar apenas para commitar
      redirect_uri: process.env.VITE_REDIRECT_URI_PLAYLISTS,
    };

    const resposta = await axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams(Object.entries(body)).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
      },
    });

    accessToken = resposta.data.access_token;
    return resposta.data.access_token;
  }

  // recuperar id do usuario
  static async getUser() {

    const resposta = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const loggedUser = {
      nome: resposta.data.display_name,
      id: resposta.data.id,
    };

    return loggedUser;
  }

  // recuperar playlists do usuario logado
  static async getPlayLists(loggedUser) {
    const resposta = await axios({
      method: "GET",
      //url: `https://api.spotify.com/v1/me/playlists`,
      url: `https://api.spotify.com/v1/users/${loggedUser.id}/playlists`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return resposta.data.items;
  }
}