<template>
  <div>
    <base-card v-if="searchPartialResultsVisible">
      <h3>Résultats</h3>
      <base-spinner v-if="isLoading"></base-spinner>
      <template v-else-if="!isLoading && hasPlants">
        <ul>
          <plant-item
            v-for="plant in plants"
            :key="plant._id"
            :id="plant._id"
            :species="plant.species"
            :variety="plant.variety"
          ></plant-item>
        </ul>
        <base-pagination></base-pagination>
      </template>
      <p v-else>Pas de résultat...</p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlantItem from './PlantItem.vue';

export default {
  components: {
    PlantItem
  },
  props: ['isLoading'],
  computed: {
    ...mapGetters('plants', [
      'hasPlants',
      'plants',
      'searchPartialResultsVisible'
    ])
  }
};
</script>

<style scoped>
h3 {
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 300;
  border-bottom: 1.5px solid #CCC;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li:last-child {
  border-bottom: none!important;
}
</style>