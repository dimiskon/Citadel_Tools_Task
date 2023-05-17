<template>
  <div class="container-sm mt-5" style="max-width: 500px">
    <div class="card">
      <h2 class="card-header">Login</h2>
      <div class="card-body">
        <div
          v-if="componentData.errorMessage"
          role="alertdialog"
          class="alert alert-danger my-2"
          style="font-size: larger; color: brown"
        >
          {{ componentData.errorMessage }}
        </div>
        <div class="card-text">
          <form @submit.prevent="login" autocomplete="off">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="componentData.username" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="componentData.password"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">2FA</label>
              <input class="form-control" type="text" v-model="componentData.token" required />
            </div>
            <div class="d-grid mt-2 justify-content-center">
              <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">Login</button>
            </div>
          </form>
          <div class="text-center mt-2">
            <router-link to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "vue-router";
const router = useRouter();

const componentData = reactive({
  username: "",
  password: "",
  token: "",
  errorMessage: ""
});

const login = async () => {
  try {
    const payload = _.omit(componentData, "errorMessage");
    const { data: JWT } = await axios.post("/login", payload);
  } catch (error) {
    const AxiosError = error.name === "AxiosError" ? error.response.data.message : "";
    componentData.errorMessage = AxiosError
      ? AxiosError
      : `An error occurred while login user '${componentData.username}'`;
  }
};
</script>

<style>
.container-sm {
  max-width: 400px;
}
.card-header {
  background-color: rgba(97, 67, 169, 1);
  color: white;
}
.form-label {
  font-size: 1.3rem;
  font-weight: 450;
}
</style>
