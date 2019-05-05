<template>
  <div ref="editContainer" @keyup.stop @dblclick.stop="startEdit" :contenteditable="textEditFlag" v-html="element.properties.text">
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
    methods: {
      startEdit() {
        this.setTextEditFlag(true)
        this._createSelection()
        document.addEventListener('click', this.endEdit)
      },
      endEdit() {
        this.setTextEditFlag(false)
        this.setCurrentElementProperties({text: this.$el.innerHTML})
        document.removeEventListener('click', this.endEdit)
      },
      _createSelection() {
        let range = document.createRange()
        range.selectNodeContents(this.$el)
        range.setStart(this.$el, 0)
        range.setEnd(this.$el, this.$el.childNodes.length)
        let selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      },
      ...mapMutations({
        setTextEditFlag: 'SET_TEXT_EDIT_FLAG',
        setCurrentElementProperties: 'SET_CURRENT_ELEMENT_PROPERTIES'
      })
    },
    computed: {
      ...mapGetters(['textEditFlag'])
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  div
    overflow: hidden
    width: 100%
    height: 100%
    outline: none
    user-select: none
    cursor: default
    word-wrap: break-word
  
    
</style>
