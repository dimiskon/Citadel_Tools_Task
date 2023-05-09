<template>
  <div id="app" class="container">
    <router-view></router-view>
    <br />
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
</template>

<style>
.container {
  max-width: 500px;
}
</style>
