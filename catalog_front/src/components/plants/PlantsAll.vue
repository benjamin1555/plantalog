<template>
  <div>
    <base-button @click="togglePlantsDisplay" mode="outline"><i :class="plantsDisplayBtnIcon"></i>{{ plantsDisplayBtnText }}</base-button>
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
  computed: {
    plantsDisplayBtnText() {
      return this.displayPlants ? 'Masquer' : 'Afficher Tout'
    },
    plantsDisplayBtnIcon() {
      return this.displayPlants ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'
    }
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
