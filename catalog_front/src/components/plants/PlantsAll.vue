<template>
  <div>
    <base-button @click="togglePlantsDisplay" mode="outline"><i class="fas fa-angle-double-down"></i>Afficher Tout</base-button>
    <base-card v-if="displayPlants">
      <p>Nothing to show right now...</p>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayPlants: false
    };
  },
  methods: {
    togglePlantsDisplay() {
      this.displayPlants = !this.displayPlants;
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 1.5rem;
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
