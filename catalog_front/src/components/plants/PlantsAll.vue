<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-button @click="fetchPlants" mode="outline"><i :class="plantsDisplayBtnIcon"></i>{{ plantsDisplayBtnText }}</base-button>
    <base-card v-if="searchAllResultsVisible">
      <base-spinner v-if="isLoading"></base-spinner>
      <template v-else-if="!isLoading && hasPlants">
        <ul>
          <h3>Liste des plantes enregistrées</h3>
          <plant-item
            v-for="plant in plants"
            :key="plant._id"
            :id="plant._id"
            :species="plant.species"
            :variety="plant.variety"
            :imagesUrl="plant.imagesUrl"
          ></plant-item>
        </ul>
        <base-pagination></base-pagination>
      </template>
      <p class="light-gray" v-else>Aucune plante pour le moment...</p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PlantItem from './PlantItem';

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
    ...mapGetters('plants', [
      'hasPlants',
      'plants',
      'searchAllResultsVisible'
    ]),
    plantsDisplayBtnText() {
      return this.searchAllResultsVisible ? 'Masquer' : 'Afficher Tout'
    },
    plantsDisplayBtnIcon() {
      return this.searchAllResultsVisible ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'
    }
  },
  methods: {
    ...mapActions('plants', {
      fetchAllPlants: 'fetchPlants',
      displayAllResults: 'displayAllResults'
    }),
    async fetchPlants() {
      this.displayAllResults();

      this.isLoading = true;
      try {
        await this.fetchAllPlants();
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
      this.redirectToCatalog();
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 1.5rem;
}

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

p.light-gray {
  color: rgb(153, 153, 153)
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
