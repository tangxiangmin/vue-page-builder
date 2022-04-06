<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue'
import {getWidgetDetail, addWidget, editWidget} from '../../api/pageEditor'
import {useRoute} from 'vue-router'

const route = useRoute()
const routeParams = route.params
import CodeEditor from '../../components/CodeEditor.vue'


// persist state
// watchEffect(() => history.replaceState({}, '', store.serialize()))


const currentWidget = ref({
  id: '',
  content: '',
  name: ''
})
onMounted(() => {
  if (routeParams.id) {
    const id = routeParams.id as string
    getWidgetDetail(id).then(({data}) => {
      const filename = `widget_${id}.vue`
      currentWidget.value = data
    })
  }
})

async function submit() {
  let api = currentWidget.value.id ? editWidget : addWidget
  await api(currentWidget.value)
}


</script>

<template>
  <el-button @click="submit">保存</el-button>
  <CodeEditor v-if="currentWidget" v-model="currentWidget.content"></CodeEditor>

</template>

<style>
body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(var(--vh) - var(--nav-height));
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
