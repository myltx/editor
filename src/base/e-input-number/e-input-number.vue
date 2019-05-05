<template>
  <div class="e-input">
    <span class="title">{{title}}</span>
    <el-input-number @change="queryChange" class="ipt" size='small' v-model="query" :min="min" :max="max" :step="step"></el-input-number>
  </div>
</template>

<script type="text/ecmascript-6">
  import {inputMixin} from 'common/js/mixin'
  export default {
    mixins: [inputMixin],
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 10
      },
      step: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .e-input
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
      width: 75px
      height: 30px
      line-height: 30px
      text-align: center
      color: $color-text-l
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
      border-right: 1px solid $color-panel-background
      letter-spacing: 1px
    .ipt
      flex: 1
      height: 30px
      border: 0
      padding: 0
      color: $color-text-ll
      border-top-right-radius: 5px
      border-bottom-right-radius: 5px
      background-color: $color-background-ll
    .color
      color: $color-text-ll
      flex: 1
      height: 24px
      cursor: default
      
</style>

