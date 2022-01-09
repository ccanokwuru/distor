import { createStore } from "vuex";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import "./index.css";

import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/details/details.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/form/form.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/menu-label/menu-label.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";
import "@shoelace-style/shoelace/dist/components/format-date/format-date.js";
import "@shoelace-style/shoelace/dist/components/format-number/format-number.js";
import "@shoelace-style/shoelace/dist/components/relative-time/relative-time.js";
import "@shoelace-style/shoelace/dist/components/include/include.js";
import "@shoelace-style/shoelace/dist/components/animation/animation.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";

import "bootstrap-icons/font/bootstrap-icons.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

import App from "./App.vue";
import routes from "./routes";

const store = createStore({
  state(): object {
    return {
      user: { email: null, name: null },
    };
  },
  mutations: {
    setUser(state: object, { email, name }) {
      // @ts-ignore
      state.user.email = email;
      // @ts-ignore
      state.user.name = name;
      const user = JSON.stringify({ email: email, name: name });
      localStorage.setItem("user", user);
    },
  },
  actions: {
    getUser() {
      const user = localStorage.getItem("user");

      if (!user) return;
      this.commit("setUser", JSON.parse(user));
    },
  },
});

setBasePath("/");

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");
