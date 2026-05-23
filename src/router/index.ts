import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // children: [
      //   {
      //     path: 'profile',
      //     component: ProfilePage
      //   },
      //   {
      //     path: 'settings',
      //     component: SettingsPage
      //   }
      // ]
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/pages/Favorites/Favorites.vue')
    }
  ]
})

export default router
