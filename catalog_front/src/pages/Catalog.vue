<template>
  <div class="wrapper">
    <header>
      <h2>Catalogue</h2>
    </header>
    <section>
      <plant-search></plant-search>
      <search-all></search-all>
    </section>
  </div>
</template>

<script>
import PlantSearch from '../components/plants/PlantSearch.vue';
import SearchAll from '../components/catalog/SearchAll.vue';

export default {
  components: {
    PlantSearch,
    SearchAll
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
}

header h2 {
  font-weight: 300;
  font-size: 1.8rem;
  opacity: 0.7;
}
</style>