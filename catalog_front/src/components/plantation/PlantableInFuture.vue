<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-button @click="togglePlantableInFuture" mode="outline"><i :class="plantableInFutureDisplayBtnIcon"></i>{{ plantableInFutureDisplayBtnText }}</base-button>
    <base-card v-if="displayPlantableInFuture">
      <base-spinner v-if="isLoading"></base-spinner>
      <div v-else-if="!isLoading && hasPlantableInFuture">
        <ul>
          <h3>Au-delà des 30 prochains jours, voici ce qu'il sera possible de planter :</h3>
          <plant-item
            v-for="plant in plantableInFuture"
            :key="plant._id"
            :id="plant._id"
            :species="plant.species"
            :variety="plant.variety"
            :imagesUrl="plant.imagesUrl"
          >
            <base-progress-bar
              :can-be-planted-in="plant.canBePlantedIn"
            ></base-progress-bar>
          </plant-item>
        </ul>
      </div>
      <p v-else>Rien à planter dans les prochaines semaines... 🥱 </p>
    </base-card>
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
      displayPlantableInFuture: false,
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('plantations', [
      'plantableInFuture',
      'hasPlantableInFuture'
    ]),
    plantableInFutureDisplayBtnText() {
      return this.displayPlantableInFuture ? 'Masquer' : 'Afficher'
    },
    plantableInFutureDisplayBtnIcon() {
      return this.displayPlantableInFuture ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'
    }
  },
  methods: {
    ...mapActions('plants', {
      fetchAllPlants: 'fetchPlants',
    }),
    ...mapActions('plantations', {
      fetchAllPlantableInFuture: 'fetchPlantableInFuture'
    }),
    togglePlantableInFuture() {
      this.displayPlantableInFuture = !this.displayPlantableInFuture;
      if (this.displayPlantableInFuture) {
        this.fetchPlantableInFuture();
      }
    },
    async fetchPlantableInFuture() {
      this.isLoading = true;

      try {
        await this.fetchAllPlants();
        this.fetchAllPlantableInFuture();
        this.isLoading = false
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

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
}

button i {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
</style>