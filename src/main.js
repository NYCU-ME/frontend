import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { Bar } from 'vue-chartjs'
import router from './router';

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'NYCU-ME';
  next();
});

createApp(App)
  .use(router)
  .mount('#app');

