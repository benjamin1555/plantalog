import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      plant: null,
      plants: [],
      selectedBeneficialInteractions: [],
      selectedHarmfulInteractions: [],
      searchQuery: '',
      paginationData: null,
      searchPartialResultsVisible: false,
      searchAllResultsVisible: false
    };
  },
  mutations,
  actions,
  getters
};