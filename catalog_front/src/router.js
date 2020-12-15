import { createRouter, createWebHistory } from 'vue-router';

import Plant from './pages/Plant.vue';
import Catalog from './pages/Catalog.vue';
import AddPlant from './pages/AddPlant.vue';
import NotFound from './pages/NotFound.vue';

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