<template>
  <div class="main-container">
    <base-card class="main-card">
      <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <div class="content" v-if="disease">
        <div class="content-text">
          <header>
            <h2>{{ formattedName }}</h2>
          </header>
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
    </base-card>
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
      error: null
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
      return `${this.$route.path}/edit`;
    }
  },
  methods: {
    async fetchDisease() {
      try {
        await this.$store.dispatch('diseases/fetchDisease', this.id);
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
    this.fetchDisease();
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.main-card {
  width: 650px;
}

header h2 {
  margin-bottom: 1rem;
  font-weight: 300;
  font-size: 2.2rem;
  border-bottom: 1px solid #CCC;
}

.content {
  display: flex;
  justify-content: space-around;
}

.content-text p .underline {
  border-bottom: 1px solid #3A0061;
  font-weight: 600;
}

.content-img {
   margin: 3rem 1rem 1rem 3rem;
}

.edit-btn {
  text-align: right;
}
</style>