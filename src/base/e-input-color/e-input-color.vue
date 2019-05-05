<template>
  <div class="e-input">
    <span class="title">{{title}}</span>
      <el-color-picker ref="picker" v-model="query" @change="queryChange" show-alpha></el-color-picker> 
      <span @click.stop="togglePicker" class="color">{{query}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      keyName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      setQuery(query) {
        this.query = query
      },
      togglePicker() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$refs.picker.showPicker = !this.$refs.picker.showPicker
        }, 20)
      },
      queryChange() {
        let query = this.query
        if (this.keyName) {
          this.$emit('query', {[this.keyName]: query})
          return
        }
        this.$emit('query', query)
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
    height: 30px
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
    .color
      color: $color-text-ll
      flex: 1
      height: 24px
      cursor: default
      
</style>

