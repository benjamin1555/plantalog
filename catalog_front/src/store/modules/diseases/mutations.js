export default {
  setDiseases(state, payload) {
    state.diseases = payload;
  },
  setDisease(state, payload) {
    state.diseases.push(payload);
  },
  setLastAddedDisease(state, payload) {
    state.lastAddedDisease = payload;
  }
};