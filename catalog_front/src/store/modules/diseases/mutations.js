export default {
  fetchDiseases(state, payload) {
    state.diseases = payload;
  },
  addDisease(state, payload) {
    state.diseases.push(payload);
  },
  setLastAddedDisease(state, payload) {
    state.lastAddedDisease = payload;
  }
};