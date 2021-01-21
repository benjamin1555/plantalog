export default {
  setDiseases(state, payload) {
    state.diseases = payload;
  },
  setDisease(state, payload) {
    state.disease = payload;
  },
  setLastAddedDisease(state, payload) {
    state.lastAddedDisease = payload;
  },
  clearLastAddedDisease(state) {
    state.lastAddedDisease = null;
  },
  clearSelectedDiseases(state) {
    state.selectedDiseases = [];
  },
  addSelectedDisease(state, { _id }) {
    if (!state.selectedDiseases.includes(_id)) {
      state.selectedDiseases.push(_id);
    }
  },
  removeSelectedDisease(state, { _id }) {
    const diseaseIndex = state.selectedDiseases.findIndex(itemId => itemId === _id);
    state.selectedDiseases.splice(diseaseIndex, 1);
  }
};