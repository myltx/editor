import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  scene: {},
  pageList: [],
  currentPageIndex: 0,
  currentElementIndex: -1,
  scale: 1,
  dragFlag: false,
  previewFlag: true,
  textEditFlag: false
}

const getters = {
  scene: state => state.scene,
  pageList: state => state.pageList,
  previewFlag: state => state.previewFlag,
  textEditFlag: state => state.textEditFlag
}

const types = {
  SET_PAGE_LIST: 'SET_PAGE_LIST',
  SET_SCENE: 'SET_SCENE'
}

const mutations = {
  [types.SET_PAGE_LIST](state, list) {
    state.pageList = list
  },
  [types.SET_SCENE](state, scene) {
    Object.assign(state.scene, scene)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug
})
