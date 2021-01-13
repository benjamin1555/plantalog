import { createRouter, createWebHistory } from 'vue-router';

import Plantation from './pages/Plantation.vue';
import Catalog from './pages/Catalog.vue';
import AddPlant from './pages/AddPlant.vue';
import PlantDetail from './pages/PlantDetail.vue';
import EditPlant from './pages/EditPlant.vue';
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
        return store.getters.isAuthenticated ? '/planter' : '/catalogue';
      }
    },
    {
      path: '/planter',
      meta: { needsAuth: true },
      component: Plantation,
      props: true,
      children: [
        { path: 'plants/:id', component: PlantDetail },
        { path: 'plants/:id/editer', meta: { needsAuth: true }, component: EditPlant },
      ]
    },
    {
      path: '/catalogue',
      component: Catalog,
      props: true,
      children: [
        { path: 'plants/:id', component: PlantDetail },
        { path: 'plants/:id/editer', meta: { needsAuth: true }, component: EditPlant },
        { path: 'ajouter-plante', meta: { needsAuth: true }, component: AddPlant },
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