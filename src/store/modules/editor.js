import { /* addPage,*/ editPage, getPageList, /* removePage,*/ getPageDetail } from '@/api'

export default {
  namespaced: true,
  state: {
    pageDetail: null,
    currentComponent: null,
    isAddStatus: false
  },
  mutations: {
    setPageDetail(state, payload) {
      state.pageDetail = payload
    },
    setCurrentComponent(state, payload) {
      state.currentComponent = payload
    },
    setAddStatus(state, payload) {
      state.isAddStatus = payload
    }
  },
  actions: {
    async getPageList(_, params) {
      const { data } = await getPageList(params)
      return data
    },
    editPage(_, payload) {
      return editPage(payload)
    },
    async getPageDetail({ commit }, { id }) {
      const { data } = await getPageDetail(id)
      commit('setPageDetail', data)
    },
    async addComponent() {

    }
  }
}
