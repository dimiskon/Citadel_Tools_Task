<template>
  <div class="container-sm" style="max-width: 500px">
    <div class="card">
      <h2 class="card-header">Register</h2>
      <div class="card-body">
        <div
          v-if="errorMessage"
          role="alertdialog"
          class="alert alert-danger my-2"
          style="font-size: larger; color: brown"
        >
          {{ errorMessage }}
        </div>
        <div class="card-text">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" v-model="confirmPassword" />
            </div>
            <div class="text-center">
              <img alt="qrCode" class="img-thumbnail" :src="qrCode" />
            </div>
            <div class="mb-3">
              <label class="form-label">2FA</label>
              <input class="form-control" type="number" v-model="token" />
            </div>
            <div class="d-grid gap-2 d-flex justify-content-center">
              <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">
                Register
              </button>
            </div>
            <div class="text-center mt-2">
              <router-link to="/login">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const qrCode = ref("");
const JWT = ref("");
const token = ref("");
const errorMessage = ref("");

onMounted(async () => {
  const { data } = await axios.get("/generateQRCode");
  console.log({ data });
  qrCode.value = data.qrCodeURL;
  JWT.value = data.secret;
});

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords don't match!";
    return;
  }
  console.log("Sumbit Register Button!");

  //   try {
  //     const response = await axios.post('/api/register', {
  //       username: username.value,
  //       password: password.value,
  //       token: token.value,
  //       JWT: JWT.value,
  //     })
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error)
  //     errorMessage.value = 'An error occurred while registering.'
  //   }
};
</script>
