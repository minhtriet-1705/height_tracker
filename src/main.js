import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEJESO1IwgSfF4MdVhLr4B0Z87sb8Ms_o",
  authDomain: "height-tracker.firebaseapp.com",
  projectId: "height-tracker",
  storageBucket: "height-tracker.appspot.com",
  messagingSenderId: "904000094161",
  appId: "1:904000094161:web:af72eaade2a72570b2eaf0",
  databaseURL: "https://height-tracker-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  db,
  render: (h) => h(App),
}).$mount("#app");
