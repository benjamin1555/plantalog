<template>
  <div class="wrapper">
    <header>
      <h2>Planter</h2>
      <p>{{ getTodayDate }}</p>
    </header>
    <plantable-now></plantable-now>

    <header>
      <h2>À Venir</h2>
    </header>
    <plantable-in-future></plantable-in-future>
  </div>
</template>

<script>
import moment from 'moment';

import PlantableNow from '../components/plantation/PlantableNow.vue';
import PlantableInFuture from '../components/plantation/PlantableInFuture.vue';

export default {
  components: {
    PlantableNow,
    PlantableInFuture
  },
  computed: {
    getTodayDate() {
      return moment().format('D/M/Y')
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding: 1rem 2rem;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #CCC;
  opacity: 0.7;
}

header h2 {
  font-weight: 300;
  font-size: 1.8rem;
}

header p {
  padding-right: 1rem;
}
</style>