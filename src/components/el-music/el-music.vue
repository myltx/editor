<template>
  <div class="music">
    <span @click.stop="togglePlay" class="icon play" :class="playState">
      <i class="icon-music"></i>
    </span>
    <audio ref="audio" @ended="play" :src="previewFlag ? formatURL(music.origin_url) : ''"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {elMixin} from 'common/js/mixin'
  export default {
    mixins: [elMixin],
    props: {
      music: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        playFlag: false
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.previewFlag) {
          this.playFlag = true
        }
      }, 20)
    },
    methods: {
      togglePlay() {
        if (!this.previewFlag) {
          return
        }
        this.playFlag = !this.playFlag
      },
      play() {
        this.$refs.audio.play()
      },
      pause() {
        this.$refs.audio.pause()
      }
    },
    computed: {
      playState() {
        return this.playFlag ? '' : 'pause'
      },
      ...mapGetters(['previewFlag'])
    },
    watch: {
      playFlag(flag) {
        if (flag) {
          this.play()
        } else {
          this.pause()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .music
    position: absolute
    right: 20px
    top: 20px
    z-index: 2
    .icon
      display: flex
      width: 34px
      height: 34px
      justify-content: center
      align-items: center
      border: 1px solid #000
      border-radius: 50%
      &.play
        animation: rotate 1s infinite linear
      &.pause
        animation-play-state: paused
  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>

