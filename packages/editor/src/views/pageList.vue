<template>
  <div class="app-container">
    <el-table border :data="list">
      <el-table-column label="id" prop="id" width="200"/>
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="链接" prop="link"/>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button size="mini" @click="toEditor(row)">
            编辑页面
          </el-button>
          <el-button size="mini" @click="copyPage(row)">
            复制页面
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <curdTemplate ref="curd" :api="api" :search-params="searchParams">-->
    <!--      <template #table>-->

    <!--      </template>-->
    <!--      <template #tableAction="{row}">-->

    <!--      </template>-->
    <!--      <template #form="{form}">-->
    <!--        <el-form-item label="页面名称">-->
    <!--          <el-input v-model="form.name" />-->
    <!--        </el-form-item>-->
    <!--      </template>-->
    <!--    </curdTemplate>-->
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'

import {addPage, getPageList, removePage} from '@/api'

const useList = () => {
  const list = ref([])
  onMounted(() => {
    getPageList({
      pageNum: 1,
      pageSize: 15
    }).then((res) => {
      const {data} = res
      const host = 'https://demo.shymean.com'
      data.list.forEach(row => {
        row.link = `${host}/#/template?id=${row.id}`
      })
      list.value = data.list
    })
  })
  return {
    list
  }
}

export default {
  name: 'Index',
  components: {},
  setup() {
    const {list} = useList()
    return {
      list
    }
  },
  methods: {
    toEditor(row) {
      this.$router.push({
        name: 'editorWorkspace',
        query: {
          id: row.id
        }
      })
    },
    copyPage(row) {
      this.$confirm(`确认复制【 ${row.name}】 页面吗？`).then(() => {
        const stub = {
          content: row.content,
          name: row.name + '（副本）'
        }
        return addPage(stub).then(() => {
          this.$message.success('页面复制成功')
          this.$refs.curd.fetchData()
        })
      }).catch(() => {
      })
    },
    copyLink(row) {
      this.$copyText(row.link).then(() => {
        this.$message.success(`复制成功：${row.link}`)
      })
    },
    openLink(row) {
      window.open(row.link, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 10px;
}

.qr-popover {
  &_bd {
    width: 100%;
  }

  &_ft {
    text-align: center;
  }
}
</style>
