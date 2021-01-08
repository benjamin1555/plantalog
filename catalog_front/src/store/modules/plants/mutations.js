export default {
  setSearchQuery(state, { cleanedSearchQuery }) {
    state.searchQuery = cleanedSearchQuery;
  },
  setPlants(state, payload) {
    state.plants = payload;
  },
  setPlant(state, payload) {
    state.plant = payload;
  },
  setPaginationData(state, payload) {
    state.paginationData = {
      currentPage: payload.currentPage,
      hasNextPage: payload.hasNextPage,
      hasPreviousPage: payload.hasPreviousPage,
      lastPage: payload.lastPage,
      nextPage: payload.nextPage,
      previousPage: payload.previousPage,
      totalItems: payload.totalItems
    };
  },
  searchPlant(state, payload) {
    state.foundPlants = payload;
  },
  addPlant(state, payload) {
    state.plants.push(payload);
  },
  editPlant(state, payload) {
    state.plants = payload;
  },
  toggleSearchAllResults(state) {
    state.searchAllResultsVisible = !state.searchAllResultsVisible;
  },
  toggleSearchPartialResults(state) {
    state.searchPartialResultsVisible = !state.searchPartialResultsVisible;
  }
};