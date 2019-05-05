<template>
  <div class="select-box" @mousedown.stop="mouseStart">
    <!-- t:top r:right b:bottom l:left -->
    <!-- 上 -->
    <div type="t" class="line line-n"></div>
    <!-- 右 -->
    <div type="r" class="line line-e"></div>
    <!-- 下 -->
    <div type="b" class="line line-s"></div>
    <!-- 左 -->
    <div type="l" class="line line-w"></div>
    <!-- 左上 -->
    <div type="tl" class="circle circle-nw"></div>
    <!-- 右上 -->
    <div type="tr" class="circle circle-ne"></div>
    <!-- 右下 -->
    <div type="br" class="circle circle-se"></div>
    <!-- 左下 -->
    <div type="bl" class="circle circle-sw"></div>
    <div ref="shadow" v-show="resizeFlag" class="shadow"></div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    props: {
      element: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        css: {},
        move: {},
        moveStart: false,
        moveType: '',
        offsetTop: 0,
        offsetLeft: 0,
        offsetWidth: 0,
        offsetHeight: 0,
        resizeFlag: false
      }
    },
    created() {
      this.css = this.element.css
    },
    methods: {
      mouseStart(e) {
        this.moveStart = true
        this.moveType = e.target.attributes.type.value
        this.move.startX = e.pageX
        this.move.startY = e.pageY
        this.offsetTop = undefined
        this.offsetLeft = undefined
        document.querySelector('.edit-wrapper').addEventListener('mousemove', this.mouseMove)
        document.addEventListener('mouseup', this.mouseEnd)
      },
      mouseMove(e) {
        if (!this.moveStart) {
          return
        }
        this.resizeFlag = true
        // 为了屏蔽mouseup后在document上触发的click事件
        this.dragFlag || this.setDragFlag(true)
        const deltaX = (e.pageX - this.move.startX) / this.scale
        const deltaY = (e.pageY - this.move.startY) / this.scale
        switch (this.moveType) {
          case 't':
            this.offsetTop = this.newTop(deltaY)
            this.offsetHeight = this.newHeight(deltaY)
            this._resizeShadow({
              top: this.offsetTop,
              height: this.offsetHeight
            })
            break
          case 'b':
            this.offsetHeight = this.newHeight(deltaY)
            this._resizeShadow({
              height: this.offsetHeight
            })
            break
          case 'l':
            this.offsetLeft = this.newLeft(deltaX)
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              left: this.offsetLeft,
              width: this.offsetWidth
            })
            break
          case 'r':
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              width: this.offsetWidth
            })
            break
          case 'tl':
            this.offsetTop = this.newTop(deltaY)
            this.offsetHeight = this.newHeight(deltaY)
            this.offsetLeft = this.newLeft(deltaX)
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              top: this.offsetTop,
              left: this.offsetLeft,
              height: this.offsetHeight,
              width: this.offsetWidth
            })
            break
          case 'tr':
            this.offsetTop = this.newTop(deltaY)
            this.offsetHeight = this.newHeight(deltaY)
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              top: this.offsetTop,
              height: this.offsetHeight,
              width: this.offsetWidth
            })
            break
          case 'br':
            this.offsetHeight = this.newHeight(deltaY)
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              height: this.offsetHeight,
              width: this.offsetWidth
            })
            break
          case 'bl':
            this.offsetHeight = this.newHeight(deltaY)
            this.offsetLeft = this.newLeft(deltaX)
            this.offsetWidth = this.newWidth(deltaX)
            this._resizeShadow({
              left: this.offsetLeft,
              height: this.offsetHeight,
              width: this.offsetWidth
            })
        }
      },
      mouseEnd(e) {
        if (!this.moveStart || !this.resizeFlag) {
          document.querySelector('.edit-wrapper').removeEventListener('mousemove', this.mouseMove)
          document.removeEventListener('mouseup', this.mouseEnd)
          return
        }
        this.setCurrentElementCss({
          width: this.offsetWidth || this.css.width,
          height: this.offsetHeight || this.css.height,
          // 保留offset 为 0 的情况
          top: this.offsetTop !== undefined ? this.offsetTop : this.css.top,
          left: this.offsetLeft !== undefined ? this.offsetLeft : this.css.left
        })
        this.resizeFlag = false
        this._resizeShadow({top: this.css.top, left: this.css.left})
        document.querySelector('.edit-wrapper').removeEventListener('mousemove', this.mouseMove)
        document.removeEventListener('mouseup', this.mouseEnd)
      },
      // 通过偏移的差值计算新的位置属性
      newTop(deltaY) {
        const css = this.css
        return Math.min(css.top + css.height, Math.max(0, css.top + deltaY))
      },
      newLeft(deltaX) {
        const css = this.css
        return Math.min(css.left + css.width, Math.max(0, css.left + deltaX))
      },
      newHeight(deltaY) {
        const css = this.css
        if (this.moveType.indexOf('t') >= 0) {
          return Math.min(css.top + css.height, Math.max(1, css.height - deltaY))
        } else if (this.moveType.indexOf('b') >= 0) {
          return Math.min(this.scene.height - css.top, Math.max(1, css.height + deltaY))
        }
      },
      newWidth(deltaX) {
        const css = this.css
        if (this.moveType.indexOf('l') >= 0) {
          return Math.min(css.left + css.width, Math.max(1, css.width - deltaX))
        } else if (this.moveType.indexOf('r') >= 0) {
          return Math.min(this.scene.width - css.left, Math.max(1, css.width + deltaX))
        }
      },
      // 修改阴影层的位置
      _resizeShadow({top, left, width, height}) {
        if (top !== undefined) {
          this.$refs.shadow.style.top = `${top - this.css.top}px`
        }
        if (left !== undefined) {
          this.$refs.shadow.style.left = `${left - this.css.left}px`
        }
        if (height !== undefined) {
          this.$refs.shadow.style.height = `${height}px`
        }
        if (width !== undefined) {
          this.$refs.shadow.style.width = `${width}px`
        }
      },
      ...mapMutations({
        setCurrentElementCss: 'SET_CURRENT_ELEMENT_CSS',
        setDragFlag: 'SET_DRAG_FLAG'
      })
    },
    computed: {
      ...mapGetters([
        'currentElementIndex',
        'scene',
        'scale',
        'dragFlag',
        'textEditFlag'
      ])
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .select-box
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    pointer-events: none
    .line
      position: absolute
      pointer-events: auto
      &:after
        content: ''
        position: absolute
        width: 12px
        height: 12px
        border: 2px solid $color-theme
        border-radius: 50%
        background-color: #fff
        pointer-events: auto
      &.line-n
        top: -4px
        left: 0
        width: 100%
        height: 5px
        border-bottom: 2px solid $color-theme
        cursor: ns-resize
        &:after
          top: -2px
          left: 50%
          transform: translateX(-50%)
      &.line-e
        top: 0
        right: -4px
        width: 5px
        height: 100%
        border-left: 2px solid $color-theme
        cursor: ew-resize
        &:after
          top: 50%
          left: -7px
          transform: translateY(-50%)
      &.line-s
        bottom: -4px
        left: 0
        width: 100%
        height: 5px
        border-top: 2px solid $color-theme
        cursor: ns-resize
        &:after
          top: -7px
          left: 50%
          transform: translateX(-50%)
      &.line-w
        top: 0
        left: -4px
        width: 5px
        height: 100%
        border-right: 2px solid $color-theme
        cursor: ew-resize
        &:after
          top: 50%
          left: -2px
          transform: translateY(-50%)
    .circle
      content: ''
      position: absolute
      width: 12px
      height: 12px
      border: 2px solid $color-theme
      border-radius: 50%
      background-color: #fff
      pointer-events: auto
      &.circle-nw
        top: -6px
        left: -6px
        cursor: nw-resize
      &.circle-ne
        top: -6px
        right: -6px
        cursor: ne-resize
      &.circle-se
        bottom: -6px
        right: -6px
        cursor: se-resize
      &.circle-sw
        bottom: -6px
        left: -6px
        cursor: sw-resize
    .shadow
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $color-background-d
</style>
