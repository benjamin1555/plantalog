<template>
  <div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else-if="!isLoading && hasPlantableNextMonth">
      <base-card>
        <ul>
          <h3>Pour les 30 prochains jours, voici ce qu'il est possible de planter maintenant :</h3>
          <plant-item
            v-for="plant in plantableNextMonthNow"
            :key="plant._id"
            :id="plant._id"
            :species="plant.species"
            :variety="plant.variety"
            :imagesUrl='plant.imagesUrl'
          >
            <base-progress-bar
              :is-plantable-now="plant.isPlantableNow"
              :can-be-planted-until="plant.canBePlantedUntil"
            ></base-progress-bar>
          </plant-item>
        </ul>
        <router-view></router-view>
      </base-card>

      <base-card>
        <ul>
          <h3>Pour les 30 prochains jours, voici ce qu'il sera possible de planter :</h3>
          <plant-item
            v-for="plant in plantableNextMonthFuture"
            :key="plant._id"
            :id="plant._id"
            :species="plant.species"
            :variety="plant.variety"
            :imagesUrl='plant.imagesUrl'
          >
            <base-progress-bar
              :can-be-planted-in="plant.canBePlantedIn"
            ></base-progress-bar>
          </plant-item>
        </ul>
        <router-view></router-view>
      </base-card>

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
    ...mapGetters('plantations', [
      'plantableNextMonthNow',
      'plantableNextMonthFuture',
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
h3 {
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 300;
  border-bottom: 1.5px solid #CCC;
}

</style>