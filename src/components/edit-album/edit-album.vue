<template>
  <el-collapse @change="closeDialog" :value="['1', '2']">
    <el-collapse-item title="图片列表" name="1">
      <el-popover @show="emitLazyLoad" class="popover" ref="dialogPicture" placement="left" width="674" trigger="click">
        <dialog-picture @select="addPicture"></dialog-picture>
      </el-popover>
      <div class="line">
        <e-input-picture @delete="deletePicture" :pictureList="currentElementProperties.pictures"></e-input-picture>
      </div>
      <div class="line">
        <el-button v-popover:dialogPicture icon="plus">添加图片</el-button>
      </div>
    </el-collapse-item>
    <el-collapse-item title="基础设置" name="2">
      <div class="line"><e-select ref="directionList" keyName="direction" @select="propertiesHandlesChange" title="翻页方向" :data="elementDirectionList"></e-select></div>
      <div class="line"><e-input-number ref="autoPlay" keyName="autoPlay" @query="propertiesHandlesChange" :min="0" :max="9999" :step="0.5" title="单页时长" ></e-input-number></div>
      <div class="line"><e-input-number ref="speed" keyName="speed" @query="propertiesHandlesChange" :min="0" :max="9999" :step="0.5" title="切换速度" ></e-input-number></div>
      <div class="line"><e-switch ref="loopSwitch" @change="propertiesHandlesChange" keyName="loop" title="循环播放"></e-switch></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script type="text/ecmascript-6">
  import EInputPicture from 'base/e-input-picture/e-input-picture'
  import DialogPicture from 'components/dialog-picture/dialog-picture'
  import ESelect from 'base/e-select/e-select'
  import EInputNumber from 'base/e-input-number/e-input-number'
  import ESwitch from 'base/e-switch/e-switch'
  import {elementDirectionList} from 'common/js/config'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        elementDirectionList: elementDirectionList
      }
    },
    methods: {
      propertiesHandlesChange(query) {
        console.log(query)
        this.setCurrentElementProperties(query)
      },
      addPicture(picture) {
        this.addPictureToAlbum(picture)
        this.closeDialog()
      },
      deletePicture(pic, index) {
        this.deletePictureToAlbum(index)
      },
      closeDialog() {
        this.$refs.dialogPicture.doClose()
      },
      // 手动触发lazyload
      emitLazyLoad() {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 1000)
      },
      _setHandles(properties) {
        this.$refs.directionList.setQuery(properties.direction)
        this.$refs.autoPlay.setQuery(properties.autoPlay)
        this.$refs.speed.setQuery(properties.speed)
        this.$refs.loopSwitch.setQuery(properties.loop)
      },
      ...mapMutations({
        setCurrentElementProperties: 'SET_CURRENT_ELEMENT_PROPERTIES'
      }),
      ...mapActions(['addPictureToAlbum', 'deletePictureToAlbum'])
    },
    computed: {
      ...mapGetters(['currentElement', 'currentElementProperties'])
    },
    watch: {
      currentElement(ele, oldEle) {
        if (!ele.id) {
          return
        }
        let properties = ele.properties
        this._setHandles(properties)
      }
    },
    components: {
      EInputNumber,
      EInputPicture,
      DialogPicture,
      ESelect,
      ESwitch
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

</style>