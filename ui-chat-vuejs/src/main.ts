import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import Routes from './routes';
// import VuexStore from './store/index';
import './assets/styles/style.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  render: (createElement) => createElement(App),
  router: Routes,
  // store: VuexStore,
}).$mount('#app');
