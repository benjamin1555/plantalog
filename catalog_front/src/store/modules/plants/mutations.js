export default {
  searchPlant(state, payload) {
    state.foundPlants = payload;
  },
  addPlant(state, payload) {
    state.plants.push(payload);
  }
};