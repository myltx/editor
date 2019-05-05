<template>
  <div class="el-video">
    <video v-if="previewFlag" :src="element.properties.origin_url" height="100%" width="100%" controls="controls"></video>
    <div class="preview" v-if="!previewFlag" :style="backgroundImage">
      <i class="icon icon-caret-right"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {elMixin} from 'common/js/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [elMixin],
    props: {
      element: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      backgroundImage() {
        return {
          background: `url(${this.element.preview_url}) 50% 50% / contain no-repeat content-box content-box`
        }
      },
      ...mapGetters(['previewFlag'])
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .el-video
    position: relative
    width: 100%
    height: 100%
    .preview
      display: block
      position: relative
      width: 100%
      height: 100%
      .icon
        position: absolute
        top: 50%
        left: 50%
        padding: 4px
        transform: translate3d(-50%, -50%, 0)
        border: 2px solid #333
        border-radius: 50%
        color: #333
</style>

