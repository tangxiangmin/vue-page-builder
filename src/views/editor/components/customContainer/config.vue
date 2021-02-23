<template>
  <div>
    <el-form-item label="容器嵌套">
      <el-switch v-model="config.nested" /> 开启后可拖拽放入子元素
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'CustomContainerConfig',
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  computed: {
    style() {
      return this.config.style
    }
  }
}
</script>

<style scoped lang="scss">

</style>
