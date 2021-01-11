<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <select @change="onChange($event)">
      <option value="" selected>-- Ajoutez une maladie --</option>
      <option
        v-for="disease in diseases"
        :key="disease._id"
        :value="disease._id"
      >{{ disease.name }}</option>
    </select>
    <div class="added-diseases" v-if="hasSelectedValues">
      <base-label
        v-for="disease in formattedSelectedDiseases"
        :key="disease._id"
        :disease-id="disease._id"
        @remove-attribute="removeDisease"
      >{{ disease.name }}</base-label>
    </div>
    <p class="small-para" v-else>Aucune maladie selectionnée.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseLabel from '../ui/BaseLabel.vue';

export default {
  components: {
    BaseLabel
  },
  data() {
    return {
      error: null
    };
  },
  computed: {
    ...mapGetters('diseases',  [
      'diseases',
      'lastAddedDisease',
      'selectedDiseases'
    ]),
    formattedSelectedDiseases() {
      const formattedDiseases = this.selectedDiseases.map(diseaseId => {
        const foundItem = this.diseases.find(d => d._id === diseaseId);
        return {
          _id: foundItem._id,
          name: foundItem.name
        }
      });
      return formattedDiseases;
    },
    hasSelectedValues() {
      return this.selectedDiseases.length > 0;
    }
  },
  methods: {
    ...mapActions('diseases', [
      'fetchDiseases',
      'clearSelectedDiseases',
      'addSelectedDisease',
      'removeSelectedDisease'
    ]),
    initializeInteractionsValues() {
      if (this.knownInteractions && this.knownInteractions.length > 0) {
        this.selectedValues = this.knownInteractions.map(({ _id }) => _id);
      }
    },
    onChange(event) {
      const inputValue = event.target.value;
      this.addSelectedDisease({ _id: inputValue });
    },
    removeDisease(diseaseToRemoveId) {
      this.removeSelectedDisease({ _id: diseaseToRemoveId });
    },
    async loadDiseases() {
      this.clearSelectedDiseases();

      try {
        await this.fetchDiseases()
        this.initializeInteractionsValues();
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
    }
  },
  created() {
    this.loadDiseases();
  }
};
</script>

<style scoped>
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

.added-diseases {
  margin-top: 0.5rem;
}

.small-para {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-style: italic;
}
</style>