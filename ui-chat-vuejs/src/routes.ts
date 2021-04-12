import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AuthProvider from './shared/util/auth-provider.util';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/chat', name: 'chat', component: () => import('./pages/Chat.vue') },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
  { path: '/sigup', name: 'sigup', component: () => import('./pages/Sigup.vue') },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((route, _, next) => {
  const publicPages = ['/', '/login', '/sigup'];
  const authRequired = !publicPages.includes(route.path);

  if (authRequired && !AuthProvider.logged) {
    return next({ path: '/login' });
  }

  return next();
});

export default router;
