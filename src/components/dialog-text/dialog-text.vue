<template>
  <ul class="text">
    <li><a @click="addTextSmall" class="text-small">小号字</a></li>
    <li><a @click="addTextMedium" class="text-medium">中号字</a></li>
    <li><a @click="addTextLarge" class="text-large">大号字</a></li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      addTextSmall() {
        let query = {
          text: "<p><span style='font-size: 16px'>小号字</span></p>",
          size: 'small'
        }
        this.$emit('select', query)
      },
      addTextMedium() {
        let query = {
          text: "<p><span style='font-size: 24px'>中号字</span></p>",
          size: 'medium'
        }
        this.$emit('select', query)
      },
      addTextLarge() {
        let query = {
          text: "<p><span style='font-size: 36px'>大号字</span></p>",
          size: 'large'
        }
        this.$emit('select', query)
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .text
    a
      display: block
      box-sizing: border-box
      width: 100%
      line-height: 50px
      color: $color-text-ll
      padding-left: 10px
      vertical-align: middle
      border-bottom: 1px solid $color-text-l
      &:hover
        background-color: $color-background-l
    .text-small
      font-size: 12px
    .text-medium
      font-size: 20px
    .text-large
      font-size: 32px
      border-bottom: 1px solid transparent
</style>

