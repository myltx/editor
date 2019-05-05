<template>
  <div class="e-input">
    <span class="title">{{title}}</span>
    <el-select v-if="!hasGroup" @change="select" size="small" v-model="query" placeholder="请选择">
      <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-if="hasGroup" @change="select" size="small" v-model="query" placeholder="请选择">
      <el-option-group v-for="group in data" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
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
      data: {
        type: Array,
        default: []
      },
      keyName: {
        type: String,
        default: ''
      },
      hasGroup: {
        type: Boolean,
        default: false
      },
      defaultQuery: '',
      args: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        query: '',
        defaultquery: this.defaultQuery
      }
    },
    mounted() {
      if (this.defaultquery) {
        this.setQuery(this.defaultquery)
      }
    },
    methods: {
      setQuery(query) {
        if (query) {
          this.query = query
        }
      },
      select(label) {
        if (this.defaultquery) {
          this.defaultquery = ''
          return
        }
        if (this.keyName) {
          this.$emit('select', {[this.keyName]: label})
          return
        }
        if (this.args.id) {
          this.$emit('select', {args: this.args, label})
          return
        }
        this.$emit('select', label)
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
    background-color: $color-background-ll
    border-radius: 5px
    border: 1px solid $color-panel-background
    box-shadow: 1px 1px 1px $color-shadow
    .title
      position: relative
      width: 75px
      height: 30px
      line-height: 30px
      text-align: center
      color: $color-text-l
      font-size: $font-size-medium
      border-top-left-radius: 5px
      border-bottom-left-radius: 5px
      border-right: 1px solid $color-panel-background
    .el-select
      flex: 1
      height: 30px
      color: $color-text-ll
      font-size: $font-size-medium
      border-top-right-radius: 5px
      border-bottom-right-radius: 5px
</style>

