
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/preview',
      component: () => import('../views/preview/index.vue')
    },
    {
      path: '/test',
      component: () => import('../views/preview/test.vue')
    }
  ]
})
