import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: '/editor/page_list'
  },
  {
    path: '/editor/page_list',
    name: 'editorPageList',
    component: () => import('../views/pageEditor/pageList.vue')
  },

  {
    path: '/editor/widget_list',
    name: 'editorWidgetList',
    component: () => import('../views/pageEditor/widgetList.vue')
  },
  {
    path: '/editor/widget',
    name: 'editorWidgetDetail',
    component: () => import('../views/pageEditor/widgetDetail.vue')
  },
  {
    path: '/editor/workspace',
    name: 'editorWorkspace',
    component: () => import('../views/pageEditor/workspace.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
