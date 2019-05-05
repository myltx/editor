import * as types from './mutation-types'

const mutations = {
  [types.SET_PAGE_LIST](state, list) {
    state.pageList = list
  },
  [types.SET_CURRENT_PAGE_INDEX](state, index) {
    state.currentPageIndex = index
  },
  [types.SET_CURRENT_ELEMENT_INDEX](state, index) {
    state.currentElementIndex = index
  },
  [types.SET_ELEMENT_LIST](state, list) {
    state.pageList[state.currentPageIndex].elements = list
  },
  [types.SET_SCENE](state, scene) {
    Object.assign(state.scene, scene)
  },
  [types.SET_SCALE](state, scale) {
    state.scale = scale
  },
  [types.SET_CURRENT_ELEMENT_CSS](state, css) {
    let elementCss = state.pageList[state.currentPageIndex].elements[state.currentElementIndex].css
    Object.assign(elementCss, css)
  },
  [types.SET_DRAG_FLAG](state, flag) {
    state.dragFlag = flag
  },
  [types.SET_PREVIEW_FLAG](state, flag) {
    state.previewFlag = flag
  },
  [types.SET_TEXT_EDIT_FLAG](state, flag) {
    state.textEditFlag = flag
  },
  // 直接对properties中的第一级对象修改，更深层次的修改就单独指定出来修改
  [types.SET_CURRENT_ELEMENT_PROPERTIES](state, properties) {
    Object.assign(state.pageList[state.currentPageIndex].elements[state.currentElementIndex].properties, properties)
  },
  [types.SET_ANIMATION](state, {index, animation}) {
    Object.assign(state.pageList[state.currentPageIndex].elements[state.currentElementIndex].properties.animations[index], animation)
  }
}

export default mutations