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
      const {data} = await getPageList({pageNum: 1, pageSize: 15})
      const {list} = data
      const host = 'http://localhost:9988'
      list.forEach((row: any) => {
        row.link = `${host}/template?id=${row.id}`
      })
      return list
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
      console.log(widget)
      let list = this.pageWidgetList
      console.log(list)
      let idx = list.indexOf(widget)
      console.log(idx)
      list.splice(idx, 1)
    }
  }
})
