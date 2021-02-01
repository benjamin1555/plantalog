<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else-if="!isLoading && hasPlantableNextMonth">
      <base-card>
        <ul>
          <h3>Pour les 30 prochains jours, voici ce qu'il est possible de planter dès aujourd'hui :</h3>
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
      </base-card>

    </div>
    <p v-else-if="!error && !hasPlantableNextMonth">Rien à planter dans les 30 prochains jours... 🥱 </p>
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
      isLoading: false,
      error: null
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
        await this.fetchPlantableNextMonth();
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        if (err.message === 'Failed to fetch') {
          this.error = 'Impossible de se connecter au serveur. Merci de vérifier votre connexion.';
        } else {
          this.error = err.message || 'Une erreur vient de produire. Merci de réessayer.';
        }
      }
    },
    handleError() {
      this.error = null;
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