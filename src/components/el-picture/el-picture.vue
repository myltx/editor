<template>
  <img :src="formatURL(element.properties.origin_url)" :alt="element.filename">
</template>

<script type="text/ecmascript-6">
  import {elMixin} from 'common/js/mixin'
  export default {
    mixins: [elMixin],
    props: {
      element: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  img
    width: 100%
    height: 100%
</style>

