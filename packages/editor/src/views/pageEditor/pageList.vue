<template>
  <el-table border :data="list">
    <el-table-column label="id" prop="id" width="200"/>
    <el-table-column label="名称" prop="name"/>
    <el-table-column label="链接" prop="link"/>
    <el-table-column label="操作">
      <template v-slot:default="{row}">
        <el-button size="small" @click="toEditor(row)">
          编辑
        </el-button>
        <el-button size="small" @click="copyPage(row)">
          复制
        </el-button>
        <el-button size="small" @click="remove(row)">
          删除
        </el-button>
        <el-button size="small" @click="preview(row)">
          预览
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {usePageEditorStore} from "../../store/pageEditor";
import {ElMessage} from 'element-plus'
import {removePage} from "../../api/pageEditor";

const pageEditorStore = usePageEditorStore()
const router = useRouter()

const list = ref([])

async function fetchPageList() {
  list.value = await pageEditorStore.getPageList()
}

onMounted(() => {
  fetchPageList()
})

function toEditor(row) {
  router.push({
    name: 'editorWorkspace',
    query: {
      id: row.id
    }
  })
}

function copyPage(row) {
  ElMessage.warning('todo')
}

async function remove(row) {
  await removePage(row.id)
  ElMessage.success('删除成功')
  await fetchPageList()
}

function preview(row) {
  window.open(row.link, '_blank')
}

</script>

<style scoped>

</style>
