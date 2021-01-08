import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      plant: null,
      plants: [],
      searchQuery: '',
      paginationData: null
    };
  },
  mutations,
  actions,
  getters
};