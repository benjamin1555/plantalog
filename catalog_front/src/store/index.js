import { createStore } from 'vuex';

import plantsModule from './modules/plants/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    plants: plantsModule,
    auth: authModule
  }
});

export default store;