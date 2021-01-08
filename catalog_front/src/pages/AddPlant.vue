<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog
      v-if="!error"
      :show="formVisible"
      title="Ajouter Une Espèce"
      @close="redirectToCatalog">
      <plant-form></plant-form>
    </base-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PlantForm from '../components/plants/PlantForm.vue';

export default {
  components: {
    PlantForm
  },
  data() {
    return {
      formVisible: false,
      error: null
    };
  },
  methods: {
    ...mapActions('plants', [
      'hideAllSearchResults'
    ]),
    redirectToCatalog() {
      this.formVisible = false;
      this.$router.replace('/catalogue');
    },
    async loadPlantsAndDiseases() {
      try {
        await this.$store.dispatch('plants/fetchPlants', { searchQuery: '&pagination=false' });
        await this.$store.dispatch('diseases/fetchDiseases');
        this.formVisible = true;
      } catch (err) {
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
  },
  created() {
    this.hideAllSearchResults();
    this.loadPlantsAndDiseases();
  }
}
</script>