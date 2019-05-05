import Vue from 'vue'
import App from './App.vue'
import store from './store'

import 'common/css/animate.css'
import 'common/stylus/index.styl'
/* eslint-disable no-new */
new Vue({
  el: '#template',
  render: h => h(App),
  store
})