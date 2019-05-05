// 让项目能编译es6语法
import 'babel-polyfill'
import Vue from 'vue'
import {Button, Select, ColorPicker, Popover, Collapse, CollapseItem, Option, InputNumber, OptionGroup, Pagination, Message} from 'element-ui'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'

// 引入样式
import 'common/css/animate.css'
import 'common/stylus/index.styl'
import 'common/element-theme/base.styl'
import 'common/element-theme/button.styl'
import 'common/element-theme/color-picker.styl'
import 'common/element-theme/collapse.styl'
import 'common/element-theme/collapse-item.styl'
import 'common/element-theme/input-number.styl'
import 'common/element-theme/message.styl'
import 'common/element-theme/option.styl'
import 'common/element-theme/popover.styl'
import 'common/element-theme/pagination.styl'
import 'common/element-theme/select.styl'

// 按需引入Element
Vue.use(Button)
Vue.use(Select)
Vue.use(ColorPicker)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(InputNumber)
Vue.use(Pagination)

Vue.use(VueLazyload, {
  loading: require('common/image/ripple.svg'),
  error: require('common/image/img.png')
})

Vue.prototype.$message = Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
