import { createApp } from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';

import './assets/styles/styles.scss';

createApp(App)
  .use(BootstrapVue)
  .use(BootstrapVueIcons)
  .mount('#app');
