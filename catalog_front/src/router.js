import { createRouter, createWebHistory } from 'vue-router';

import Plantation from './pages/Plantation.vue';
import Catalog from './pages/Catalog.vue';
import AddPlant from './pages/AddPlant.vue';
import PlantDetail from './components/plants/PlantDetail.vue';
import EditPlant from './pages/EditPlant.vue';
import DiseaseDetail from './components/diseases/DiseaseDetail.vue'
import Login from './pages/Login.vue';
import SignUp from './pages/SignUp.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect() {
        return store.getters.isAuthenticated ? '/plant' : '/catalog';
      }
    },
    {
      path: '/plant',
      meta: { needsAuth: true },
      component: Plantation,
      props: true,
      children: [
        { path: 'plants/:id', component: PlantDetail },
        { path: 'plants/:id/edit', meta: { needsAuth: true }, component: EditPlant },
      ]
    },
    {
      path: '/catalog',
      component: Catalog,
      props: true,
      children: [
        { path: 'plants/:id', component: PlantDetail },
        { path: 'plants/:id/edit', meta: { needsAuth: true }, component: EditPlant },
        { path: 'add-plant', meta: { needsAuth: true }, component: AddPlant },
        { path: 'diseases/:id', component: DiseaseDetail }
      ]
    },
    { path: '/login', meta: { needsUnAuth: true }, component: Login },
    { path: '/signup', meta: { needsUnAuth: true }, component: SignUp },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.needsUnAuth && store.getters.isAuthenticated) {
    console.log(to);
    next('/');
  } else {
    next();
  }
});

export default router;