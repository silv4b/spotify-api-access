<template>
  <div class="vl-parent">
    <Loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
  <nav class="py-8 px-8 text-white flex justify-between bg-zinc-900">
    <h1 class="text-2xl font-bold">Suas Playlists</h1>

    <div>
      <img
        class="m-auto scale-[1.5] h-8"
        src="./../assets/spotify-png.png"
        alt="Logo Spotify"
      />
    </div>

    <div class="">
      <a v-bind:href="loggedUser.profileLink" target="_blank"
        ><span class="label label-danger">{{ loggedUser.nome }}</span></a
      >
      <button class="ml-6" @click="logout">Sair</button>
    </div>
  </nav>
  <section class="playlists mt-10">
    <div class="text-white py-4 px-8 flex justify-evenly font-black">
      <p class="w-96">Nome</p>
      <p class="w-40">Pública</p>
      <p class="w-40">Colaborativa</p>
      <p class="w-40">Autor</p>
    </div>
    <div
      class="text-white py-4 px-8 flex justify-evenly"
      v-for="item in playlists"
      :key="item.id"
    >
      <p class="w-96">{{ item.name }}</p>
      <p class="w-40">{{ item.public ? "Sim" : "Não" }}</p>
      <p class="w-40">{{ item.collaborative ? "Sim" : "Não" }}</p>
      <p class="w-40">{{ item.owner.display_name }}</p>
    </div>
  </section>
  <footer class="py-8 px-16 text-zinc-500 text-sm text-center bg-zinc-900">
    <span> Aplicação desenvolvida para testes 💖 </span>
  </footer>
</template>

<script>
import SpotifyApi from "./../api/SpotifyAPI";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components: {
    Loading,
  },
  data: () => {
    return {
      //accessToken: undefined,
      loggedUser: {},
      playlists: [],
      isLoading: true,
      fullPage: true,
    };
  },
  async mounted() {
    let params = new URLSearchParams(document.location.search);
    let code = params.get("code");

    // recuperando o access token
    await SpotifyApi.getToken(code);

    // recuperar id e link de perfil do usuario
    this.loggedUser = await SpotifyApi.getUser();

    // recuperar playlists do usuario logado
    this.playlists = await SpotifyApi.getPlayLists(this.loggedUser);

    // refresh token

    // loading overlay
    this.isLoading = false;
    //this.doAjax();
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    doAjax() {
      // this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        console.log("Aqui");
      }, 3000);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
};
</script>

<style>
.vl-parent {
  animation: fadeIn 0.5s linear forwards;
}

@keyframes fadeIn {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
