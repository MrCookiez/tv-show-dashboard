import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'TV Show Dashboard',
    },
  },
  {
    path: '/show/:id',
    name: 'show-details',
    component: () => import('../views/ShowDetailsView.vue'),
    meta: {
      title: 'Show Details',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: {
      title: 'Search Shows',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.afterEach(to => {
  const title = to.meta.title as string
  document.title = title ? `${title} | TV Show Dashboard` : 'TV Show Dashboard'
})

export default router
