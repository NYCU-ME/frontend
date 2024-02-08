import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AboutUs from '../views/AboutUs.vue';
import MyDomains from '../views/MyDomains.vue';
import DomainPanel from '../views/DomainPanel.vue';
import StatisticBoard from '../views/StatisticBoard.vue';
import MyProfile from '../views/MyProfile.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ContactUs from '../views/ContactUs.vue';
import UsageRules from '../views/UsageRules.vue';
import DNSSec from '../views/DNSSec.vue';
import DNSSecPanel from '../views/DNSSecPanel.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/about-us', component: AboutUs },
  { path: '/domains', component: MyDomains },
  { path: '/domain', component: DomainPanel },
  { path: '/statistic', component: StatisticBoard },
  { path: '/profile', component: MyProfile },
  { path: '/dashboard', component: DashboardPage },
  { path: '/contact-us', component: ContactUs },
  { path: '/rules', component: UsageRules },
  { path: '/dnssec', component: DNSSec}, 
  { path: '/dnssec-panel', component: DNSSecPanel}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;

