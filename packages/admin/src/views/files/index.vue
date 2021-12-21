<template>
  <div class="app-container">
    <curdTemplate ref="curd" :api="api" :default-form="defaultForm" :search-params="searchParams">
      <template slot="table">
        <el-table-column label="id" prop="id" width="200" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="content" prop="content" />
      </template>
      <template slot="form" slot-scope="{form}">
        <el-form-item label="标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" :autosize="{minRows:10}" />
        </el-form-item>
      </template>
    </curdTemplate>
  </div>
</template>

<script>
import curdTemplate from '@/components/curdTemplate'
import { addWidget, getWidgetList, removeWidget, editWidget } from '@/api'

export default {
  name: 'IndexVue',
  components: { curdTemplate },
  data() {
    return {
      searchParams: {},
      defaultForm: {
        name: '',
        content: ''
      }
    }
  },
  computed: {
    api() {
      return {
        getList(params) {
          return getWidgetList({
            pageNum: 1,
            pageSize: 15
          }).then((res) => {
            const { data } = res
            return data
          })
        },
        add: addWidget,
        remove: removeWidget,
        edit: editWidget
      }
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 10px;
}
</style>
