<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog
      v-if="plant"
      :show="detailsVisible"
      :title="formattedName"
      @close="closeDialog">
      <div class="content">
        <div class="content-text">
          <p><span class="underline">Variété :</span> {{ plant.variety }}</p>
          <p><span class="underline">Type de plantation :</span> {{ plant.plantationType }}</p>
          <p><span class="underline">Date de plantation :</span> {{ plant.plantationDate }}</p>
          <p><span class="underline">Dates de récolte :</span> {{ plant.harvestDate }}</p>
          <p><span class="underline">Interactions bénéfiques :</span> {{ fetchBeneficialInteractions }}</p>
          <p><span class="underline">Interactions néfastes :</span> {{ fetchHarmfulInteractions }}</p>
          <p><span class="underline">Maladies connues :</span> {{ fetchDiseases }}</p>
          <p><span class="underline">Remarques :</span> {{ plant.notes }}</p>
        </div>
        <div class="content-img">
          <img :src="regularImageLink" alt="plant_image">
        </div>
      </div>
      <div class="edit-btn">
        <router-link :to="editPlantLink"><base-button>Éditer</base-button></router-link>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseDialog from '../components/ui/BaseDialog.vue';

export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      id: this.$route.params.id,
      detailsVisible: true,
      error: null
    }
  },
  computed: {
    ...mapGetters('plants', [
      'plant'
    ]),
    ...mapGetters('diseases', [
      'diseases'
    ]),
    formattedName() {
      const firstLetter = this.plant.species.substring(0, 1).toUpperCase();
      const restOfWord = this.plant.species.substring(1);
      return firstLetter + restOfWord;
    },
    fetchBeneficialInteractions() {
      if (!this.plant.beneficialInteractions || this.plant.beneficialInteractions.length === 0) return 'néant';
      return this.fetchInteractions(this.plant.beneficialInteractions);
    },
    fetchHarmfulInteractions() {
      if (!this.plant.harmfulInteractions || this.plant.harmfulInteractions.length === 0) return 'néant';
      return this.fetchInteractions(this.plant.harmfulInteractions);
    },
    fetchDiseases() {
      if (!this.plant.diseases || this.plant.diseases.length === 0) return 'néant';
      const diseasesList = this.plant.diseases.map(id => {
        const disease = this.diseases.find(disease => {
          return disease._id === id;
        });
        return disease.name;
      });
      return diseasesList.join(', ');
    },
    regularImageLink() {
      return `http://localhost:3000/images/${this.plant.imagesUrl.regular}`;
    },
    editPlantLink() {
      return `${this.$route.path}/editer`;
    }
  },
  methods: {
    fetchInteractions(interactionType) {
      const interactionsList = interactionType.map(id => {
        const interaction = this.$store.getters['plants/plants'].find(plant => {
          return plant._id === id;
        });
        return interaction.variety ? `${interaction.species} - ${interaction.variety}` : interaction.species;
      });
      return interactionsList.join(', ');
    },
    closeDialog() {
      this.detailsVisible = false;
      this.$router.replace('/catalogue');
    },
    async fetchPlant() {
      try {
        await this.$store.dispatch('plants/fetchPlant', this.id);
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
    this.fetchPlant();
  }
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-around;
}

.content-text {
  max-width: 350px;
}

.content-text p .underline {
  border-bottom: 1px solid #3A0061;
  font-weight: 600;
}

.content-img {
  margin-top: 2rem;
}

.edit-btn {
  text-align: right;
}
</style>