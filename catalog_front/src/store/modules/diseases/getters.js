export default {
  diseases(state) {
    const sortedDiseases = state.diseases.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedDiseases;
  },
  lastAddedDisease(state) {
    return state.lastAddedDisease;
  },
  selectedDiseases(state) {
    return state.selectedDiseases;
  }
};