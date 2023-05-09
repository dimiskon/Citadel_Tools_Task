<template>
  <div>
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
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
