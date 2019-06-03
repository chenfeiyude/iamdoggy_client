import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from "./js/http"
import store from "./js/store"
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import VeeValidate from 'vee-validate';

Vue.use(PaperDashboard);
Vue.prototype.axios = axios;
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount("#app");
