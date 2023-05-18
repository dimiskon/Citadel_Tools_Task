<template>
  <nav
    data-bs-theme="dark"
    class="navbar navbar-expand-lg sticky-top bg-body-tertiary"
    style="margin-bottom: 2rem"
  >
    <div class="container-fluid m-1">
      <a
        href="/teams"
        class="navbar-brand"
        style="color: aliceblue; font-size: 1.6rem"
      >
        User Teams
      </a>
      <button
        class="btn btn-danger"
        style="color: aliceblue; font-size: 1.2rem"
        @click="logout"
      >
        Log Out
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.setItem("jwtToken", "");
  router.push("/login");
};
</script>
