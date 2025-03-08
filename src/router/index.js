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
  // System Administrator Routes
  {
    path: '/dashboard-sysad',
    name: 'DashboardSysAd',
    component: () => import('../views/System Admin/DashboardSysAd.vue')
  },
  {
    path: '/notifications-sysad',
    name: 'NotificationsSysAd',
    component: () => import('../views/System Admin/NotificationsSysAd.vue')
  },
  {
    path: '/all-schedules-sysad',
    name: 'AllSchedulesSysAd',
    component: () => import('../views/System Admin/AllSchedSysAd.vue')
  },
  {
    path: '/schedule-sysad',
    name: 'ScheduleSysAd',
    component: () => import('../views/System Admin/ScheduleSysAd.vue')
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('../views/System Admin/UserManagement.vue')
  },
  {
    path: '/account-management',
    name: 'AccountManagement',
    component: () => import('../views/System Admin/AccountManagement.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/System Admin/UserProfile.vue')
  }
];

const router = createRouter({ 
  history: createWebHistory(), 
  routes 
});

export default router;