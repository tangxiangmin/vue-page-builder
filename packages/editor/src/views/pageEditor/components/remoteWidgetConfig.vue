<template>
  <div>
    <el-form-item label="作为父容器">
      <el-switch v-model="isContainer"></el-switch>
    </el-form-item>
    <el-form-item label="组件地址">
      <el-input v-model="config.url" :disabled="disabled"/>
    </el-form-item>
    <el-form-item label="组件配置地址">
      <el-input v-model="config.configUrl" :disabled="disabled"/>
    </el-form-item>

    <RemoteWidget :url="config.configUrl" :passedProps="{passedProps:config.props}"></RemoteWidget>
  </div>
</template>

<script setup lang="ts">
import {RemoteWidget} from '@vue-page-builder/preview'
import {ref, watch} from "vue";
import {usePageEditorStore} from "../../../store/pageEditor";

const pageEditorStore = usePageEditorStore()

// 这里感觉解析远程文件，然后拼接配置表单更合适，节省一个字段
const props = defineProps({
  config: {
    type: Object,
    required: true,
  }
})

const disabled = !!props.config.url

const isContainer = ref(pageEditorStore.currentWidget === pageEditorStore.currentContainer)
watch(isContainer, (newVal) => {
  const widget = newVal ? pageEditorStore.currentWidget : null
  pageEditorStore.setCurrentContainer(widget)

})
</script>

<style scoped>

</style>
