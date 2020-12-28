<template>
  <div class="wrapper">
    <header>
      <h2>Planter</h2>
      <p>{{ getTodayDate }}</p>
    </header>
    <p>{{ username }}, voici l'état actuel de ce que vous avez planté :</p>
    <base-flash></base-flash>
  </div>
</template>

<script>
export default {
  computed: {
    getTodayDate() {
      return new Date().toLocaleDateString();
    },
    username() {
      return this.$store.getters.username;
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding: 1rem 2rem;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h2 {
  font-weight: 300;
  font-size: 1.8rem;
}

header p {
  padding-right: 1rem;
}
</style>