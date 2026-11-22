import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/projects',
      name: 'project_list',
      component: () => import('../views/ProjectListView.vue'),
    },
    {
      path: '/projects/checkers-bot',
      name: 'checkers-bot',
      component: () => import('../views/projects/checkers_bot/CheckersBotView.vue'),
    },
    {
      path: '/projects/team-sailing-pairer',
      name: 'team-sailing-pairer',
      component: () => import('../views/projects/team_sailing_pairer/TeamSailingPairerView.vue'),
    },
  ],
})

export default router
