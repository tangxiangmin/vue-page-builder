<template>
  <div>
    用户端直接预览123123213
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
      // 实现一个vue代码编辑器
      children: [
        {type: 'div'},
        {
          type: 'xxx',
          id: 1,
          remote: {
            url: 'http://127.0.0.1:7001/api/widget/file/6.vue'
          },
          props: {
            msg: 'shymean'
          }
        },
        {
          type: 'xxx',
          id: 2,
          remote: {
            url: 'http://127.0.0.1:7001/api/widget/file/7.vue'
          },
          props: {}
        }
      ]
    })
    onMounted(() => {
      const previewInstance = new PreviewMessage(null, document.referrer)
      // 接收一段页面JSON并预览
      previewInstance.on('updatePage', data => {
        console.log(data)
        // config.value = data
      })

      previewInstance.emit('ready')
    })
    return {config}
  }
}
</script>

<style scoped>

</style>
