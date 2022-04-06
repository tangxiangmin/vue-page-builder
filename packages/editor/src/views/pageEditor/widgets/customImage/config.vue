<template>
  <div>
    <el-form-item label="图片">
      <imgUpload v-model="config.src" />
    </el-form-item>
  </div>
</template>

<script>
// import imgUpload from '@/components/imgUpload'
export default {
  name: 'CustomImageConfig',
  // components: { imgUpload },
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
