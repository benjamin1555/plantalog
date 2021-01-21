<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section class="search-section">
      <form @submit.prevent="searchPlant">
        <div class="form-control">
          <input type="text" ref="searchPlantInput" id="searchInput" placeholder="Rechercher une espèce">
          <button type="submit"><i class="fas fa-search"></i></button>
        </div>
      </form>
      <base-button mode="outline" link :to="addPlantLink" v-if="isAuthenticated"><i class="fas fa-plus"></i> Ajouter Espèce</base-button>
    </section>
    <plant-search-results :is-loading="isLoading"></plant-search-results>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PlantSearchResults from './PlantSearchResults.vue';

export default {
  components: {
    PlantSearchResults
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapGetters('plants', [
      'searchPartialResultsVisible'
    ]),
    ...mapGetters(['isAuthenticated']),
    addPlantLink() {
      return `${this.$route.path}/add-plant`;
    }
  },
  methods: {
    ...mapActions('plants', [
      'displayPartialResults'
    ]),
    async searchPlant() {
      const searchQuery = this.$refs.searchPlantInput.value.toLowerCase().trim();
      if (!searchQuery) return;
      if (!this.searchPartialResultsVisible) {
        this.displayPartialResults();
      }
      this.isLoading = true;

      try {
        await this.$store.dispatch('plants/fetchPlants', { searchQuery });
        this.isLoading = false;
        this.$refs.searchPlantInput.value = '';
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
}
</script>

<style scoped>
section.search-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

form {
  flex-grow: 2;
  margin-right: 2rem;
}

.form-control {
  display: flex;
  margin: 0.5rem 0;
}

.form-control button {
  border: 0.5px solid #CCC;
  background-color: #FFF;
  padding: 1rem;
}

.form-control button i {
  font-size: 1.2rem;
  color: #3d008d;
  opacity: 0.7;
}

.form-control button:hover,
.form-control button:active,
.form-control button:hover i {
  cursor: pointer;
  border-color: #3d008d;
  opacity: 1;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 0.5rem 1rem;
  border-right: none;
}

input:focus {
  outline: none;
  border-color: #3d008d;
  color: #3d008d;
  border-right: 1px solid #3d008d;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
}

button i.fa-plus {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
</style>