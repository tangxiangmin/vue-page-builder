<template>
  <el-table border :data="widgetList">
    <el-table-column label="id" prop="id" width="200"/>
    <el-table-column label="名称" prop="name"/>
    <el-table-column label="content" prop="content"/>
    <el-table-column label="link" prop="link"/>
    <el-table-column label="操作">
      <template v-slot:default="{row}">
        <el-button size="small" @click="toEditPage(row)">编辑</el-button>
        <el-button size="small" @click="removeRow(row)">删除</el-button>
      </template>

    </el-table-column>
  </el-table>
</template>

<script setup>
import {onMounted, ref} from "vue";

import {useRouter} from "vue-router";
import {getWidgetList, removeWidget} from "../../api/pageEditor";

const router = useRouter()

const widgetList = ref([])

async function getList() {
  const {data:{list}} = await getWidgetList({pageNum: 1, pageSize: 15})
  list.forEach(row=>{
    row.link = `http://localhost:7001/api/widget/file/${row.id}.vue`
  })
  widgetList.value = list
}

onMounted(() => {

  getList()
})

function toEditPage(row) {
  router.push({
    name: "editorWidgetDetail",
    params: {
      id: row.id
    }
  })
}

async function removeRow(row) {
  await removeWidget(row.id)
  await getList()
}

</script>

<style scoped>

</style>
