import { createRouter, createWebHistory } from 'vue-router'
import LayoutMain from '@/components/layout/LayoutMain.vue'

export const noVerifyUrl = [
  '/login',
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'home', redirect: '/login'
    },
    {
      path: '/login', name: 'login-passwd', component: () => import('@/views/user/LoginPasswd.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/index',
      component: LayoutMain,
      children: [
        {
          path: 'index', name: 'index', component: () => import('@/views/dashboard/DashboardView.vue')
        },
      ]
    },
  ]
})

export default router
