import { createRouter, createWebHistory } from 'vue-router';

import Plant from './pages/Plant.vue';
import Catalog from './pages/Catalog.vue';
import AddPlant from './pages/AddPlant.vue';
import PlantDetail from './pages/PlantDetail.vue';
import EditPlant from './pages/EditPlant.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/planter'},
    { path: '/planter', component: Plant},
    {
      path: '/catalogue',
      component: Catalog,
      props: true,
      children: [
        { path: 'plants/:id', component: PlantDetail },
        { path: 'plants/:id/editer', component: EditPlant },
        { path: 'ajouter-plante', component: AddPlant },
      ]
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;