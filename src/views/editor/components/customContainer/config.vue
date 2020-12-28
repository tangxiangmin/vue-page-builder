<template>
  <div>
    <el-form-item label="内容">
      <el-input v-model="config.children" />
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
