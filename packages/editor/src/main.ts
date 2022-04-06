import {createApp} from 'vue'
import ElementPlus from 'element-plus'

import 'virtual:windi.css'
import 'element-plus/dist/index.css'
import '@vue/repl/style.css'

import App from './App.vue'
import {createPinia} from "pinia";
import router from './router'

const app = createApp(App)

app.use(ElementPlus, {size: 'large'}).use(createPinia()).use(router)

app.mount('#app')
