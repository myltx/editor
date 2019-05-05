<template>
  <div ref="box" class="element-box" :class="idPerfix + element.id" :style="position" @click.stop @mousedown="mouseStart" :tabindex="index"  @keyup.delete="removeElement(element)">
    <div class="element-content" :style="style">
      <slot></slot>
    </div>
    <select-box class="select-box" :element="element" v-if="!preview" v-show="index === currentElementIndex && index !== -1"></select-box>
    <div ref="shadow" v-show="moving" v-if="!preview" class="shadow"></div>
  </div>
</template>

<script type="exmascript-6">
  import SelectBox from 'components/select-box/select-box'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playAnimations} from 'common/js/dom'

  export default {
    props: {
      element: {
        type: Object,
        default() {
          return {}
        }
      },
      preview: {
        type: Boolean,
        default: false
      },
      // 元素默认序列号
      index: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        css: {},
        move: {},
        offsetLeft: 0,
        offsetTop: 0,
        moveStart: false,
        moving: false,
        animations: [],
        idPerfix: ''
      }
    },
    created() {
      this.css = this.element.css
      this.animations = this.element.properties.animations
      if (this.preview) {
        this.idPerfix = 'prev_'
      }
    },
    mounted() {

    },
    methods: {
      playAnimations() {
        playAnimations(this.idPerfix + this.element.id, this.animations)
      },
      mouseStart(e) {
        if (this.preview || this.textEditFlag) {
          return
        }
        if (this.currentElementIndex !== this.index) {
          this.setCurrentElementIndex(this.index)
        }
        this.moveStart = true
        this.move.startX = e.pageX
        this.move.startY = e.pageY
        document.querySelector('.edit-wrapper').addEventListener('mousemove', this.mouseMove)
        document.addEventListener('mouseup', this.mouseEnd)
        this.$refs.box.addEventListener('mouseup', this._dragUp)
      },
      mouseMove(e) {
        if(!this.moveStart) {
          return
        }
        if (!this.dragFlag) {
          this.setDragFlag(true)
        }
        this.moving = true
        const deltaX = (e.pageX - this.move.startX) / this.scale
        const deltaY = (e.pageY - this.move.startY) / this.scale
        // this.offsetLeft = Math.min(this.scene.width - this.css.width - this.css.left, Math.max(-this.css.left, deltaX))
        // this.offsetTop = Math.min(this.scene.height - this.css.height - this.css.top, Math.max(-this.css.top, deltaY))
        this.offsetLeft = deltaX
        this.offsetTop = deltaY
        this._offset(this.offsetLeft , this.offsetTop)
      },
      mouseEnd(e) {
        if(!this.moveStart) {
          document.querySelector('.edit-wrapper').addEventListener('mousemove', this.mouseMove)
          document.addEventListener('mouseup', this.mouseEnd)
          return
        }
        this.setCurrentElementCss({
          top: this.css.top + this.offsetTop,
          left: this.css.left + this.offsetLeft
        })
        this._offset(0, 0)
        this.offsetLeft = 0
        this.offsetTop = 0
        this.moveStart = false
        this.moving = false
        document.removeEventListener('mouseup', this.mouseEnd)
        document.querySelector('.edit-wrapper').removeEventListener('mousemove', this.mouseMove)
      },
      removeElement(element) {
        if (this.preview) {
          return
        }
        this.deleteElement(element)
      },
      // 当鼠标在元素内弹起的时候，就设置为false，这样可以避免点击两次空白才能去掉select-box的问题
      _dragUp() {
        if (this.dragFlag) {
          this.setDragFlag(false)
        }
        this.$refs.box.removeEventListener('mouseup', this._dragUp)
      },
      _offset(offsetLeft,offsetTop) {
        this.$refs.shadow.style.transform = `rotate(-${this.css.rotate}deg) translate3d(${offsetLeft}px, ${offsetTop}px, 0) rotate(${this.css.rotate}deg)`
      },
      ...mapMutations({
        setCurrentElementCss: 'SET_CURRENT_ELEMENT_CSS',
        setCurrentElementIndex: 'SET_CURRENT_ELEMENT_INDEX',
        setDragFlag: 'SET_DRAG_FLAG'
      }),
      ...mapActions(['deleteElement'])
    },
    computed: {
      position() {
        return {
          top: `${this.css.top}px`,
          left: `${this.css.left}px`,
          width: `${this.css.width}px`,
          height: `${this.css.height}px`,
          zIndex: this.css.zIndex,
          opacity: this.css.opacity,
          transform: `rotate(${this.css.rotate}deg)`
        }
      },
      style() {
        return {
          backgroundColor: this.css.backgroundColor,
          borderWidth: `${this.css.borderWidth}px`,
          borderStyle: this.css.borderStyle,
          borderColor: this.css.borderColor,
          borderRadius: `${this.css.borderRadius}px`,
          boxShadow: `${this.css.boxShadowX}px ${this.css.boxShadowY}px ${this.css.boxShadowBlur}px ${this.css.boxShadowSize}px ${this.css.boxShadowColor}`,
          color:"#676767",
          fontSize: `${this.css.fontSize}px`,
          textAlign: `${this.css.textAlign}`
        }
      },
      ...mapGetters(['currentElementIndex', 'scale', 'scene', 'dragFlag', 'textEditFlag'])
    },
    components: {
      SelectBox
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .element-box
    position: absolute
    user-select: none
    outline: none
    .element-content
      width: 100%
      height: 100%
      z-index: 0
      overflow: hidden
    .select-box
      z-index: 1
    .shadow
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background-color: $color-background-d
</style>

