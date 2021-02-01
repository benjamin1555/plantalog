import { createRouter, createWebHistory } from 'vue-router';

import store from './store/index.js';

const Plantation = () => import('./pages/Plantation.vue');
const Catalog = () => import('./pages/Catalog.vue');
const AddPlant = () => import('./pages/AddPlant.vue');
const PlantDetail = () => import('./components/plants/PlantDetail.vue');
const PlantDetailPage = () => import('./pages/PlantDetailPage.vue');
const EditPlant = () => import('./pages/EditPlant.vue');
const DiseaseDetail = () => import('./components/diseases/DiseaseDetail.vue');
const DiseaseDetailPage = () => import('./pages/DiseaseDetailPage.vue');
const Login = () => import('./pages/Login.vue');
const SignUp = () => import('./pages/SignUp.vue');
const NotFound = () => import('./pages/NotFound.vue');

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
    { path: '/plant-detail/:id', component: PlantDetailPage },
    { path: '/disease-detail/:id', component: DiseaseDetailPage },
    { path: '/login', meta: { needsUnAuth: true }, component: Login },
    { path: '/signup', meta: { needsUnAuth: true }, component: SignUp },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _from, next) => {
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