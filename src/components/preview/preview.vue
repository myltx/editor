<template>
  <transition name="slide">
    <div class="preview">
      <transition name="fade">
        <div class="swiper-container preview-container" :style="[sceneStyle]">
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
      </transition>
    </div>
  </transition>
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
    name: 'preview',
    mounted() {
      this.$nextTick(() => {
        if (!this.PreviewFlag) {
          this.setPreviewFlag(true)
        }
        this.createH5()
      })
    },
    methods: {
      createH5() {
        /* eslint-disable */
        this.h5Swiper = new Swiper('.preview-container', {
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
                console.log(element)
                element.playAnimations()
              })
            }
          }
        })
        /* eslint-enable */
      },
      ...mapMutations({
        setPreviewFlag: 'SET_PREVIEW_FLAG'
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
    watch: {
      showFlag(flag) {
        if (flag) {
          setTimeout(() => {
            this.createH5()
          }, 20)
        }
      }
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
    position: fixed
    top: 50px
    bottom: 0
    width: 100%
    z-index: 100
    background-color: $color-background
    overflow: auto
    padding: 10px
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
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
