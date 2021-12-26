<template>
  <el-container class="admin">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message" />菜单
          </template>
          <el-menu-item index="1-1">
            <router-link :to="{name:'editorPageList'}">
              页面列表
            </router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link :to="{name:'widgetList'}">
              远程组件
            </router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="admin_mn">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
.admin {
  min-height: 100vh;

  &_mn {
    padding: 0;
  }
}
</style>
<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
