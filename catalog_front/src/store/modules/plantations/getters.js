export default {
  plantableNextMonthNow(state) {
    return filterAndSortPlantableNow(state.plantableNextMonth);
  },
  plantableNextMonthFuture(state) {
    return filterAndSortNotPlantableNow(state.plantableNextMonth);
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

// Private

function filterAndSortPlantableNow(plants) {
  return plants.filter(plant => plant.isPlantableNow)
    .sort((a, b) => a.canBePlantedUntil - b.canBePlantedUntil);
}

function filterAndSortNotPlantableNow(plants) {
  return plants.filter(plant => !plant.isPlantableNow)
    .sort((a, b) => a.canBePlantedIn - b.canBePlantedIn);
}