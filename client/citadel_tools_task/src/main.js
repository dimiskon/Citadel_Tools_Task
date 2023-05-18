import { createApp } from "vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import App from "./App.vue";
import router from "./router";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.authorization = localStorage.getItem("jwtToken");

const app = createApp(App);

// Global Error Handling when JWT Token expires
// Set jwtToken to empty string ('') and force user to re-login
app.config.errorHandler = (error, vm, info) => {
  if (error.response?.data.status === 403) {
    localStorage.setItem("jwtToken", "");
  }
};

app.use(router).mount("#app");
