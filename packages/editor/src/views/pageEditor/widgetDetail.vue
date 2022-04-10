<template>
  <el-alert title="TODO 加个编辑时预览的功能"></el-alert>
  <el-button class="my-10px" @click="submit">保存</el-button>
  <template v-if="currentWidget">
    <el-row :gutter="10">
      <el-col :span="12">
        <codeEditor class="editor" v-model="currentWidget.content"></codeEditor>
      </el-col>
      <el-col :span="12">
        <codeEditor class="editor" v-model="currentWidget.configContent"></codeEditor>
      </el-col>
    </el-row>
  </template>

</template>
<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue'
import {getWidgetDetail, addWidget, editWidget} from '../../api/pageEditor'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const {id} = route.query
import codeEditor from '../../components/codeEditor.vue'
import {IWidget} from "../../typings";
import {ElMessage} from "element-plus";

const currentWidget = ref<IWidget>({
  content: '',
  configContent: '',
  name: '',
  link: '',
  postfix: 'vue'
})

onMounted(() => {
  if (id) {
    getWidgetDetail(id as string).then(({data}) => {
      currentWidget.value = data
    })
  }
})

async function submit() {
  let api = id ? editWidget : addWidget
  const {data} = await api(currentWidget.value)
  ElMessage.success('操作成功')
  if (!id && data.id) {
    await router.push({
      name: "editorWidgetDetail",
      query: {
        id: data.id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.editor {
  border: 1px solid #000;
  height: 80vh;
}

</style>
