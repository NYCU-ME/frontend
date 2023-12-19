import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { Bar } from 'vue-chartjs'
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');
