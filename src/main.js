import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { GraphQLClient } from "graphql-request";

//firebase imports
import { auth } from "./firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const graphcmsClient = new GraphQLClient(
  "https://api-eu-central-1.graphcms.com/v2/cl1ujnwlbb6e001xj9oog3qbe/master"
);
import * as apolloProvider from "./apollo.provider";

import "./css/index.css";
import VueFeather from "vue-feather";

//Arco library imports
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import Markdown from "vue3-markdown-it";

import "./css/global.css";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(apolloProvider.provider);
    app.use(ArcoVue);
    app.use(ArcoVueIcon);
    app.component(VueFeather.name, VueFeather);
    app.use(Markdown);
    app.use(router);
    app.use(pinia);

    app.mount("#app");
  }
});
