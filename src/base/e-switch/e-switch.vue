<template>
  <div class="e-switch">
    <span class="title">{{title}}</span>
    <div @click="toggleFlag" class="content">
      <div class="toggle-switch" :class="flag ? 'switch-on' : 'switch-off'">
        <span class="switch-left">{{onText}}</span>
        <span class="switch-blank"></span>
        <span class="switch-right">{{offText}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      offText: {
        type: String,
        default: 'OFF'
      },
      onText: {
        type: String,
        default: 'ON'
      },
      keyName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        flag: false
      }
    },
    methods: {
      setQuery(flag) {
        this.flag = !!flag
      },
      toggleFlag() {
        this.flag = !this.flag
        if (this.keyName) {
          this.$emit('change', {[this.keyName]: this.flag})
          return
        }
        this.$emit('change', this.flag)
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .e-switch
    display: flex
    align-items: center
    width: 100%
    background-color: $color-background-ll
    border-radius: 5px
    border: 1px solid $color-panel-background
    box-shadow: 1px 1px 1px $color-shadow
    font-size: $font-size-medium
    .title
      position: relative
      flex: 0 0 75px
      height: 30px
      line-height: 30px
      text-align: center
      color: $color-text-l
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
      border-right: 1px solid $color-panel-background
      letter-spacing: 1px
    .content
      flex: 1
      overflow: hidden
      .toggle-switch
        position: relative
        width: 100%
        height: 30px
        font-size: 0
        &.switch-on
          .switch-blank
            position: absolute
            left: 50%
            transition: all .3s
        &.switch-off
          .switch-blank
            left: 0
        span
          display: inline-block
          width: 50%
          height: 30px
          line-height: 30px
          text-align: center
          color: $color-text-ll
          font-size: $font-size-medium
          cursor: pointer
        .switch-left
          background-color: $color-theme
        .switch-right
          background-color: $color-text-l
          border-radius: 0 5px 5px 0
        .switch-blank
          position: absolute
          transition: all .3s
          z-index: 1
          background-color: $color-background-ll
</style>

