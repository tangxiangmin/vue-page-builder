import {defineStore} from "pinia";
import {
  addPage, getPageList, removePage, getPageDetail,
  getWidgetList,
} from '../api/pageEditor'


export const usePageEditorStore = defineStore({
  id: 'pageEditor',
  state: () => {
    return {}
  },
  getters: {},
  actions: {
    async getPageDetail(id: string) {
      const {data} = await getPageDetail(id)
      data.content = JSON.parse(data.content)
      return data
    },
    async getPageList() {
      const {data} = await getPageList({pageNum: 1, pageSize: 15})
      const {list} = data
      const host = 'https://demo.shymean.com'
      list.forEach((row: any) => {
        row.link = `${host}/#/template?id=${row.id}`
      })
      return list
    },
    async getWidgetList() {
      const {data} = await getWidgetList({pageNum: 1, pageSize: 15})
      return data
    }
  }
})
