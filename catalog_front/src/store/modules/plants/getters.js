export default {
  hasPlants(state) {
    return state.plants && state.plants.length > 0;
  },
  plants(state) {
    return state.plants;
  },
  plant(state) {
    return state.plant;
  },
  sortedPlants(state) {
    const sortedPlants = state.plants.sort((a, b) => {
      if (a.species === b.species) {
        return a.variety > b.variety ? 1 : -1;
      }
      return a.species > b.species ? 1 : -1;
    });
    return sortedPlants;
  }
};