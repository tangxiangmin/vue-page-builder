import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor'
import widget from './modules/widget'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    editor,
    widget
  }

})

export default store
