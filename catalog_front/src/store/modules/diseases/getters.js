export default {
  diseases(state) {
    const sortedDiseases = state.diseases.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedDiseases;
  }
};