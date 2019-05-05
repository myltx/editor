<template>
  <div class="dialog">
    <div class="dialog-header">
      <span class="title"></span>
      <i class="icon icon-close"></i>
    </div>
    <div class="dialog-content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number,
        default: 400
      }
    }
  }
</script>

<style lang="stylus">
  @import "~common/stylus/variable"

  .dialog
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    &.dialog-fade-enter-active
      animation: dialog-fadein 0.3s
      .dialog-content
        animation: dialog-zoom 0.3s
    .dialog-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .dialog-content
        width: 270px
        border-radius: 13px
        background: $color-dialog-background
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
          color: $color-text-l
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            border-top: 1px solid $color-background-d
            color: $color-text-d
            cursor: pointer
            &.left
              border-right: 1px solid $color-background-d

  @keyframes dialog-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes dialog-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
