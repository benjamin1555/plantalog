<template>
  <div>
    <base-card v-if="hasSearched">
      <ul v-if="hasFoundPlants">
        <plant-item
          v-for="plant in foundPlants"
          :key="plant._id"
          :id="plant._id"
          :species="plant.species"
          :variety="plant.variety"
        ></plant-item>
      </ul>
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
  props: ['hasSearched'],
  computed: {
    ...mapGetters('plants', [
      'hasFoundPlants',
      'foundPlants'
    ])
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>