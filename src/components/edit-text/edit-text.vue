<template>
  <el-collapse :value="['1']">
    <el-collapse-item title="编辑文字" name="1">
      <div class="line"><e-select title="字体" :data="fontFamilyList"></e-select></div>
      <div class="line"><e-input-number @query="styleHandlesChange" cssStyle="fontSize" :min="0" :max="72" :step="2" title="字号"></e-input-number></div>
      <div class="line"><e-input-color @query="styleHandlesChange" cssStyle="color" ref="color" title="颜色"></e-input-color></div>
    </el-collapse-item>
</el-collapse>
</template>

<script type="text/ecmascript-6">
  import ESelect from 'base/e-select/e-select'
  import EInputNumber from 'base/e-input-number/e-input-number'
  import EInputColor from 'base/e-input-color/e-input-color'
  import {fontFamilyList} from 'common/js/config'
  export default {
    data() {
      return {
        fontFamilyList: fontFamilyList
      }
    },
    methods: {
      styleHandlesChange(query) {
        console.log(query)
      }
    },
    components: {
      ESelect,
      EInputNumber,
      EInputColor
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>
