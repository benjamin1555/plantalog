export default {
  hasDiseases(state) {
    return state.diseases.length > 0;
  },
  diseases(state) {
    const sortedDiseases = state.diseases.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedDiseases;
  },
  disease(state) {
    return state.disease;
  },
  lastAddedDisease(state) {
    return state.lastAddedDisease;
  },
  selectedDiseases(state) {
    return state.selectedDiseases;
  }
};