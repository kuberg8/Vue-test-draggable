import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import VueRouter from "vue-router";

import Index from "./views/Index.vue";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/create-card",
      name: "CreateCard",
      component: () => import("./views/CreateCard.vue"),
    },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
