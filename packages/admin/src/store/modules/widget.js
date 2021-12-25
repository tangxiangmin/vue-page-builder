import { getWidgetList } from '@/api'
import { createWidgetFromTemplate, createWidgetFromRemote } from '@/views/editor/core/widget'

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
        const widgetList = list.map((item) => {
          const config = {
            ...item,
            url: `http://localhost:7001/api/widget/file/${item.id}.vue` // todo 临时拼接一个host
          }
          return createWidgetFromRemote(config)
        })
        commit('setWidgetList', widgetList)
      }
    }
  }
}
