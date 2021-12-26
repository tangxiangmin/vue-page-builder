import { createRouter, createWebHistory } from 'vue-router'

import widgetList from '../views/widgetList.vue'
import editorPageList from '../views/pageList.vue'
import editorWorkspace from '../views/editor/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/editor/list'
    },
    {
      path: '/widget/list',
      name: 'widgetList',
      component: widgetList
    },
    {
      path: '/editor/list',
      name: 'editorPageList',
      component: editorPageList
    },
    {
      path: '/editor/workspace',
      name: 'editorWorkspace',
      component: editorWorkspace
    }
  ]
})
