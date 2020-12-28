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
      <plant-form @save-data="addPlant"></plant-form>
    </base-dialog>
  </div>
</template>

<script>
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
    redirectToCatalog() {
      this.formVisible = false;
      this.$router.replace('/catalogue');
    },
    addPlant(data) {
      this.$store.dispatch('plants/addPlant', data);
      this.$router.replace('/catalogue');
    },
    async loadPlantsAndDiseases() {
      try {
        await this.$store.dispatch('plants/fetchPlants');
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
    this.loadPlantsAndDiseases();
  }
}
</script>