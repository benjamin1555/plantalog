import { createStore } from 'vuex';

import plantsModule from './modules/plants/index.js';
import diseasesModule from './modules/diseases/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    plants: plantsModule,
    diseases: diseasesModule,
    auth: authModule
  }
});

export default store;