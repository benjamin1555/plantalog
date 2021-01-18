export default {
  setPlantableNextMonth(state, payload) {
    state.plantableNextMonth = payload;
  },
  setPlantableInFuture(state, payload) {
    state.plantableInFuture = payload;
  }
};