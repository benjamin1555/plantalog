export default {
  plantableNextMonth(state) {
    const plantableNow = filterAndSortPlantableNow(state.plantableNextMonth);
    const notPlantableNow = filterAndSortNotPlantableNow(state.plantableNextMonth);
    return [...plantableNow, ...notPlantableNow];
  },
  hasPlantableNextMonth(state) {
    return state.plantableNextMonth.length > 0;
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