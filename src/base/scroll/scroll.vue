<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import PScroll from 'perfect-scrollbar'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      scrollX: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        PScroll.initialize(this.$refs.wrapper, {
          suppressScrollX: this.scrollX
        })
      },
      refresh() {
        // this.scroll && this.scroll.refresh()
        PScroll.update(this.$refs.wrapper)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style lang="css" scoped>
  @import 'perfect-scrollbar.min.css'
</style>
