
<script>

// const noop = () => {
//   return Promise.resolve(false)
// }

// const add = noop
// const edit = noop
// const remove = noop
// const getList = noop

export default {
  name: 'CurdTemplate',
  props: {
    defaultForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: Object,
      default: () => {
        return {
          add: null,
          edit: null,
          remove: null,
          getList: null
        }
      }
    },
    tableRender: {
      type: Function,
      default: () => {
        return []
      }
    },
    addText: {
      type: String,
      default: '新增'
    },
    searchParams: {
      type: Object,
      default: null
    },
    pageSize: {
      type: Number,
      default: 15
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      dialogFormVisible: false,
      form: Object.assign({}, this.defaultForm)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 约定getList接口返回{list, total}
      this.api.getList && this.api.getList(this.searchParams).then(res => {
        if (!res) return
        const { list, total } = res
        this.list = Array.isArray(list) ? list : []
        this.total = total
      })
    },
    editRow(row) {
      this.dialogFormVisible = true
      this.form = row
    },
    removeRow(row) {
      this.$confirm('确认删除？').then(() => {
        const index = this.list.indexOf(row)
        this.api.remove(row[this.rowKey]).then(() => {
          this.list.splice(index, 1)
          this.$message.success('删除成功')
        })
      }).catch(() => {})
    },
    submitDialog() {
      let task
      const { form } = this
      if (form.$$isEdit) {
        task = this.api.edit
      } else {
        task = this.api.add
      }

      task(form).then(() => {
        this.$message.success('操作成功')
        this.fetchData()
        this.hideDialog()
      })
    },
    showDialog() {
      this.dialogFormVisible = true
    },
    hideDialog() {
      this.dialogFormVisible = false
      this.form = Object.assign({}, this.defaultForm)
    },
    changePageNum(page) {
      this.searchParams.page = page
      this.fetchData()
    }
  },
  render(h) {
    const { addText } = this

    const searchForm = this.$scopedSlots.search && this.$scopedSlots.search({ params: this.searchParams, getList: this.fetchData })
    const form = (<el-form inline>
      {
        this.api.add ? (<el-form-item>
          <el-button type='primary' v-on:click={this.showDialog}>
            {addText}
          </el-button>
        </el-form-item>) : null
      }
      { searchForm }
    </el-form>)

    const tableIndex = h('el-table-column', {
      props: {
        label: '序号',
        width: '50'
      },
      scopedSlots: {
        default: ({ $index }) => {
          return ($index + 1)
        }
      }
    })

    const tableAction = h('el-table-column', {
      props: {
        label: '操作'
      },
      scopedSlots: {
        default: ({ row }) => {
          const tableActionSlot = this.$scopedSlots.tableAction && this.$scopedSlots.tableAction({ row })
          return (
            <div>
              {this.api.edit ? (<el-button size='mini' v-on:click={this.editRow.bind(this, row)}>编辑</el-button>) : null}
              {this.api.remove ? (<el-button size='mini' v-on:click={this.removeRow.bind(this, row)}>删除</el-button>) : null}
              {tableActionSlot}
            </div>)
        }
      }
    })

    const showAction = this.api.edit || this.api.remove || this.$scopedSlots.tableAction

    const table = h('el-table', {
      props: {
        border: true,
        data: this.list
      }
    }, [tableIndex, ...this.$scopedSlots.table(), showAction ? tableAction : null])

    let dialog

    if (this.dialogFormVisible) {
      if (typeof this.form.$$isEdit === 'undefined') {
        this.form.$$isEdit = !!this.form[this.rowKey]
      }
      const editForm = h('el-form', {
        props: {
          labelWidth: '80px'
        }
      }, this.$scopedSlots.form({ form: this.form, isEdit: this.form.$$isEdit }))

      const dialogFooter = (<div slot='footer'>
        <el-button v-on:click={this.hideDialog}>取消</el-button>
        <el-button type='primary' v-on:click={this.submitDialog}>确定</el-button>
      </div>)
      dialog = h('el-dialog', {
        props: {
          title: this.form.$$isEdit ? '编辑' : '新增',
          visible: this.dialogFormVisible
        },
        on: {
          'update:title': (val) => {
            this.dialogFormVisible = val
          }
        }
      }, [editForm, dialogFooter])
    }

    const pagination = this.total ? h('div', {
      attrs: {
        class: ['curd-pagination']
      }
    }, [h('el-pagination', {
      props: {
        background: true,
        layout: 'total, prev, pager, next',
        total: this.total,
        pageSize: this.pageSize
      },
      on: {
        'current-change': this.changePageNum
      }
    })]) : null

    return h('div', {}, [form, table, dialog, pagination])
  }
}
</script>

<style scoped lang="scss">
.curd-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
