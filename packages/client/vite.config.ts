import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import remoteModulePlugin from 'vite-plugin-remote-module'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    remoteModulePlugin()
  ]
})
