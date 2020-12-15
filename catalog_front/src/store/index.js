import { createStore } from 'vuex';

import plantsModule from './modules/plants/index.js';

const store = createStore({
  modules: {
    plants: plantsModule
  }
});

export default store;