<template>
  <div>
    <el-alert title="公共配置" style="margin-bottom: 10px" :closable="false" />
    <el-form-item label="id">
      <el-input v-model="config.id" placeholder="请填写控件id" />
    </el-form-item>
    <el-form-item label="定位">
      <el-radio-group v-model="style.position">
        <el-radio label="static">
          static
        </el-radio>
        <el-radio label="relative">
          relative
        </el-radio>
        <el-radio label="absolute">
          absolute
        </el-radio>
        <el-radio label="fixed">
          fixed
        </el-radio>
      </el-radio-group>
      <!--      <el-switch v-model="config.fixed" />-->
    </el-form-item>
    <!--    <el-form-item label="width">-->
    <!--      <el-input v-model="style.width" />-->
    <!--    </el-form-item>-->
    <el-form-item label="transform">
      <el-input v-model="style.transform" />
    </el-form-item>
    <template v-if="style.position && style.position !=='static'">
      <el-form-item label="zIndex">
        <el-input v-model="style.zIndex" />
      </el-form-item>
      <el-form-item label="定位属性">
        <el-row>
          <el-col :span="6">
            <el-input v-model="style.top" placeholder="上" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="style.bottom" placeholder="下" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="style.left" placeholder="左" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="style.right" placeholder="右" />
          </el-col>
        </el-row>
      </el-form-item>
    </template>
    <el-form-item label="背景色">
      <el-color-picker v-model="style.backgroundColor" show-alpha />
    </el-form-item>
    <el-form-item label="浮动">
      <el-input v-model="style.float" />
    </el-form-item>
    <el-form-item label="宽高">
      <el-row>
        <el-col :span="6">
          <el-input v-model="style.width" placeholder="宽度" />
        </el-col>
        <el-col :span="6" :offset="1">
          <el-input v-model="style.height" placeholder="高度" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="外边距">
      <el-input v-model="style.margin" />
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
export default {
  name: 'CommonConfig',
  props: {
    config: {
      type: Object,
      default: null
    }
  },
  computed: {
    styleMap() {
      return {
        position: '定位',
        left: '左',
        top: '上',
        right: '右',
        bottom: '下'
      }
    },
    style() {
      return this.config.style
    }
  },
  created() {
    if (typeof this.config.style !== 'object') {
      this.config.style = {}
    }
  }
}
</script>

<style scoped>

</style>
