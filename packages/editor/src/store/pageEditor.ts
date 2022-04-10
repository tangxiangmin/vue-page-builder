import {defineStore} from "pinia";
import {
  addPage, getPageList, removePage, getPageDetail,
  getWidgetList,
} from '../api/pageEditor'
import {IPage, IWidgetConfig} from "../typings";
import BaseWidget from "../views/pageEditor/core/baseWidget";


type PageEditorState = {
  currentPage: IPage | null,
  currentWidget: BaseWidget | null,

  snapshotList: any[],
  snapshotIndex: number
}

export const usePageEditorStore = defineStore({
  id: 'pageEditor',
  state: (): PageEditorState => {
    return {
      currentPage: null,
      currentWidget: null,
      // 数据快照，用于撤销和重做
      snapshotList: [], // [s1,s2,s3,s4]
      snapshotIndex: -1
    }
  },
  getters: {
    pageWidgetList(): IWidgetConfig[] {
      if (!this.currentPage) return []
      // @ts-ignore
      return this.currentPage.content.children
    }
  },
  actions: {
    async getPageDetail(id: string) {
      const {data} = await getPageDetail(id)
      try {
        data.content = JSON.parse(data.content)
      } catch (e) {
        data.content = {
          children: []
        }
      }
      this.currentPage = data

      return data
    },
    async getPageList() {
      const {data: {list, total}} = await getPageList({pageNum: 1, pageSize: 15})
      list.forEach((row: IPage) => {
        row.link = `http://localhost:9988/template?id=${row.id}`
      })
      return {list, total}
    },
    async getWidgetList({page, pageSize}: { page: number, pageSize: number } = {page: 1, pageSize: 1000}) {
      const {data: {list, total}} = await getWidgetList({pageNum: page, pageSize})
      list.map(row => {
        row.link = `http://localhost:7001/api/widget/file/${row.id}.${row.postfix}`
        row.configLink = `http://localhost:7001/api/widget/file_config/${row.id}.${row.postfix}`
      })

      return {list, total}
    },
    setCurrentWidget(widget: BaseWidget) {
      this.currentWidget = widget
    },
    copyWidget(widget: BaseWidget) {
      let list = this.pageWidgetList
      let idx = list.indexOf(widget)
      let clone = {...widget, id: +new Date()}
      list.splice(idx, 0, clone)
    },
    removeWidget(widget: BaseWidget) {
      let list = this.pageWidgetList
      let idx = list.indexOf(widget)
      list.splice(idx, 1)
    },
    // 在组件级别的操作上记录，如新增组件，删除组件，调整排序等
    recordAction(payload: object) {
      const {snapshotList, snapshotIndex} = this

      // todo 对payload进行深拷贝，暂时使用stringify处理
      const snapshot = JSON.stringify(payload)
      // 删除超过索引的记录
      const originList = snapshotList.slice(0, snapshotIndex + 1)
      const list = [...originList, snapshot]

      this.snapshotList = list
      this.snapshotIndex = list.length - 1
    },
    // 后退返回上一步
    undo() {
      let {snapshotIndex} = this
      const {snapshotList} = this
      // 后面还有快照，则可以继续后退
      if (snapshotIndex > 0) {
        snapshotIndex--
        this.snapshotIndex = snapshotIndex
        const snapshot = snapshotList[snapshotIndex]
        return JSON.parse(snapshot)
      }
    },
    // 前进继续下一步
    redo() {
      let {snapshotIndex} = this
      const {snapshotList} = this
      // 前面还有快照，则可以继续前进
      if (snapshotIndex < snapshotList.length - 1) {
        snapshotIndex++
        this.snapshotIndex = snapshotIndex
        const snapshot = snapshotList[snapshotIndex]
        return JSON.parse(snapshot)
      }
    }
  }
})
