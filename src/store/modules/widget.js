import { getWidgetList } from '@/api'
import { createWidgetFromTemplate } from '@/views/editor/core/widget'

export default {
  namespaced: true,
  state: {
    widgetList: []
  },
  mutations: {
    setWidgetList(state, payload) {
      state.widgetList = payload
    }
  },
  actions: {
    async getWidgetList({ commit }) {
      const params = { pageSize: 100, pageNum: 1 }
      const { data: { list }} = await getWidgetList(params)
      if (Array.isArray(list)) {
        const widgetList = list.map(createWidgetFromTemplate)
        commit('setWidgetList', widgetList)
      }
    }
  }
}
