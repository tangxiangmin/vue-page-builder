<template>
  <div class="app-container">
    <curdTemplate ref="curd" :api="api" :search-params="searchParams">
      <template slot="table">
        <el-table-column label="id" prop="id" width="200" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="链接(点击查看二维码)">
          <template slot-scope="{row}">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
            >
              <div class="qr-popover">
                <qrCode class="qr-popover_bd" :text="row.link" />
                <div class="qr-popover_ft">
                  <el-button size="mini" @click="copyLink(row)">
                    复制链接
                  </el-button>
                  <el-button size="mini" @click="openLink(row)">
                    直接访问
                  </el-button>
                </div>
              </div>
              <span slot="reference" class="link">{{ row.link }}</span>
            </el-popover>
          </template>
        </el-table-column>
      </template>
      <template slot="tableAction" slot-scope="{row}">
        <el-button size="mini" @click="toEditor(row)">
          编辑页面
        </el-button>
        <el-button size="mini" @click="copyPage(row)">
          复制页面
        </el-button>
      </template>
      <template slot="form" slot-scope="{form}">
        <el-form-item label="页面名称">
          <el-input v-model="form.name" />
        </el-form-item>
      </template>
    </curdTemplate>
  </div>
</template>

<script>
import curdTemplate from '@/components/curdTemplate'
import qrCode from '@/components/qrCode'

import { addPage, editPage, getPageList, removePage } from '@/api'

export default {
  name: 'Index',
  components: {
    curdTemplate,
    qrCode
  },
  data() {
    const api = {
      add: (data) => {
        const params = {
          ...data,
          content: ''
        }
        return addPage(params)
      },
      edit: (data) => {
        return editPage(data)
      },
      remove(id) {
        return removePage(id)
      },
      getList: (params) => {
        return getPageList({
          pageNum: params.page,
          pageSize: 15
        }).then((res) => {
          const { data } = res
          const host = 'https://demo.shymean.com'
          data.list.forEach(row => {
            row.link = `${host}/#/template?id=${row.id}`
          })
          return data
        })
      }
    }
    const searchParams = {
      page: 1
    }
    return {
      api,
      searchParams
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
.qr-popover {
  &_bd {
    width: 100%;
  }

  &_ft {
    text-align: center;
  }
}
</style>
