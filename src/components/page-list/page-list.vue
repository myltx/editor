<template>
  <div class="page-list">
    <div class="add" @click="insertNewPage" >
      <i class="icon-add"></i>
    </div>
    <scroll :data="pageList" class="list-content">
      <ul>
        <li  v-for="(page, index) in pageList" :key="page.id" class="item" :class="{'active' : currentPageIndex === index}">
          <div class="page"  @click="selectPage(index)">
            <div class="btn-bar"><span @click.stop="showConfirm(page)" v-show="pageList.length > 1" class="icon"><i class="icon-close"></i></span></div>
            <span class="text">第 {{index+1}} 页</span>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="loading-content"  v-show="pageList.length === 0">
      <loading></loading>
    </div>
    <confirm ref="confirm" @confirm="deleteItem" text="是否删除当前页？" confirmBtnText="删除"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Confirm from 'base/confirm/confirm'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {createOnlyId} from 'common/js/util'
  import {PAGE_ID_LENGTH} from 'common/js/config'
  import Page from 'common/js/page'

  export default {
    data() {
      return {}
    },
    created() {
      setTimeout(() => {
        if (this.pageList.length === 0) {
          this.addNewPage()
        }
        this.setCurrentPageIndex(0)
      }, 20)
    },
    methods: {
      showConfirm(page) {
        this.$refs.confirm.args = page
        this.$refs.confirm.show()
      },
      selectPage(index) {
        let pIndex = this.currentPageIndex
        if (pIndex === index) {
          return
        }
        this.setCurrentElementIndex(-1)
        this.setCurrentPageIndex(index)
      },
      deleteItem() {
        this.setCurrentElementIndex(-1)
        this.deletePage(this.$refs.confirm.args)
      },
      addNewPage() {
        let list = this.pageList.slice()
        const id = createOnlyId({
          list,
          len: PAGE_ID_LENGTH
        })
        list.push(new Page({id}))
        this.setPageList(list)
      },
      insertNewPage() {
        let list = this.pageList.slice()
        const id = createOnlyId({
          list,
          len: PAGE_ID_LENGTH
        })
        this.insertPage(new Page({id}))
      },
      ...mapMutations({
        setCurrentPageIndex: 'SET_CURRENT_PAGE_INDEX',
        setCurrentElementIndex: 'SET_CURRENT_ELEMENT_INDEX',
        setPageList: 'SET_PAGE_LIST',
        setElementList: 'SET_ELEMENT_LIST'
      }),
      ...mapActions(['insertPage', 'deletePage'])
    },
    computed: {
      ...mapGetters([
        'pageList',
        'currentPageIndex',
        'currentPage',
        'elementList'
      ])
    },
    components: {
      Scroll,
      Loading,
      Confirm
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .page-list
    position: relative
    .add
      position: absolute
      bottom: 0
      left: 0
      right: 0
      box-sizing: border-box
      height: 80px
      padding: 25px
      text-align: center
      background-color: $color-top-background
      font-size: $font-size-max
      &:hover + .list-content .active 
        border-bottom: 2px solid $color-text-l
    .list-content
      position: absolute
      top: 0
      left: 0
      right: 0
      z-index: 0
      height: calc(100% - 80px)
      overflow: hidden
      .item
        position: relative
        box-sizing: border-box
        border-bottom: 2px solid transparent
        width: 100%
        height: 130px
        padding: 10px 20px
        &:after
          content: ''
          position: absolute
          left: -20px
          top: 55px
          border-left: 20px solid #fff
          border-right: 0 solid transparent
          border-top: 10px solid transparent
          border-bottom: 10px solid transparent
          transition: all 0.2s  
        .page
          position: relative
          display: flex
          justify-content: center
          align-items: center
          width: 100%
          height: 100%
          background-color: $color-background-l
          transition: all .2s
          overflow: hidden
          &:hover
            background-color: $color-background-ll
          &:hover .btn-bar
            transform: translateY(0)
            opacity: 1
          .text
            cursor: default
            font-size: $font-size-medium-x
          .btn-bar
            position: absolute
            top: 0
            left: 0
            padding: 4px
            width: 100%
            box-sizing: border-box
            text-align:right
            transform: translateY(-100%)
            opacity: 0
            transition: all .2s
            .icon
              extend-click()
      .active
        &:after
          transform: translate(20px)
        .page
          background-color: $color-background-ll
          .btn-bar
            transform: translateY(0)
            opacity: 1
    .loading-content
      position: absolute
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0)
</style>
