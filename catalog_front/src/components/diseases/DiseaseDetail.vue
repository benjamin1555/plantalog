<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog
      v-if="disease"
      :show="detailsVisible"
      :title="formattedName"
      @close="closeDialog">
      <base-spinner v-if="isLoading"></base-spinner>
      <div class="content" v-else>
        <div class="content-text">
          <p><span class="underline">Nom :</span> {{ disease.name }}</p>
          <p><span class="underline">Symptômes :</span> {{ disease.symptoms }}</p>
          <p><span class="underline">Traitement :</span> {{ disease.treatment }}</p>
        </div>
        <div class="content-img">
          <img :src="regularImageLink" alt="disease_image">
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
    ...mapGetters('diseases', [
      'disease'
    ]),
    ...mapGetters(['isAuthenticated']),
    formattedName() {
      const firstLetter = this.disease.name.substring(0, 1).toUpperCase();
      const restOfWord = this.disease.name.substring(1);
      return firstLetter + restOfWord;
    },
    regularImageLink() {
      return `http://localhost:3000/images/${this.disease.imagesUrl.regular}`;
    },
    editPlantLink() {
      return `${this.$route.path}/editer`;
    }
  },
  methods: {
    closeDialog() {
      this.detailsVisible = false;
      const currentPage = '/' + this.$route.path.split('/')[1];
      this.$router.replace(currentPage);
    },
    async fetchDisease() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('diseases/fetchDisease', this.id);
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
    this.fetchDisease();
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