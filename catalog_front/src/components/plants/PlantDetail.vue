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
          <p>
            <span class="underline">Interactions bénéfiques : </span>
            <template v-if="plant.beneficialInteractions.length > 0">
              <span
                v-for="beneficialInteraction in fetchBeneficialInteractions"
                :key="beneficialInteraction.id"
                :id="beneficialInteraction.id"
                :name="beneficialInteraction.name"
              >
                <router-link :to="`/plant-detail/${beneficialInteraction.id}`" target="_blank">
                  <base-button mode="small-regular" class="small-btn">{{ beneficialInteraction.name }}</base-button>
                </router-link>
              </span>
            </template>
            <span v-else>néant</span>
          </p>
          <p>
            <span class="underline">Interactions néfastes : </span>
            <template v-if="plant.harmfulInteractions.length > 0">
              <span
                v-for="harmfulInteraction in fetchHarmfulInteractions"
                :key="harmfulInteraction.id"
                :id="harmfulInteraction.id"
                :name="harmfulInteraction.name"
              >
                <router-link :to="`/plant-detail/${harmfulInteraction.id}`" target="_blank">
                  <base-button mode="small-regular" class="small-btn">{{ harmfulInteraction.name }}</base-button>
                </router-link>
              </span>
            </template>
            <span v-else>néant</span>
          </p>
          <p>
            <span class="underline">Maladies connues : </span>
            <template v-if="plant.diseases.length > 0">
              <span
                v-for="disease in plant.diseases"
                :key="disease._id"
                :id="disease._id"
                :name="disease.name"
              >
                <router-link :to="`/disease-detail/${disease._id}`" target="_blank">
                  <base-button mode="small-regular" class="small-btn">{{ disease.name }}</base-button>
                </router-link>
              </span>
            </template>
            <span v-else>néant</span>
          </p>
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
import BaseDialog from '../../components/ui/BaseDialog.vue';

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
      return this.fetchInteractions(this.plant.beneficialInteractions);
    },
    fetchHarmfulInteractions() {
      return this.fetchInteractions(this.plant.harmfulInteractions);
    },
    regularImageLink() {
      return `http://api.plantalog.fr/images/${this.plant.imagesUrl.regular}`;
    },
    editPlantLink() {
      return `${this.$route.path}/edit`;
    }
  },
  methods: {
    fetchInteractions(interactionType) {
      return interactionType.map(item => {
        const name = item.variety ? `${item.species} - ${item.variety}` : item.species;
        return { name, id: item._id };
      });
    },
    closeDialog() {
      this.detailsVisible = false;
      const currentPage = '/' + this.$route.path.split('/')[1];
      this.$router.replace(currentPage);
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
  max-width: 256px;
}

.edit-btn {
  text-align: right;
}
</style>