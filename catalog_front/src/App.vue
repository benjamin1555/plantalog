<template>
  <div>
    <the-header></the-header>
    <div class="container">
      <the-menu></the-menu>
      <router-view class="main-content"></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMenu from './components/layout/TheMenu.vue';

export default {
  components: {
    TheHeader,
    TheMenu
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.container {
  display: flex;
}
</style>
