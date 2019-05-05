import Vue from 'vue'
import Router from 'vue-router'
import Editor from 'components/editor/editor'
import Preview from 'components/preview/preview'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/editor'
  }, {
    path: '/editor',
    component: Editor
  }, {
    path: '/preview',
    component: Preview
  }
  ]
})
