export const PAGE_ID_LENGTH = 8
export const ELEMENT_ID_LENGTH = 6
export const ANIMATION_ID_LENGTH = 5
export const ELEMENT_ID_PERFIX = 'pana_'

export const elementStyle = {
  top: 100,
  left: 100,
  width: 100,
  height: 100,
  rotate: 0,
  zIndex: 1,
  opacity: 1,
  backgroundColor: '',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'rgba(0, 0, 0, 1)',
  borderRadius: 0,
  boxShadowX: 0,
  boxShadowY: 0,
  boxShadowColor: 'rgba(0, 0, 0, 0)',
  boxShadowSize: 0,
  boxShadowBlur: 0
}

export const borderStyleList = [
  {value: 'none', label: '无'},
  {value: 'solid', label: '实线'},
  {value: 'dotted', label: '点线'},
  {value: 'dashed', label: '虚线'},
  {value: 'double', label: '双线'},
  {value: 'groove', label: '凹槽'},
  {value: 'ridge', label: '垄状'},
  {value: 'inset', label: 'inset'},
  {value: 'outset', label: 'outset'}
]

export const animateList = [
  {
    label: '强调类',
    options: [
      {value: 'bounce', label: '弹跳'},
      {value: 'flash', label: '闪烁'},
      {value: 'pulse', label: '脉冲'},
      {value: 'rubberBand', label: '橡皮筋'},
      {value: 'shake', label: '抖动'},
      {value: 'swing', label: '摆动'},
      {value: 'tada', label: '闪烁'},
      {value: 'wobble', label: '晃动'},
      {value: 'jello', label: '果冻'}
    ]
  },
  {
    label: '弹跳进入类',
    options: [
      {value: 'bounceIn', label: '弹入'},
      {value: 'bounceInDown', label: '顶部弹入'},
      {value: 'bounceInLeft', label: '左部弹入'},
      {value: 'bounceInRight', label: '右部弹入'},
      {value: 'bounceInUp', label: '下部弹入'}
    ]
  }
]

export const pageDirectionList = [
  {value: 'vertical', label: '上下翻页'},
  {value: 'horizontal', label: '左右翻页'}
]

export const elementDirectionList = [
  {value: 'vertical', label: '上下翻页'},
  {value: 'horizontal', label: '左右翻页'}
]

export const scaleList = [
  {label: '25%', value: 0.25},
  {label: '50%', value: 0.5},
  {label: '75%', value: 0.75},
  {label: '100%', value: 1}
]

export const fontFamilyList = [
  {label: '微软雅黑', value: 'Micorsoft YaHei'}
]