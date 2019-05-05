import * as types from './mutation-types'

export const insertPage = function({commit, state}, page) {
  // 获取页面列表
  let list = state.pageList.slice()
  // 获取当前页面下标
  let currentPageIndex = state.currentPageIndex
  // 因为是插入，所以需要自增1
  currentPageIndex++
  // 插入新页面
  list.splice(currentPageIndex, 0, page)
  // 设置页面列表
  commit(types.SET_PAGE_LIST, list)
  // 将当前元素清空
  commit(types.SET_CURRENT_ELEMENT_INDEX, -1)
  // 设置当前页面下标
  commit(types.SET_CURRENT_PAGE_INDEX, currentPageIndex)
}

export const deletePage = function({commit, state, getters}, page) {
  // 获取页面列表
  let list = state.pageList.slice()
  // 获取删除的页面下标
  let pIndex = findIndex(list, page)
  // 获取当前页面下标
  let currentPageIndex = state.currentPageIndex
  // 从列表中移除页面
  list.splice(pIndex, 1)
  // 如果删除的页面在当前页面前面或者当前页面是最后一个，那么当前页面的下标往前移一位
  if (pIndex < currentPageIndex || currentPageIndex === list.length) {
    currentPageIndex--
  }
  // 设置页面列表
  commit(types.SET_PAGE_LIST, list)
  // 设置当前页面下标
  commit(types.SET_CURRENT_PAGE_INDEX, currentPageIndex)
}

// 添加元素currentElementIndex为elementList.length-1
// 接受一个构建好的元素，然后添加到列表中
export const addElement = function({commit, getters}, element) {
  // 获取元素列表
  let list = getters.elementList.slice()
  // 获取元素列表长度，也就是新元素的下标值
  let index = getters.elementList.length
  // 将元素添加进入列表
  list.push(element)
  // 设置元素列表
  commit(types.SET_ELEMENT_LIST, list)
  // 设置元素下标
  commit(types.SET_CURRENT_ELEMENT_INDEX, index)
}

// 删除元素那currentElementIndex为-1
export const deleteElement = function({commit, getters}, element) {
  let list = getters.elementList.slice()
  let index = findIndex(list, element)
  list.splice(index, 1)
  commit(types.SET_CURRENT_ELEMENT_INDEX, -1)
  commit(types.SET_ELEMENT_LIST, list)
}

export const addAnimation = function({commit, getters}, animation) {
  let list = getters.currentElementAnimations.slice()
  list.push(animation)
  commit(types.SET_CURRENT_ELEMENT_PROPERTIES, {animations: list})
}

export const deleteAnimation = function({commit, getters}, animation) {
  let list = getters.currentElementAnimations.slice()
  let index = findIndex(list, animation)
  list.splice(index, 1)
  commit(types.SET_CURRENT_ELEMENT_PROPERTIES, {animations: list})
}

export const setAnimation = function({commit, getters}, animation) {
  let list = getters.currentElementAnimations.slice()
  let index = findIndex(list, animation)
  commit(types.SET_ANIMATION, {index, animation})
}

export const addPictureToAlbum = function({commit, getters}, picture) {
  let list = getters.currentElementProperties.pictures.slice()
  list.push(picture)
  commit(types.SET_CURRENT_ELEMENT_PROPERTIES, {pictures: list})
}

export const deletePictureToAlbum = function({commit, getters}, index) {
  let list = getters.currentElementProperties.pictures.slice()
  list.splice(index, 1)
  commit(types.SET_CURRENT_ELEMENT_PROPERTIES, {pictures: list})
}

function findIndex(list, obj) {
  return list.findIndex((item) => {
    return item.id === obj.id
  })
}
