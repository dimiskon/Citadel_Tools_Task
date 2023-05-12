<template>
  <div>
    <nav
      class="navbar navbar-expand-lg sticky-top bg-body-tertiary"
      style="margin-bottom: 2rem; background-color: rgba(40, 40, 40, 1)"
    >
      <div class="container-fluid">
        <a href="#" class="navbar-brand" style="color: aliceblue; font-size: 1.4rem"
          >Citadel Task</a
        >
      </div>
    </nav>
    <div id="app" class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 500px;
}
</style>
