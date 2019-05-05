<template>
  <div class="picture-box">
    <div class="input-picture" v-for="(picture, index) in pictureList" :key="picture">
      <div @click="selectPicture(picture)" class="picture" :style="`background: url(${picture.origin_url}) 50% 50% / contain no-repeat content-box`"></div>
      <input class="ipt" :value="picture.origin_url" readonly>
      <span v-show="deleteFlag" @click="deletePic(picture, index)" class="delete">
        <i class="icon icon-delete"></i>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        deleteFlag: false
      }
    },
    props: {
      pictureList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      selectPicture(picture) {
        this.$emit('select', picture)
      },
      deletePic(picture, index) {
        this.$emit('delete', picture, index)
      }
    },
    watch: {
      pictureList(list) {
        if (list && list.length > 1) {
          this.deleteFlag = true
        } else {
          this.deleteFlag = false
        }
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .picture-box
    border: 1px solid $color-panel-background
    border-radius: 5px
    .input-picture
      display: flex
      align-items: center
      border: 0
      border-bottom: 1px solid $color-panel-background
      border-radius: 0
      width: 100%
      background-color: $color-background-ll
      box-shadow: 1px 1px 1px $color-shadow
      font-size: $font-size-medium
      &:first-child
        border-radius: 5px 5px 0 0
      &:last-child
        border-radius: 0 0 5px 5px
        border-bottom: 0
      .picture
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
        padding: 2px
        .btn
          position: absolute
          width: 100%
          height: 100%
          top: 0
          left: 0
          opacity: 0
      .ipt
        flex: 1
        height: 30px
        border: 0
        padding: 0 6px 0 10px
        color: $color-text-ll
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px
        background-color: $color-background-ll
        cursor: not-allowed
      .delete
        flex: 0 0 25px
        color: $color-text-ll
        font-size: $font-size-medium-x
        text-align: center
        border-left: 1px solid $color-panel-background
        cursor: pointer
        &:hover
          color: $color-text-l
</style>
