<template>
  <el-form inline>
    <el-form-item>
      <el-button type="primary" @click="onAddClick">新建</el-button>
    </el-form-item>
  </el-form>
  <el-table border :data="list" row-key="id">
    <el-table-column label="id" prop="id" width="100"/>
    <el-table-column label="名称" prop="name"/>
    <el-table-column label="content">
      <template v-slot:default="{row}">
        {{ row.content && row.content.substr(0, 40) }}
      </template>
    </el-table-column>
    <el-table-column label="configContent">
      <template v-slot:default="{row}">
        {{ row.configContent && row.content.substr(0, 10) }}
      </template>
    </el-table-column>
    <el-table-column label="link" prop="link"/>
    <el-table-column label="类型" prop="postfix"/>
    <el-table-column label="操作">
      <template v-slot:default="{row}">
        <el-button size="small" @click="onEditClick(row)">配置</el-button>
        <el-button size="small" @click="toEditPage(row)">编辑</el-button>
        <el-button size="small" @click="onRemoveClick(row)">删除</el-button>
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
      <el-form-item label="后缀">
        <el-input v-model="currentRow.postfix"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onDialogSaveClick" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {IWidget} from "../../typings";

import {addWidget, editWidget, removeWidget} from "../../api/pageEditor";
import {usePageEditorStore} from "../../store/pageEditor";

import {useCurd} from "../../utils/curd";

const pageEditorStore = usePageEditorStore()
const router = useRouter()

function createTemplateRow(): IWidget {
  return {
    name: '',
    content: '',
    configContent: '',
    link: '',
    postfix:''
  }
}

function isTemplateRow(row: IWidget): boolean {
  return !!row.id
}

const curdApi = {
  getList: pageEditorStore.getWidgetList,
  edit: editWidget,
  add: addWidget,
  remove: (row: IWidget) => {
    return removeWidget(row.id as string)
  }
}

const {
  list, page, pageSize, total, changeSize, changeCurrent,
  currentRow, formDialogVisible,
  onAddClick, onEditClick, onRemoveClick, onDialogSaveClick
} = useCurd<IWidget>(
    {
      api: curdApi,
      createTemplateRow,
      isTemplateRow
    }
);


function toEditPage(row: IWidget) {
  router.push({
    name: "editorWidgetDetail",
    query: {
      id: row.id
    }
  })
}


</script>

<style scoped>

</style>
