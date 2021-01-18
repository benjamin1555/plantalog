<template>
  <div class="wrapper">
    <div v-if="isPlantableNow">
      <div class="progress">
        <div class="progress-bar" :class="barColor" role="progressbar" :style="widthStyle" :aria-valuenow="remainingPercentage" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <span v-if="canBePlantedUntil === 0">
        Dernier jour pour planter
      </span>
      <span v-else>
        {{ canBePlantedUntil }} {{ pluralizeCanBePlantedUntil }}
      </span>
    </div>
    <p v-else>À planter dans {{ canBePlantedIn }} {{ pluralizeCanBePlantedIn }}</p>
  </div>
</template>
<script>
export default {
  props: ['isPlantableNow', 'canBePlantedUntil', 'canBePlantedIn'],
  computed: {
    remainingPercentage() {
      return Math.round(100 * this.canBePlantedUntil  / 30);
    },
    pluralizeCanBePlantedUntil() {
      return this.canBePlantedUntil > 1 ? 'jours restants' : 'jour restant';
    },
    pluralizeCanBePlantedIn() {
      return this.canBePlantedIn > 1 ? 'jours' : 'jour';
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