<template>
  <div>
    <abstractContainer :config="comp" v-for="comp in config.children" :key="comp.id"></abstractContainer>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {PreviewMessage} from '@shymean/page-builder-shared'
import abstractContainer from "./abstractContainer.vue";

export default {
  name: 'Preview',
  components: {abstractContainer},
  setup() {
    const config = ref({
      children: []
    })
    onMounted(() => {
      const previewInstance = new PreviewMessage(null, document.referrer)
      // 接收一段页面JSON并预览
      previewInstance.on('updatePage', data => {
        // config.value = data
        config.value = {
          type: 'div',
          children: data.children
        }
      })

      previewInstance.emit('ready')
    })
    return {config}
  }
}
</script>

<style scoped>

</style>
