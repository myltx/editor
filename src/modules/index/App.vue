<template>
  <div id="app" @click="clickBlank">
    <m-header></m-header>
    <keep-alive include="editor">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    methods: {
      clickBlank(e) {
        // 保证能在其他函数运行完后再进行操作
        setTimeout(() => {
          if (this.dragFlag) {
            this.setDragFlag(false)
            return
          }
          if (this.currentElementIndex !== -1) {
            this.setCurrentElementIndex(-1)
          }
        }, 20)
      },
      ...mapMutations({
        setCurrentElementIndex: 'SET_CURRENT_ELEMENT_INDEX',
        setDragFlag: 'SET_DRAG_FLAG'
      })
    },
    computed: {
      ...mapGetters([
        'currentElementIndex',
        'dragFlag'
      ])
    },
    components: {
      MHeader
    }
  }
</script>

<style>

</style>
