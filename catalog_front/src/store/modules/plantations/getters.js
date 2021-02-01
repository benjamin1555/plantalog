export default {
  plantableNextMonthNow(state) {
    return state.plantableNextMonth.filter(plant => plant.isPlantableNow)
      .sort((a, b) => a.canBePlantedUntil - b.canBePlantedUntil);
  },
  plantableNextMonthFuture(state) {
    return state.plantableNextMonth.filter(plant => !plant.isPlantableNow)
      .sort((a, b) => a.canBePlantedIn - b.canBePlantedIn);
  },
  hasPlantableNextMonth(state) {
    return state.plantableNextMonth.length > 0;
  },
  plantableInFuture(state) {
    return state.plantableInFuture;
  },
  hasPlantableInFuture(state) {
    return state.plantableInFuture.length > 0;
  }
};