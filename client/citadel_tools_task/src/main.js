import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount("#app");
