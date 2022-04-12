<template>
  <div>
    <el-form-item label="组件地址">
      <el-input v-model="config.url" :disabled="disabled"/>
    </el-form-item>
    <el-form-item label="组件配置地址">
      <el-input v-model="config.configUrl" :disabled="disabled"/>
    </el-form-item>

    <RemoteWidget :url="config.configUrl" :passedProps="{config}"></RemoteWidget>
  </div>
</template>

<script setup lang="ts">
import {RemoteWidget} from '@vue-page-builder/preview'

// todo 这里感觉解析远程文件，然后拼接配置表单更合适，节省一个字段
const props = defineProps({
  config: {
    type: Object,
    required: true,
  }
})

const disabled = !!props.config.url
</script>

<style scoped>

</style>
