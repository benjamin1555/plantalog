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
      <base-spinner v-if="isLoading"></base-spinner>
      <div class="content" v-else>
        <div class="content-text">
          <p><span class="underline">Variété :</span> {{ plant.variety }}</p>
          <p><span class="underline">Type de plantation :</span> {{ plant.plantationType }}</p>
          <p><span class="underline">Dates de plantation :</span> {{ formattedPlantationDate }}</p>
          <p><span class="underline">Dates de récolte :</span> {{ formattedHarvestDate }}</p>
          <p><span class="underline">Interactions bénéfiques :</span> {{ fetchBeneficialInteractions }}</p>
          <p><span class="underline">Interactions néfastes :</span> {{ fetchHarmfulInteractions }}</p>
          <p><span class="underline">Maladies connues :</span> {{ fetchDiseases }}</p>
          <p><span class="underline">Remarques :</span> {{ plant.notes }}</p>
        </div>
        <div class="content-img">
          <img :src="regularImageLink" alt="plant_image">
        </div>
      </div>
      <div class="edit-btn" v-if="isAuthenticated">
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
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('plants', [
      'plant',
      'formattedPlantationDate',
      'formattedHarvestDate'
    ]),
    ...mapGetters('diseases', [
      'diseases'
    ]),
    ...mapGetters(['isAuthenticated']),
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
      return this.plant.diseases.map(disease => disease.name).join(', ');
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
      return interactionType.map(item => {
        return item.variety ? `${item.species} - ${item.variety}` : item.species;
      }).join(',');
    },
    closeDialog() {
      this.detailsVisible = false;
      this.$router.go(-1);
    },
    async fetchPlant() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('plants/fetchPlant', this.id);
        this.isLoading = false;
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

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>