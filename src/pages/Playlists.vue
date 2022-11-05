<template>
  <h1>Suas Playlists</h1>
  <br />
  <h2>
    Fala tu, <strong>{{ loggedUser.nome }}</strong>
  </h2>
  <h2>ID: {{ loggedUser.id }}</h2>
  <h2>Playlists: {{ playlists }}</h2>
</template>

<script>
import SpotifyApi from "./../api/SpotifyAPI";

export default {
  data: () => {
    return {
      accessToken: undefined,
      loggedUser: {},
      playlists: [],
    };
  },
  async mounted() {
    let params = new URLSearchParams(document.location.search);
    let code = params.get("code");

    // recuperando o access token
    // SpotifyApi.getToken(code);
    // Não necessita de: let spotifyApi = new SpotifyApi();
    this.accessToken = await SpotifyApi.getToken(code);

    // recuperar id do usuario
    this.loggedUser = await SpotifyApi.getUser();

    // recuperar playlists do usuario logado
    this.playlists = await SpotifyApi.getPlayLists(this.loggedUser);

    // refresh token
  },
};
</script>

<style></style>
