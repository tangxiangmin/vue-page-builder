<template>
  <div>
    <el-alert title="公共配置" style="margin-bottom: 10px" :closable="false" />
    <el-form-item label="id">
      <el-input v-model="config.id" placeholder="请填写控件id" />
    </el-form-item>
    <el-form-item label="CSS样式">
      <codeEditor v-model="config.style" />
    </el-form-item>

    <el-form-item label="上传">
      <el-button @click="uploadWidget">
        上传自定义组件
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
import codeEditor from '@/components/codeEditor'
import { addWidget } from '@/api'

export default {
  name: 'CommonConfig',
  components: { codeEditor },
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  computed: {
    currentComponent() {
      return this.$store.state.editor.currentComponent
    }
  },
  created() {
  },
  methods: {
    async uploadWidget() {
      const { value } = await this.$prompt('请输入组件名称')
      if (!value) return

      const params = {
        name: value,
        content: JSON.stringify(this.currentComponent)
      }
      await addWidget(params)
      this.$message.success('上传成功')
    }
  }
}
</script>

<style scoped>

</style>
