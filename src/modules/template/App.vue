<template>
  <div id="template" class="preview">
    <div class="swiper-container template-container" :style="[sceneStyle]">
      <el-music v-if="scene.backMusic.origin_url" :music="scene.backMusic"></el-music>
      <div class="swiper-wrapper">
        <div-box ref="pageList" class="swiper-slide" v-for="page in pageList" :key="page.id">
          <element-box ref="elementList" class="element-box" v-for="(element,index) in page.elements" :key="element.id" :element="element" :preview='true'>
            <el-text v-if="element.type === 'text'" :element="element"></el-text>
            <el-picture v-if="element.type === 'picture'" :element="element"></el-picture>
            <el-album v-if="element.type === 'album'" :element="element"></el-album>
            <el-video v-if="element.type === 'video'" :element="element"></el-video>
          </element-box>
        </div-box>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElementBox from 'components/element-box/element-box'
  import ElText from 'components/el-text/el-text'
  import ElPicture from 'components/el-picture/el-picture'
  import ElAlbum from 'components/el-album/el-album'
  import ElMusic from 'components/el-music/el-music'
  import ElVideo from 'components/el-video/el-video'
  import DivBox from 'base/div-box/div-box'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    created() {
      this.setScene(window.templateData.scene)
      this.setPageList(window.templateData.pageList)
    },
    mounted() {
      this.$nextTick(() => {
        this.setViewport()
        this.createH5()
      })
    },
    methods: {
      createH5() {
        if (window.templateData.scene === undefined) {
          alert('页面加载失败')
          return
        }
        /* eslint-disable */
        this.h5Swiper = new Swiper('.template-container', {
          direction: this.scene.direction,
          loop: this.scene.loop,
          speed: this.scene.speed * 1000,
          autoplay: this.scene.autoPlay * 1000,
          onSlideChangeEnd: (swiper) => {
            let sIndex = swiper.activeIndex
            let len = this.$refs.pageList.length
            let index
            if (this.scene.loop) {
              index = sIndex > len ? 0 : sIndex === 0 ? len - 1 : sIndex - 1
            } else {
              index = sIndex
            }
            this.$refs.pageList[index].$children.forEach((element) => {
              element.playAnimations()
            })
          },
          onInit: (swiper) => {
            if (!this.scene.loop) {
              let sIndex = swiper.activeIndex
              let len = this.$refs.pageList.length
              this.$refs.pageList[sIndex].$children.forEach((element) => {
                element.playAnimations()
              })
            }
          }
        })
        /* eslint-enable */
      },
      setViewport() {
        let viewport = document.querySelector('meta[name=viewport]')
        viewport.setAttribute('content', `width=${this.scene}`)
      },
      ...mapMutations({
        setScene: 'SET_SCENE',
        setPageList: 'SET_PAGE_LIST'
      })
    },
    computed: {
      sceneStyle() {
        return {
          width: this.scene.width + 'px',
          height: this.scene.height + 'px'
        }
      },
      ...mapGetters(['previewFlag', 'scene', 'pageList'])
    },
    components: {
      ElementBox,
      ElText,
      ElPicture,
      ElAlbum,
      ElMusic,
      ElVideo,
      DivBox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .preview
    position: relative
    width: 100vw
    height: 100vh
    z-index: 100
    background-color: $color-background
    overflow: auto
    padding: 10px
    .loading-content
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      display: flex
      align-items: center
      justify-content: center
      background-color: $color-background-d
      z-index: 100
    .swiper-container
      margin: 0 auto
      background-color: #fff
      color: #000
</style>

