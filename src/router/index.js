// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Features from '../views/Features.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import DashboardAcadCoor from '../views/Acad Coor/DashboardAcadCoor.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home 
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Academic Coordinator Routes
  {
    path: '/dashboard-acad-coor',
    name: 'DashboardAcadCoor',
    component: DashboardAcadCoor
  },
  {
    path: '/notifications-acad-coor',
    name: 'NotificationsAcadCoor',
    component: () => import('../views/Acad Coor/NotificationsAcadCoor.vue')
  },
  {
    path: '/schedule-acad-coor',
    name: 'ScheduleAcadCoor',
    component: () => import('../views/Acad Coor/ScheduleAcadCoor.vue')
  },
  {
    path: '/schedule-management',
    name: 'ScheduleManagement',
    component: () => import('../views/Acad Coor/ScheduleManagement.vue')
  },
  // Viewer Routes
  {
    path: '/dashboard-viewer',
    name: 'DashboardViewer',
    component: () => import('../views/Viewer/DashboardViewer.vue')
  },
  {
    path: '/notifications-viewer',
    name: 'NotificationsViewer',
    component: () => import('../views/Viewer/NotificationsViewer.vue')
  },
  {
    path: '/schedule-viewer',
    name: 'ScheduleViewer',
    component: () => import('../views/Viewer/ScheduleViewer.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  }
];

const router = createRouter({ 
  history: createWebHistory(), 
  routes 
});

export default router;