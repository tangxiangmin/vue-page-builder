<template>
  <el-form label-width="100px">
    <el-form-item label="页面类型">
      <el-radio-group v-model="page.type">
        <el-radio label="pure">
          常规页面
        </el-radio>
        <el-radio label="download">
          下载落地页
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="数据源">
      <el-input v-model="page.data" />
    </el-form-item>
    <el-form-item label="页面样式">
      <el-input v-model="page.style" type="textarea" :autosize="{minRows:5}" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PageConfig',
  props: {
    page: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
