<template>
  <div>
    <el-form-item label="组件地址">
      <el-input v-model="config.url" />
    </el-form-item>
    <el-form-item label="组件props">
      <el-input v-model="config.props" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'RemoteWidgetConfig',
  props: {
    config: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
