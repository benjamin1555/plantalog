<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>
      <template v-else-if="!isLoading && hasDiseases">
        <ul>
          <h3>Liste des maladies enregistrées</h3>
          <disease-item
            v-for="disease in diseases"
            :key="disease._id"
            :id="disease._id"
            :name="disease.name"
            :imagesUrl="disease.imagesUrl"
          ></disease-item>
        </ul>
        <base-pagination></base-pagination>
      </template>
      <p class="light-gray" v-else>Aucune maladie pour le moment...</p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DiseaseItem from './DiseaseItem.vue';

export default {
  components: {
    DiseaseItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('diseases', [
      'hasDiseases',
      'diseases'
    ])
  },
  methods: {
    ...mapActions('diseases', {
      fetchAllDiseases: 'fetchDiseases'
    }),
    async fetchDiseases() {
      this.isLoading = true;
      try {
        await this.fetchAllDiseases();
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
  },
  created() {
    this.fetchDiseases()
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
