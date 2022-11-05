<template>
  <h1>Suas Playlists</h1>
  <br />
  <h2>
    Fala tu, <strong>{{ loggedUser.nome }}</strong>
  </h2>
  <h2>ID: {{ loggedUser.id }}</h2>
</template>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      accessToken: undefined,
      loggedUser: {},
    };
  },
  async mounted() {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    let params = new URLSearchParams(document.location.search);
    let code = params.get("code");

    let body = {
      grant_type: "authorization_code",
      code /* como o atributo tem mesmo nome, a cosinhsa agem como se nada tivesse acontedifo */,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    };

    // recuperando o access token
    let resposta = await axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams(Object.entries(body)).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
      },
    });
    this.accessToken = resposta.data.access_token;

    // recuperar id do usuario
    let respostaUsuario = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    this.loggedUser = {
      nome: respostaUsuario.data.display_name,
      id: respostaUsuario.data.id,
    };

    // recuperar playlists do usuario logado
    let respostaPlaylists = await axios({
      method: "GET",
      //url: `https://api.spotify.com/v1/me/playlists`,
      url: `https://api.spotify.com/v1/users/${this.loggedUser.id}/playlists`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    console.log(respostaPlaylists);
    //console.log(respostaPlaylists.data.items[1].images[0].url);

    // refresh token
  },
};
</script>

<style></style>
