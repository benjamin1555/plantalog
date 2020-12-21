export default {
  fetchPlants(state, payload) {
    state.plants = payload;
  },
  searchPlant(state, payload) {
    state.foundPlants = payload;
  },
  addPlant(state, payload) {
    state.plants.push(payload);
  },
  editPlant(state, payload) {
    state.plants = payload;
  }
};