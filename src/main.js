import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import compositionApi from '@vue/composition-api'

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
