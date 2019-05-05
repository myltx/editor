<template>
  <div class="music-list">
    <div class="list-content">
      <div class="item" :class="item.origin_url === selectMusic.origin_url ? 'select' : ''" @click.stop="selectItem(item)" v-for="(item, index) in data" :key="item">
        <div class="title">{{item.filename}}</div>
        <div class="btns">
          <span class="icon" v-if="isControl" @click.stop="deleteItem(item)">
            <i class="icon-delete"></i>
          </span>
          <span class="icon" @click.stop="playMusic(item)">
            <i :class="item.origin_url === playingMusic.origin_url ? 'icon-pause' : 'icon-caret-right'"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      playingMusic: {
        type: Object,
        default() {
          return {}
        }
      },
      selectMusic: {
        type: Object,
        default() {
          return {}
        }
      },
      isControl: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      playMusic(item) {
        this.$emit('play', item)
      },
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteItem(item) {
        this.$emit('delete', item)
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .music-list
    height: 310px
    font-size: $font-size-medium
    .list-content
      flex: 1
      .item
        height: 30px
        line-height: 30px
        padding: 0 5px
        cursor: pointer
        color: $color-text-l
        &.select, &:hover
          background: $color-background-ll
          color: $color-text-ll
        .title
          display: inline-block
          width: 490px
          no-wrap()
        .btns
          float: right
          .icon
            margin-right: 6px
            extend-click()
</style>
