<template>
  <transition name="slide">
    <div class="editor">
      <div class="content">
        <page-list></page-list>
        <!-- <scroll class="edit-main" :data="list" :scrollX="true" :preventDefault="false"> -->
          <div class="edit-main">
            <div class="edit-wrapper" :style="{'transform': `scale(${scale})`}">
              <div class="edit-content" :style="{'width': `${scene.width}px`, 'height': `${scene.height}px`}">
                <el-music v-if="scene.backMusic.origin_url" :music="scene.backMusic"></el-music>
                <element-box v-for="(item, index) in elementList" :key="item.id" :element="item" :index="index">
                  <el-text v-if="item.type === 'text'" :element="item"></el-text>
                  <el-picture v-if="item.type === 'picture'" :element="item"></el-picture>
                  <el-album v-if="item.type === 'album'" :element="item"></el-album>
                  <el-video v-if="item.type === 'video'" :element="item"></el-video>
                </element-box>
              </div>
            </div>
          </div>
        <!-- </scroll> -->
        <edit-handles></edit-handles>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import PageList from 'components/page-list/page-list'
  import EditHandles from 'components/edit-handles/edit-handles'
  import Scroll from 'base/scroll/scroll'
  import ElementBox from 'components/element-box/element-box'
  import ElText from 'components/el-text/el-text'
  import ElPicture from 'components/el-picture/el-picture'
  import ElAlbum from 'components/el-album/el-album'
  import ElMusic from 'components/el-music/el-music'
  import ElVideo from 'components/el-video/el-video'
  import {mapGetters} from 'vuex'

  export default {
    // 设置name可以让路由有选择的缓存组件
    name: 'editor',
    data() {
      return {
        list: []
      }
    },
    methods: {
      selectElement(index) {
        this.setCurrentElementIndex(index)
      }
    },
    computed: {
      ...mapGetters([
        'elementList',
        'scene',
        'scale'
      ])
    },
    components: {
      PageList,
      EditHandles,
      Scroll,
      ElementBox,
      ElText,
      ElPicture,
      ElAlbum,
      ElMusic,
      ElVideo
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .editor
    position: relative
    width: 100%
    height: calc(100vh - 50px)
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(-100%, 0, 0)
    .content
      height: 100%
      min-width: 1200px
      display:flex
      .page-list
        flex: 0 0 240px
        height: 100%
        background-color: $color-panel-background
      .edit-main
        position: relative
        flex: 1
        background-color: $color-background
        overflow: auto
        .edit-wrapper
          padding: 10px
          display: inline-block
          overflow: hidden
          transform-origin: 0 0
          .edit-content
            position: relative
            background-color: #fff
            color: #222
      .edit-handles
        flex: 0 0 320px
</style>
