<template>
  <div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else-if="!isLoading && hasPlantableNextMonth">
      <p>{{ username }}, voici ce qu'il est possible de planter dans les 30 prochains jours :</p>
      <ul>
        <plant-item
          v-for="plant in plantableNextMonth"
          :key="plant._id"
          :id="plant._id"
          :species="plant.species"
          :variety="plant.variety"
          :imagesUrl='plant.imagesUrl'
        >
          <base-progress-bar
            :is-plantable-now="plant.isPlantableNow"
            :can-be-planted-until="plant.canBePlantedUntil"
            :can-be-planted-in="plant.canBePlantedIn"
          ></base-progress-bar>
        </plant-item>
      </ul>
      <router-view></router-view>
    </div>
    <p v-else>Rien à planter dans les 30 prochains jours... 🥱 </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import PlantItem from '../plants/PlantItem.vue';

export default {
  components: {
    PlantItem
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(['username']),
    ...mapGetters('plantations', [
      'plantableNextMonth',
      'hasPlantableNextMonth'
    ])
  },
  methods: {
    ...mapActions('plants', {
      fetchAllPlants: 'fetchPlants',
    }),
    ...mapActions('plantations', [
      'fetchPlantableNextMonth'
    ]),
    async fetchPlants() {
      this.isLoading = true;

      try {
        await this.fetchAllPlants();
        this.fetchPlantableNextMonth();
        this.isLoading = false
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    }
  },
  created() {
    this.fetchPlants();
  }
};
</script>

<style scoped>

</style>