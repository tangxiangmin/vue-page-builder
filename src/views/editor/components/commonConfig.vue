<template>
  <div>
    <el-alert title="公共配置" style="margin-bottom: 10px" :closable="false" />
    <el-form-item label="id">
      <el-input v-model="config.id" placeholder="请填写控件id" />
    </el-form-item>
    <el-form-item label="CSS样式">
      <codeEditor v-model="config.style" />
    </el-form-item>

    <el-alert title="逻辑配置" style="margin-bottom: 10px" :closable="false" />
    <template v-if="config.click">
      <el-form-item label="点击类型">
        <el-select v-model="config.click.type">
          <el-option label="无" value="" />
          <el-option label="返回锚点" value="1" />
          <el-option label="跳转页面" value="2" />
        </el-select>
      </el-form-item>
      <template v-if="config.click.type">
        <el-form-item label="点击参数">
          <el-input v-model="config.click.args" placeholder="请填写点击参数" />
        </el-form-item>
        <el-form-item label="埋点类型">
          <el-input v-model="config.click.logType" placeholder="请填写埋点类型，用于触发点击时行为上报" />
        </el-form-item>
        <el-form-item v-if="config.click.logType" label="埋点参数">
          <el-input v-model="config.click.logParams" placeholder="请填写埋点参数，用于埋点上报时额外携带的参数" />
        </el-form-item>
      </template>
    </template>
  </div>
</template>

<script>
import codeEditor from '@/components/codeEditor'
export default {
  name: 'CommonConfig',
  components: { codeEditor },
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
