import Vue from 'vue'

import VueRouter from 'vue-router'

import editorPageList from '@/views/editor/index'
import editorWorkspace from '@/views/editor/editor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/editor/list'
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

export default new VueRouter({
  routes
})
