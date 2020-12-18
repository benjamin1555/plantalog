<template>
  <div>
    <base-dialog
      :show="detailsVisible"
      :title="formattedName"
      @close="closeDialog">
      <div class="content">
        <div class="content-text">
          <p>Variété : {{ selectedPlant.variety }}</p>
          <p>Type de plantation : {{ selectedPlant.plantationType }}</p>
          <p>Dates plantation : {{ selectedPlant.plantationDate }}</p>
          <p>Dates récolte : {{ selectedPlant.harvestDate }}</p>
          <p>Interactions bénéfiques : {{ fetchBeneficialInteractions }}</p>
          <p>Interactions néfastes : {{ fetchHarmfulInteractions }}</p>
          <p>Maladies connues : {{ selectedPlant.diseases }}</p>
          <p>Remarques : {{ selectedPlant.notes }}</p>
        </div>
        <div class="content-img">
          <img src="https://via.placeholder.com/150" alt="plant_image">
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
      if (!this.selectedPlant.beneficialInteractions || this.selectedPlant.beneficialInteractions.length === 0) return;
      return this.fetchInteractions(this.selectedPlant.beneficialInteractions);
    },
    fetchHarmfulInteractions() {
      if (!this.selectedPlant.harmfulInteractions || this.selectedPlant.harmfulInteractions.length === 0) return;
      return this.fetchInteractions(this.selectedPlant.harmfulInteractions);
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

.content-img {
  margin-top: 2rem;
}

.edit-btn {
  text-align: right;
}
</style>