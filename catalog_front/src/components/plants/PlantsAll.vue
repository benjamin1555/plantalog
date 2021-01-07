<template>
  <div>
    <base-button @click="togglePlantsDisplay" mode="outline"><i :class="plantsDisplayBtnIcon"></i>{{ plantsDisplayBtnText }}</base-button>
    <base-card v-if="displayPlants">
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasPlants">
        <h3>Liste des plantes enregistrées</h3>
        <plant-item
          v-for="plant in sortedPlants"
          :key="plant._id"
          :id="plant._id"
          :species="plant.species"
          :variety="plant.variety"
        ></plant-item>
      </ul>
      <p v-else>Aucune plante pour le moment...</p>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlantItem from './PlantItem';

export default {
  components: {
    PlantItem
  },
  data() {
    return {
      displayPlants: false,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters('plants', [
      'hasPlants',
      'sortedPlants'
    ]),
    plantsDisplayBtnText() {
      return this.displayPlants ? 'Masquer' : 'Afficher Tout'
    },
    plantsDisplayBtnIcon() {
      return this.displayPlants ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'
    }
  },
  methods: {
    async togglePlantsDisplay() {
      this.displayPlants = !this.displayPlants;

      if (this.displayPlants) {
        this.isLoading = true;
        try {
          await this.$store.dispatch('plants/fetchPlants');
          this.isLoading = false
        } catch (err) {
          this.isLoading = false;
          console.log(err);
        }
      }
    }
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

p {
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
