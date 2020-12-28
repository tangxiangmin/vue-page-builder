<template>
  <div>
    <el-form-item label="文本内容">
      <el-input v-model="config.content" />
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="style.fontSize" />
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-input v-model="style.color" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'CustomTextConfig',
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

<style scoped>

</style>
