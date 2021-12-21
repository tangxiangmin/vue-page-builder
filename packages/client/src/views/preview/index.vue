<template>
  <div>
    用户端直接预览
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {PreviewMessage} from '@shymean/page-builder-shared'

export default {
  name: 'Preview',
  setup() {
    const config = ref({})
    onMounted(() => {
      const previewInstance = new PreviewMessage(null, document.referrer)
      // 接收一段页面JSON并预览
      previewInstance.on('updatePage', data => {
        console.log(data)
        config.value = data
      })

      previewInstance.emit('ready')
    })
    return {config}
  }
}
</script>

<style scoped>

</style>
