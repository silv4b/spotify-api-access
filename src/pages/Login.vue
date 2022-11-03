<template>
  <section class="w-2/5 bg-green-500 absolute left-0 top-0 h-full p-20">
    <h2 class="text-white text-4xl text-left font-bold mt-20">
      Entre agora para começar a curtir as suas músicas preferidas.
    </h2>
  </section>
  <section class="w-3/5 bg-white absolute right-0 top-0 h-full">
    <div>
      <a href="https://open.spotify.com/" target="_blank">
        <img
          class="m-auto scale-[0.5]"
          src="./../assets/spotify-logo.svg"
          alt="Logo Spotify"
        />
      </a>
    </div>
    <div class="text-center absolute w-full bottom-16">
      <button
        @click="login"
        class="bg-green-500 text-white text-bold text-lg px-8 py-4 rounded-full"
      >
        Entrar com Spotify
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      baseLink: "https://accounts.spotify.com/authorize?",
      responseType: "code",
      clientID: "667eff57860146d3ae566e2a103db343",
      scopes:
        "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
      redirectURI:
        "http://localhost:5173/playlists" /* adicionada no dashboard do spotify como confiável */,
    };
  },
  methods: {
    login() {
      location.href = `${this.baseLink}response_type=${this.responseType}&client_id=${this.clientID}&scope=${this.scopes}&redirect_uri=${this.redirectURI}`;
    },
  },
};
</script>

<style></style>
