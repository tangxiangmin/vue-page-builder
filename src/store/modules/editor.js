import { /* addPage,*/ editPage, getPageList, /* removePage,*/ getPageDetail } from '@/api'

export default {
  namespaced: true,
  state: {
    pageDetail: null,
    currentComponent: null,
    isAddStatus: false,
    // 数据快照，用于撤销和重做
    snapshotList: [], // [s1,s2,s3,s4]
    snapshotIndex: -1

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
    },
    setSnapshotIndex(state, index) {
      state.snapshotIndex = index
    },
    setSnapshotList(state, payload) {
      state.snapshotList = payload
    }
  },
  getters: {
    canUndo(state) {
      return state.snapshotIndex > 0
    },
    canRedo(state) {
      return state.snapshotIndex < state.snapshotList.length - 1
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
    // 在组件级别的操作上记录，如新增组件，删除组件，调整排序等
    recordAction({ state, commit }, payload) {
      const { snapshotList, snapshotIndex } = state

      // todo 对payload进行深拷贝，暂时使用stringify处理
      const snapshot = JSON.stringify(payload)
      // 删除超过索引的记录
      const originList = snapshotList.slice(0, snapshotIndex + 1)
      const list = [...originList, snapshot]

      commit('setSnapshotList', list)
      commit('setSnapshotIndex', list.length - 1)
    },
    // 后退返回上一步
    undo({ state, commit }) {
      let { snapshotIndex } = state
      const { snapshotList } = state
      // 后面还有快照，则可以继续后退
      if (snapshotIndex > 0) {
        snapshotIndex--
        commit('setSnapshotIndex', snapshotIndex)
        const snapshot = snapshotList[snapshotIndex]
        return JSON.parse(snapshot)
      }
    },
    // 前进继续下一步
    redo({ state, commit }) {
      let { snapshotIndex } = state
      const { snapshotList } = state
      // 前面还有快照，则可以继续前进
      if (snapshotIndex < snapshotList.length - 1) {
        snapshotIndex++
        commit('setSnapshotIndex', snapshotIndex)
        const snapshot = snapshotList[snapshotIndex]
        return JSON.parse(snapshot)
      }
    }
  }
}
