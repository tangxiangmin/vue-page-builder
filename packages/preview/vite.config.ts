import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import remoteModulePlugin from 'vite-plugin-remote-module'

console.log(13123)
// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://cdn-vite.shymean.com/',
  plugins: [
    vue(),
    remoteModulePlugin()
  ]
})
