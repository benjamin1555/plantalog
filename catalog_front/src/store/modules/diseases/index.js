import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      disease: null,
      diseases: [],
      lastAddedDisease: null,
      selectedDiseases: []
    };
  },
  mutations,
  actions,
  getters
};