export const state = {
  scene: {
    width: 320,
    height: 568,
    direction: 'vertical',
    speed: 1,
    autoPlay: 3,
    loop: false,
    backMusic: {}
  },
  pageList: [],
  currentPageIndex: 0,
  currentElementIndex: -1,
  scale: 1,
  dragFlag: false,
  previewFlag: false,
  textEditFlag: false
}

export default state