<template>
  <div class="container">
    <div class="container-head">
      <h2>Login</h2>
    </div>
    <div class="container-body">
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <br />
        <div>
          <label>2FA:</label>
          <input type="number" v-model="_2fa" required />
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const _2fa = ref("");
const login = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email: email.value, password: password.value })
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
</style>
