import { createRouter, createWebHistory } from 'vue-router'

export const noVerifyUrl = [
  '/login',
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/Login.vue')
    },
  ]
})

export default router
