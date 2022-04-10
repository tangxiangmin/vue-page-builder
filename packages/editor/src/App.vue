<template>
  <ElConfigProvider :locale="zhCn">
    <div class="flex">
      <div class="w-200px flex-shrink-0">
        <el-menu :default-active="currentIndex" class="el-menu-vertical-demo h-100vh">
          <template v-for="menu in menuList">

            <el-sub-menu :index="menu.index" v-if="menu.children">
              <template #title>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item :index="sub.index" v-for="sub in menu.children">
                <router-link class="block w-200px" :to="sub.route">{{ sub.title }}</router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="menu.index" v-else>
              <router-link class="block w-200px" :to="menu.route">{{ menu.title }}</router-link>
            </el-menu-item>
          </template>

        </el-menu>
      </div>
      <div class="main flex-grow p-20px">
        <router-view></router-view>
      </div>
    </div>
  </ElConfigProvider>

</template>
<script setup lang="ts">
import {ElConfigProvider} from "element-plus";
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import {useRoute} from "vue-router";
import {computed} from "vue";

type MenuItem = {
  route?: { name: string },
  title: string,
  index: string,
  children?: MenuItem[]
}

const menuList: MenuItem[] = [
  {
    route: {name: 'editorPageList'},
    title: '页面列表',
    index: '2-1'
  },
  {
    route: {name: 'editorWidgetList'},
    title: '组件列表',
    index: '2-2'
  },
  // {
  //   title: '问卷管理',
  //   index: '3',
  //   children: []
  // },
]
const route = useRoute()

const currentIndex = computed(() => {
  const menu = menuList[0]?.children?.find(menu => menu?.route?.name === route.name)
  return menu && menu.index
  // return '2-1'
})
</script>

<style></style>
