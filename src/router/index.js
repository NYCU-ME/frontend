import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AboutUs from '../views/AboutUs.vue';
import MyDomains from '../views/MyDomains.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/about-us', component: AboutUs },
  { path: '/manage', component: MyDomains },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;

