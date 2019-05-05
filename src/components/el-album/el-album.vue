<template>
  <div ref="album" class="swiper-container" :class="containerName">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(picture, index) in element.properties.pictures" :key="picture" :style="backImage(picture)">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    props: {
      element: {
        type: Object,
        defalut() {
          return {}
        }
      }
    },
    mounted() {
      setTimeout(() => {
        if (!this.previewFlag) {
          return
        }
        this.createH5()
      }, 20)
    },
    methods: {
      createH5() {
        let properties = this.element.properties
        /* eslint-disable */
        this.h5Swiper = new Swiper(`.preview .${this.containerName}`, {
          direction: properties.direction,
          loop: properties.loop,
          speed: properties.speed * 1000,
          autoplay: properties.autoPlay * 1000,
        })
        /* eslint-enable */
      },
      backImage(picture) {
        if (window.__isServerRender === false) {
          picture.origin_url = `./static/media/${picture.origin_url.split('/').pop()}`
        }
        return `background:url(${picture.origin_url}) 50% 50% / contain no-repeat`
      }
    },
    computed: {
      containerName() {
        return `album-${this.element.id}`
      },
      ...mapGetters(['previewFlag'])
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .swiper-container
    width: 100%
    height: 100%
    .swiper-slide
      width: 100%
      height: 100%
</style>
