<template>
  <div v-loading="isLoading" :class="deviceCls">
    <iframe v-if="previewUrl" ref="previewIframe" class="preview-iframe" :src="previewUrl" @load="onPreviewFrameLoad" />
  </div>
</template>

<script>
import { PreviewMessage } from '@shymean/page-builder-shared'

let isRequestAuth = false
export default {
  name: 'PreviewIframe',
  props: {
    device: {
      type: String,
      default: 'app'
    },
    pageData: {
      type: Object,
      required: true
    },
    // 是否展示页面底部栏
    footerVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: true,
      refresh: 1
    }
  },
  computed: {
    deviceCls() {
      return this.device === 'app' ? 'mobile' : 'pc'
    },
    previewHost() {
      // return this.device === 'app' ? process.env.VUE_APP_MOBILE_URL : process.env.VUE_APP_PC_URL
      // 暂时只考虑移动端
      return 'http://localhost:3000/preview'
    },

    previewUrl() {
      const { refresh } = this
      // const isMobile = device === 'app'
      // 创建一个专门用于预览的账号，并传入对应的token
      return `${this.previewHost}/?refresh=${refresh}`
    }
  },
  watch: {
    pageData: {
      deep: true,
      handler() {
        this.refreshPreview()
      }
    }
  },
  created() {
    // 登录预览账号
    this.login()
  },
  beforeDestroy() {
    // 释放部分资源
    this.previewInstance && this.previewInstance.destroy()
  },
  methods: {
    login() {
      if (isRequestAuth) return // 避免实例化多个组件时请求多次
      isRequestAuth = true
    },
    onPreviewFrameLoad() {
      const { previewIframe } = this.$refs
      const previewInstance = new PreviewMessage(previewIframe, this.previewHost)
      this.previewInstance = previewInstance

      // 页面准备完毕，开始渲染
      previewInstance.on('ready', () => {
        this.isLoading = false
        this.refreshPreview()
      })
      this.$emit('ready', previewInstance)
    },
    refreshPreview() {
      this.previewInstance && this.previewInstance.emit('updatePage', this.pageData)
    },
    // 测试
    reload() {
      this.refresh++
      this.isLoading = true
    }
  }
}
</script>

<style scoped lang="scss">

.mobile {
  box-sizing: content-box;
  width: 375px;
  //height: 667px;
  min-height: 667px;
  margin: 20px auto;
  outline: 1px solid #000;
  overflow: auto;
  position: relative;

  .preview-iframe {
    width: 375px;
  }
}

.pc {
  position: relative;
  box-sizing: content-box;
  width: 100%;
  height: 100%;

  .preview-iframe {
    width: 1200px;
  }
}

.preview-iframe {
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  border: none;
  display: block;
  height: 100%;
}
</style>
