import { createRouter, createWebHistory } from 'vue-router';

import Plant from './components/pages/Plant.vue';
import Catalog from './components/pages/Catalog.vue';
import AddPlant from './components/pages/AddPlant.vue';
import NotFound from './components/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/planter'},
    { path: '/planter', component: Plant},
    {
      path: '/catalogue',
      component: Catalog,
      children: [
        { path: 'ajouter-plante', component: AddPlant }
      ]
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;