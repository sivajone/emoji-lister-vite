// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import router from "./router/router.js";
import quasarIconSet from "quasar/icon-set/material-icons-round";
import axios from "axios";
import VueAxios from "vue-axios";
import "animate.css";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
// ..required because of selected iconSet:
import "@quasar/extras/material-icons-round/material-icons-round.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

// Assumes you have a <div id="app"></div> in your index.html
const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
  config: {},
});
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.use(router);
app.mount("#app");
