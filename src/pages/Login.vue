<template>
  <section
    class="w-2/5 bg-green-500 absolute left-0 top-0 h-full p-20"
    :class="isMobile == true ? 'invisible' : 'visible'"
  >
    <h2 class="text-white text-4xl text-left font-bold mt-20">
      Entre agora para começar a curtir as suas músicas preferidas.
    </h2>
  </section>
  <section
    class="w-3/5 bg-white absolute right-0 top-0 h-full"
    :class="isMobile == true ? 'w-full' : 'w-3/5 '"
  >
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
  mounted() {
    this.isMobile = this.$isMobile();
    //console.log(this.isMobile);
  },
  data: () => {
    return {
      isMobile: true,
      baseLink: import.meta.env.VITE_URL_AUTHORIZE,
      responseType: "code",
      clientID: import.meta.env.VITE_CLIENT_ID,
      scopes:
        "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
      redirectURI: import.meta.env
        .VITE_REDIRECT_URI /* adicionada no dashboard do spotify como confiável */,
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
