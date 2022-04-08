import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import remoteModulePlugin from 'vite-plugin-remote-module'
import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    remoteModulePlugin(),
    WindiCSS(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ]
})
