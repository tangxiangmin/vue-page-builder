<template>
  <div>
    <abstractContainer :config="comp" v-for="comp in config.children" :key="comp.id"></abstractContainer>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {PreviewMessage} from '@shymean/page-builder-shared'
import abstractContainer from "../preview/abstractContainer.vue";
import axios from 'axios'
import {useRoute} from "vue-router";

export default {
  name: 'Preview',
  components: {abstractContainer},
  setup() {
    const route = useRoute()
    const config = ref({
      children: []
    })
    onMounted(() => {
      const {id = 7} = route.query
      axios.get(`http://127.0.0.1:7001/api/page/${id}`).then(res => res.data).then(({data}) => {
        const res = JSON.parse(data.content)
        config.value = {
          type: 'div',
          children: res.children
        }
      })

    })
    return {config}
  }
}
</script>

<style scoped>

</style>
