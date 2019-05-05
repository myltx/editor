<template>
  <div class="box">
    <e-input ref='widthInput' :isPositive="true" @query="widthChange" class="line" title="宽度" placeholder="请输入页面宽度（单位：px）"></e-input>
    <e-input ref='heightInput' :isPositive="true" @query="heightChange" class="line" title="高度" placeholder="请输入页面高度（单位：px）"></e-input>
    <e-select ref="scale" @select="scaleChange" class="line" title="缩放" :data="list"></e-select>
  </div>
</template>

 <script type="text/ecmascript-6">
  import EInput from 'base/e-input/e-input'
  import ESelect from 'base/e-select/e-select'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        width: 10,
        height: 10,
        list: [
          {label: '25%', value: 0.25},
          {label: '50%', value: 0.5},
          {label: '75%', value: 0.75},
          {label: '100%', value: 1}
        ]
      }
    },
    mounted() {
      this.$refs.widthInput.setQuery(this.sceneWidth)
      this.$refs.heightInput.setQuery(this.sceneHeight)
      this.$refs.scale.setQuery(this.scale)
    },
    methods: {
      widthChange(width) {
        this.setScene({width})
      },
      heightChange(height) {
        this.setScene({height})
      },
      scaleChange(scale) {
        this.setScale(scale)
      },
      ...mapMutations({
        setScene: 'SET_SCENE',
        setScale: 'SET_SCALE'
      })
    },
    computed: {
      ...mapGetters(['scene', 'scale'])
    },
    components: {
      EInput,
      ESelect
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .box
    width: 100%
    height: 100%
    padding: 20px
    .line:not(:nth-last-child(1))
      margin: 0 0 16px 0
      

</style>

