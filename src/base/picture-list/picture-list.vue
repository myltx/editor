<template>
  <div class="picture-list">
    <div class="list-control" v-if="isControl">
      <el-button @click="showDelete"  v-if="!deleteFlag && isControl" size="small">管理</el-button>
      <el-button @click="cancelDelete" v-if="deleteFlag && isControl" size="small">取消管理</el-button>
      <el-button @click="clearList" v-if="deleteFlag && isControl" size="small" type="danger">清空</el-button>
      <el-button @click="deleteItem" v-if="deleteFlag && isControl" size="small" type="danger">删除</el-button>
    </div>
    <ul class="list-content">
      <li class="item" v-for="(item,index) in data" :key="item.id">
        <a class="item-link" @click.stop="selectPicture(item)"><img v-lazy="item.origin_url" alt=""></a>
        <div ref="shadowItems" @click.stop="selectItems(item, index)" v-if="deleteFlag && isControl" class="shadow el-icon-circle-check"></div>
      </li>
    </ul>
  </div>
</template>

 <script type="text/ecmascript-6">
  import Confirm from 'base/confirm/confirm'
  import {addClass, removeClass} from 'common/js/dom'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      isControl: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        deleteFlag: false,
        selectList: []
      }
    },
    methods: {
      hideDelete() {
        this.deleteFlag = false
        this.selectList = []
      },
      showDelete() {
        this.deleteFlag = true
      },
      selectPicture(item) {
        this.$emit('select', item)
      },
      cancelDelete() {
        this.hideDelete()
      },
      clearList() {
        if (this.data.length === 0) {
          return
        }
        this.$emit('clear')
      },
      deleteItem() {
        if (this.selectList.length === 0) {
          this.$message('请选择图片进行删除')
          return
        }
        this.$emit('delete', this.selectList)
      },
      selectItems(picture, index) {
        let target = this.$refs.shadowItems[index]
        let list = this.selectList
        let sIndex = this._findIndex(list, picture)
        console.log(picture)
        if (sIndex < 0) {
          list.push(picture)
          addClass(target, 'selected')
        } else {
          list.splice(sIndex, 1)
          removeClass(target, 'selected')
        }
      },
      isSelected(picture) {
        return this._findIndex(this.selectList, picture) >= 0
      },
      _findIndex(list, picture) {
        return list.findIndex((item) => {
          return item.id === picture.id
        })
      }
    },
    components: {
      Confirm
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .picture-list
    display: flex
    flex-direction: column
    justify-content: center
    height: 360px
    overflow:hidden
    .list-content
      height: 330px
      .item
        position: relative
        display: inline-block
        background-color: $color-background-ll
        margin: 8px
        vertical-align: middle
        .item-link
          display: flex
          width: 94px
          height: 94px
          align-items: center
          justify-content: center
          img
            max-width: 100%
            max-height: 100%
        .shadow
          position: absolute
          top: 0
          right: 0
          bottom: 0
          left: 0
          background: $color-background-d
          border: 1px solid $color-text-d
          font-size: $font-size-large
          color: $color-text-l
          padding: 5px
          z-index: 1
          &.selected
            color: $color-theme
    .list-control
      display: flex
      padding: 5px 5px 0
</style>

