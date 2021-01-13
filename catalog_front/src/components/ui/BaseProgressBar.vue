<template>
  <div class="wrapper">
    <div v-if="isPlantableNow">
      <div class="progress">
        <div class="progress-bar" :class="barColor" role="progressbar" :style="widthStyle" :aria-valuenow="remainingPercentage" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      {{ canBePlantedUntil }} jours restants
    </div>
    <p v-else>A planter dans {{ canBePlantedIn }} jours</p>
  </div>
</template>

<script>
export default {
  props: ['isPlantableNow', 'canBePlantedUntil', 'canBePlantedIn'],
  computed: {
    remainingPercentage() {
      return Math.round(100 * this.canBePlantedUntil  / 30);
    },
    barColor() {
      let color;
      if (this.remainingPercentage >= 50) {
        color = 'success';
      }
      else if (this.remainingPercentage < 50 && this.remainingPercentage >= 25) {
        color = 'warning';
      }
      else {
        color = 'danger';
      }
      return `bg-${color}`;
    },
    widthStyle() {
      return { width: `${this.remainingPercentage}%` }
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 300px;
}

.wrapper p {
  margin: auto 0;
  /* text-align: center; */
}

.progress {
  height: 25px;
}
</style>