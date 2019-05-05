export const scene = state => state.scene

export const pageList = state => state.pageList

export const currentPageIndex = state => state.currentPageIndex

export const currentElementIndex = state => state.currentElementIndex

export const scale = state => state.scale

export const dragFlag = state => state.dragFlag

export const previewFlag = state => state.previewFlag

export const currentPage = (state) => {
  return state.pageList[state.currentPageIndex] || {}
}

export const elementList = (state, getters) => {
  return getters.currentPage ? getters.currentPage.elements : []
}

export const currentElement = (state, getters) => {
  if (state.currentElementIndex < 0) {
    return {}
  }
  return getters.elementList[state.currentElementIndex]
}

export const currentElementCss = (state, getters) => {
  if (state.currentElementIndex < 0) {
    return {}
  }
  return getters.currentElement.css
}

export const currentElementAnimations = (state, getters) => {
  if (state.currentElementIndex < 0) {
    return []
  }
  return getters.currentElement.properties.animations
}

export const currentElementProperties = (state, getters) => {
  if (state.currentElementIndex < 0) {
    return {}
  }
  return getters.currentElement.properties
}

export const currentElementType = (state, getters) => {
  if (state.currentElementIndex < 0) {
    return []
  }
  return getters.currentElement.type
}

export const backMusic = state => state.scene.backMusic

export const textEditFlag = state => state.textEditFlag