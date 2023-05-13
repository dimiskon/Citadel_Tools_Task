<template>
  <div>
    <Navbar />
    <div id="app" class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/global/Navbar.vue";
</script>
