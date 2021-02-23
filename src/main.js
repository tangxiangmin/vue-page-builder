import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@shymean/vue-contextmenu/dist/index.css'
import contextmenu from '@shymean/vue-contextmenu'

import compositionApi from '@vue/composition-api'

console.log(contextmenu)
Vue.use(contextmenu)

import App from './App.vue'

import store from '@/store'
import router from '@/router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(compositionApi)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
