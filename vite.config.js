import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://github.com/ElMassimo/vite-plugin-environment
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // as variáveis de ambiente listadas aqui estão expostas para uso normal.
    // porém, agora é possível usar o método convencional process.env, aliado ao import.meta.env do vite
    EnvironmentPlugin([
      'VITE_CLIENT_ID',
      'VITE_CLIENT_SECRET',
      'VITE_URL_AUTHORIZE',
      'VITE_URL_TOKEN',
      'VITE_REDIRECT_URI_PLAYLISTS'
    ]),
  ]
});
