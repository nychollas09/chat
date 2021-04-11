import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from './pages/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: HomeComponent },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
];

export default new VueRouter({
  routes,
});
