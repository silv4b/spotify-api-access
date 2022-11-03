import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './index.css';
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes/index";
import VueMobileDetection from 'vue-mobile-detection';

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
  .use(router)
  .use(VueMobileDetection)
  .mount('#app');
