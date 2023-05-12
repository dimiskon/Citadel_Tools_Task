<template>
  <div class="card">
    <h2 class="card-header">Login</h2>
    <div class="card-body">
      <div class="card-text">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="username" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <div class="mb-3">
            <label class="form-label">2FA</label>
            <input class="form-control" type="number" v-model="token" required />
          </div>
          <div class="d-grid mt-3 justify-content-center">
            <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">Login</button>
          </div>
        </form>
        <div class="text-center mt-3">
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const token = ref("");
const login = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ username: username.value, password: password.value })
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
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
