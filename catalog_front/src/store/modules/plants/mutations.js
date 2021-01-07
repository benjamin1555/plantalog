export default {
  setPlants(state, payload) {
    state.plants = payload;
  },
  setPlant(state, payload) {
    state.plant = payload;
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