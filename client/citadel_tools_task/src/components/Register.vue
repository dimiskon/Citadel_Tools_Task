<template>
  <div class="card">
    <h2 class="card-header">Register</h2>
    <div class="card-body">
      <div class="card-text">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="username" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirm_password" required />
          </div>
          <div class="text-center">
            <img alt="qrCode" class="img-thumbnail" :src="qrCode" />
          </div>
          <div class="mb-3">
            <label class="form-label">2FA</label>
            <input class="form-control" type="number" v-model="token" required />
          </div>
          <div class="d-grid gap-2 d-flex justify-content-center">
            <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">
              Register
            </button>
          </div>
          <div class="text-center mt-3">
            <router-link to="/login">Login</router-link>
          </div>
        </form>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const username = ref("");
const password = ref("");
const confirm_password = ref("");
const qrCode = ref("");
const JWT = ref("");
const token = ref("");
const message = ref("");

onMounted(async () => {
  const { data } = await axios.get("/generateQRCode");
  console.log({ data });
  qrCode.value = data.QRCodeURL;
  JWT.value = data.secret;
});

const register = async () => {
  //   try {
  //     const response = await axios.post('/api/register', {
  //       username: username.value,
  //       password: password.value,
  //       token: token.value,
  //       JWT: JWT.value,
  //     })
  //     console.log(response.data)
  //     message.value = response.data.message
  //   } catch (error) {
  //     console.error(error)
  //     message.value = 'An error occurred while registering.'
  //   }
};
</script>
