<template>
  <h2>Suas Playlists</h2>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: import.meta.env.VITE_URL_TOKEN,
    };
  },
  mounted() {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    let params = new URLSearchParams(document.location.search);
    let code = params.get("code");

    let body = {
      grant_type: "authorization_code",
      code /* como o atributo tem mesmo nome, a cosinhsa agem como se nada tivesse acontedifo */,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    };

    console.table(body);

    // request post
    axios({
      method: "POST",
      url: import.meta.env.VITE_URL_TOKEN,
      data: new URLSearchParams(Object.entries(body)).toString(),
      headers: {
        Authorization: `Basic ${btoa(clientID + ":" + clientSecret)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
};
</script>

<style></style>
