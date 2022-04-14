import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import remoteModulePlugin from 'vite-plugin-remote-module'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  build: {
    rollupOptions: {
      input: {
        // index: './temp/1/index.html',
        index: process.env.BUILD_TARGET_FILE,
      }
    },
  },
  plugins: [
    vue(),
    remoteModulePlugin()
  ]
})
