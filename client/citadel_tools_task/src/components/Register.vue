<template>
  <div class="card">
    <h2 class="card-header">Registration</h2>
    <div class="card-body">
      <div class="card-text">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirm_password" required />
          </div>
          // @see: Need to add QrCode from BE
          <img alt="qrCode" :src="qrCode" />
          <div class="mb-3">
            <label class="form-label">2FA</label>
            <input class="form-control" type="number" v-model="_2fa" required />
          </div>
          <div class="d-grid gap-2 d-flex justify-content-center">
            <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">
              Register
            </button>
          </div>
        </form>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { ref } from "vue";

const email = ref("");
const password = ref("");
const confirm_password = ref("");
const qrCode = ref("");
const _2fa = ref("");
const message = ref("");

const register = async () => {
  //   try {
  //     const response = await axios.post('/api/register', {
  //       name: name.value,
  //       email: email.value,
  //       password: password.value
  //     })
  //     console.log(response.data)
  //     message.value = response.data.message
  //   } catch (error) {
  //     console.error(error)
  //     message.value = 'An error occurred while registering.'
  //   }
};
</script>
