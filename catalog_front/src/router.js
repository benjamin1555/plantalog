import { createRouter, createWebHistory } from 'vue-router';

import Planter from './components/pages/Planter.vue';
import Catalogue from './components/pages/Catalogue.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/planter'},
    { path: '/planter', component: Planter},
    { path: '/catalogue', component: Catalogue}
  ]
});

export default router;