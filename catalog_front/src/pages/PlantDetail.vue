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
          <p><span class="underline">Maladies connues :</span> {{ selectedPlant.diseases }}</p>
          <p><span class="underline">Remarques :</span> {{ selectedPlant.notes }}</p>
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