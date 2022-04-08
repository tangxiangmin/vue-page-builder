import {defineStore} from "pinia";
import {
  addPage, getPageList, removePage, getPageDetail,
  getWidgetList,
} from '../api/pageEditor'
import {IPage, IWidgetConfig} from "../typings";
import BaseWidget from "../views/pageEditor/core/baseWidget";


type PageEditorState = {
  currentPage: IPage | null,
  currentWidget: BaseWidget | null
}

export const usePageEditorStore = defineStore({
  id: 'pageEditor',
  state: (): PageEditorState => {
    return {
      currentPage: null,
      currentWidget: null
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
      data.content = JSON.parse(data.content)

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
        row.link = `http://localhost:7001/api/widget/file/${row.id}.vue`
        row.configLink = `http://localhost:7001/api/widget/file_config/${row.id}.vue`
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
    }
  }
})
