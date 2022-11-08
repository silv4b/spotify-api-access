import axios from "axios";

const clientID = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;

let accessToken;
let refreshToken;
let expiresIn;

let tokenExpirado = false;

export default class SpotifyApi {

  // recuperando o access token.
  static async getToken(code) {
    const body = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.VITE_REDIRECT_URI_PLAYLISTS,
    };

    const resposta = await axios({
      method: "POST",
      url: process.env.VITE_URL_TOKEN,
      data: new URLSearchParams(Object.entries(body)).toString(),
      headers: {
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = resposta.data.access_token;
    refreshToken = resposta.data.refresh_token;
    expiresIn = resposta.data.expires_in;

    //console.log(`Access Token: ${accessToken}`);
    //console.log(`Refresh Token: ${refreshToken}`);
    //console.log(`Expires In: ${expiresIn} milissegundos`);

    tokenExpirado = false;

    setTimeout(() => {
      tokenExpirado = true;
      //SpotifyApi.refreshToken();
    }, expiresIn);
  }

  // recupera refresh token
  static async refreshToken() {
    const body = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const resposta = await axios({
      method: "POST",
      url: process.env.VITE_URL_TOKEN,
      data: new URLSearchParams(Object.entries(body)).toString(),
      headers: {
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = resposta.data.access_token;
    expiresIn = resposta.data.expires_in;

    //console.log(`New Access Token: ${accessToken}`);
    //console.log(`Expires In: ${expiresIn} milissegundos`);

    tokenExpirado = false;

    setTimeout(() => {
      tokenExpirado = true;
      //SpotifyApi.refreshToken();
    }, expiresIn);
  }

  // recuperar id do usuario
  static async getUser() {
    if (tokenExpirado) await SpotifyApi.refreshToken();

    const resposta = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken} `,
      },
    });

    const loggedUser = {
      id: resposta.data.id,
      nome: resposta.data.display_name,
      profileLink: resposta.data.external_urls.spotify,
    };

    return loggedUser;
  }

  // recuperar playlists do usuario logado
  static async getPlayLists(loggedUser) {
    if (tokenExpirado) await SpotifyApi.refreshToken();

    const resposta = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/users/${loggedUser.id}/playlists`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return resposta.data.items;
  }
}