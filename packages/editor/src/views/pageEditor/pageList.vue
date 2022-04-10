<template>
  <el-form inline>
    <el-form-item>
      <el-button type="primary" @click="onAddClick">新建</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="list">
    <el-table-column label="id" prop="id" width="200"/>
    <el-table-column label="名称" prop="name"/>
    <el-table-column label="链接" prop="link">
      <template v-slot:default="{row}">
        <urlPreview :url="row.link">
          <template v-slot:default>
            {{ row.link }}
          </template>
        </urlPreview>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{row}">
        <el-button size="small" @click="onEditClick(row)">
          配置
        </el-button>
        <el-button size="small" @click="toEditor(row)">
          编辑
        </el-button>
        <el-button size="small" @click="copyPage(row)">
          复制
        </el-button>
        <el-button size="small" @click="onRemoveClick(row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="mt-10 flex justify-center">
    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page"
        :total="total"
        :page-size="pageSize"
        @size-change="changeSize"
        @current-change="changeCurrent"
    >
    </el-pagination>
  </div>
  <el-dialog v-model="formDialogVisible" :title="currentRow.id ? '编辑':'创建'">
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="currentRow.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onDialogSaveClick" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from 'element-plus'

import {IWidget, IPage} from "../../typings";
import {addPage, editPage, removePage} from "../../api/pageEditor";
import urlPreview from '../../components/urlPreview.vue'

import {useCurd} from "../../utils/curd";
import {usePageEditorStore} from "../../store/pageEditor";

const pageEditorStore = usePageEditorStore()
const router = useRouter()

function createTemplateRow(): IPage {
  return {
    name: '',
    content: '',
    link: ''
  }
}

function isTemplateRow(row: IPage): boolean {
  return !!row.id
}

const curdApi = {
  getList: pageEditorStore.getPageList,
  edit: editPage,
  add: addPage,
  remove: (row: IWidget) => {
    return removePage(row.id as string)
  }
}

const {
  list, page, pageSize, total, changeSize, changeCurrent,
  currentRow, formDialogVisible,
  getList,
  onAddClick, onEditClick, onRemoveClick, onDialogSaveClick
} = useCurd<IPage>(
    {
      api: curdApi,
      createTemplateRow,
      isTemplateRow
    }
)

function toEditor(row: IPage) {
  router.push({
    name: 'editorWorkspace',
    query: {
      id: row.id
    }
  })
}

async function copyPage(row: IPage) {
  try {
    await ElMessageBox.confirm(`确认复制【 ${row.name}】 页面吗？`)
    const stub = {
      content: row.content,
      name: row.name + '（副本）'
    }
    await addPage(stub)
    ElMessage.success('页面复制成功')
    await getList()
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>

</style>
