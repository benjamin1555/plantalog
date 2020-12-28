<template>
  <div>
    <base-dialog
      :show="detailsVisible"
      :title="formattedName"
      @close="closeDialog">
      <div class="content">
        <div class="content-text">
          <p><span class="underline">Variété :</span> {{ selectedPlant.variety }}</p>
          <p><span class="underline">Type de plantation :</span> {{ selectedPlant.plantationType }}</p>
          <p><span class="underline">Date de plantation :</span> {{ selectedPlant.plantationDate }}</p>
          <p><span class="underline">Dates de récolte :</span> {{ selectedPlant.harvestDate }}</p>
          <p><span class="underline">Interactions bénéfiques :</span> {{ fetchBeneficialInteractions }}</p>
          <p><span class="underline">Interactions néfastes :</span> {{ fetchHarmfulInteractions }}</p>
          <p><span class="underline">Maladies connues :</span> {{ fetchDiseases }}</p>
          <p><span class="underline">Remarques :</span> {{ selectedPlant.notes }}</p>
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
import BaseDialog from '../components/ui/BaseDialog.vue';

export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      id: this.$route.params.id,
      selectedPlant: null,
      detailsVisible: true
    }
  },
  computed: {
    formattedName() {
      const firstLetter = this.selectedPlant.species.substring(0, 1).toUpperCase();
      const restOfWord = this.selectedPlant.species.substring(1);
      return firstLetter + restOfWord;
    },
    fetchBeneficialInteractions() {
      if (!this.selectedPlant.beneficialInteractions || this.selectedPlant.beneficialInteractions.length === 0) return 'néant';
      return this.fetchInteractions(this.selectedPlant.beneficialInteractions);
    },
    fetchHarmfulInteractions() {
      if (!this.selectedPlant.harmfulInteractions || this.selectedPlant.harmfulInteractions.length === 0) return 'néant';
      return this.fetchInteractions(this.selectedPlant.harmfulInteractions);
    },
    fetchDiseases() {
      if (!this.selectedPlant.diseases || this.selectedPlant.diseases.length === 0) return 'néant';
      const diseasesList = this.selectedPlant.diseases.map(id => {
        const disease = this.$store.getters['diseases/diseases'].find(disease => {
          return disease._id === id;
        });
        return disease.name;
      });
      return diseasesList.join(', ');
    },
    regularImageLink() {
      return `http://localhost:3000/images/${this.selectedPlant.imagesUrl.regular}`;
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
    }
  },
  created() {
    this.selectedPlant = this.$store.getters['plants/plants'].find(plant => plant._id === this.id);
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