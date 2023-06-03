import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import VueToastr from "vue-toastr";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue, VueToastr);

Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
