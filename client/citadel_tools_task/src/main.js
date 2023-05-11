import { createApp } from "vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import App from "./App.vue";
import router from "./router";

axios.defaults.baseURL = "http://localhost:5000";

createApp(App).use(router).mount("#app");
