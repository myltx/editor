<template>
  <ul class="e-tabs" :class="{'e-tabs-vertical': vertical}">
    <li class="tabs-item" v-for="(item,index) in data" :key="index" :class="{'active': index === currentIndex}" @click="switchItems(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      vertical: {
        type: Boolean,
        default: false
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItems(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .e-tabs
    display: flex
    align-items: center
    color: $color-text-l
    font-size: $font-size-medium-x
    &.e-tabs-vertical
      display: block
      .tabs-item
        padding: 12px 14px
    .tabs-item
      padding: 12px 20px
      cursor: default
    .active
      color: $color-text-ll
      background-color: $color-background-l

</style>
