<template>
  <div class="edit-handles" @click.stop>
    <e-tabs :data="tabs" @switch="switchTab" :currentIndex="currentTabIndex" ref="tabs"></e-tabs>
    <div class="list-wrapper">
      <scroll v-show="currentElementIndex !== -1 && currentTabIndex === 0" :preventDefault="false"  ref="styleList" :data="[]" class="style-list">
        <div class="list-inner">
          <el-collapse v-model="styleListActiveNames" @change="changeStyleCollapse">
            <el-collapse-item title="位置和大小" name="1">
              <div class="line">
                <e-input @query="styleHandlesChange" keyName="left" ref="xAxis" title="X轴坐标"></e-input>
              </div>
              <div class="line">
                <e-input @query="styleHandlesChange" keyName="top" ref="yAxis" title="Y轴坐标"></e-input>
              </div>
              <div class="line">
                <e-input :isPositive='true' @query="styleHandlesChange" keyName="width" ref="eleWidth" title="宽度"></e-input>
              </div>
              <div class="line">
                <e-input :isPositive='true' @query="styleHandlesChange" keyName="height" ref="eleHeight" title="高度"></e-input>
              </div>
              <div class="line">
                <e-input-number @query="styleHandlesChange" keyName="rotate" ref="eleRotate" :min="0" :max="360" :step="5" title="旋转"></e-input-number>
              </div>
            </el-collapse-item>
            <el-collapse-item title="基础样式" name="2">
              <div class="line">
                 <e-input-color  @query="styleHandlesChange" keyName="backgroundColor" ref="bgColor" title="背景色"></e-input-color> 
              </div>
              <div class="line">
                <e-input-number  @query="styleHandlesChange" keyName="opacity" ref="opacity" :min="0" :max="1" :step="0.01" title="透明度"></e-input-number>
              </div>
            </el-collapse-item>
            <el-collapse-item title="边框样式" name="3">
              <div class="line">
                <e-input :isPositive='true' @query="styleHandlesChange" keyName="borderWidth" ref="borderWidth" title="宽度"></e-input>
              </div>
              <div class="line">
                <e-input :isPositive='true' @query="styleHandlesChange" keyName="borderRadius" ref="borderRadius" title="圆角半径"></e-input>
              </div>
              <div class="line">
                <e-select @select="styleHandlesChange" ref="borderStyle" keyName="borderStyle" title="类型" :data="borderStyleList"></e-select>
              </div>
              <div class="line">
                <e-input-color @query="styleHandlesChange" keyName="borderColor" ref="borderColor" title="颜色"></e-input-color>
              </div>
            </el-collapse-item>
            <el-collapse-item title="阴影样式" name="4">
              <div class="line">
                <e-input @query="styleHandlesChange" keyName="boxShadowX" ref="boxShadowX"  title="横向偏移"></e-input>
              </div>
              <div class="line">
                <e-input @query="styleHandlesChange" keyName="boxShadowY" ref="boxShadowY"  title="纵向偏移"></e-input>
              </div>
              <div class="line">
                <e-input :isPositive='true' @query="styleHandlesChange" keyName="boxShadowBlur" ref="boxShadowBlur"  title="模糊"></e-input>
              </div>
              <div class="line">
                <e-input @query="styleHandlesChange" keyName="boxShadowSize" ref="boxShadowSize"  title="尺寸"></e-input>
              </div>
              <div class="line">
                <e-input-color @query="styleHandlesChange" keyName="boxShadowColor" ref="boxShadowColor" title="颜色"></e-input-color>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </scroll>
      <div v-show="currentElementIndex === -1 && currentTabIndex === 0">
        <el-collapse :value="['1','2']">
            <el-collapse-item name="1" title="全局设置">
              <div class="line"><e-input ref='widthInput' :defaultNum="scene.width" :isPositive="true" @query="sceneChange" keyName="width" title="宽度" placeholder="请输入页面宽度（单位：px）"></e-input></div>
              <div class="line"><e-input ref='heightInput' :defaultNum="scene.height" :isPositive="true" @query="sceneChange" keyName="height" title="高度" placeholder="请输入页面高度（单位：px）"></e-input></div>
              <div class="line"><e-select ref="scale" :defaultQuery="1" @select="sceneScaleChange" title="缩放" :data="scaleList"></e-select></div>
            </el-collapse-item>
            <el-collapse-item name="2" title="当前页设置">
              <div class="line"><e-input-color title="背景色"></e-input-color></div>
            </el-collapse-item>
          </el-collapse>
      </div> 
      <scroll v-show="currentElementIndex !== -1 && currentTabIndex === 1" :preventDefault="false" ref="animationList" :data="[]" class="animation-list">
        <div class="list-inner">
          <div class="animation-btns">
            <el-button icon="plus" @click="addAnimate">添加动画</el-button>
            <el-button icon="caret-right" @click="previewAnimations">播放动画</el-button>
          </div>
          <el-collapse  @change="animationStyleCollapse">
            <el-collapse-item v-for="(item, index) in currentElementAnimations" :key="item">
              <template slot="title">
                <div class="aniamtion-item-title">
                  <span>动画{{index+1}}</span>
                  <div>
                    <el-button size="mini" @click.stop="previewAnimation(item)"><i class="icon-preview"></i> 预览</el-button>
                    <el-button @click.stop="removeAnimation(item)" size="mini"><i class="icon-delete"></i> 删除</el-button>
                  </div>
                </div>
              </template>
              <div class="line"><e-select @select="animationNameChange" :args="item" :defaultQuery="item.name" :hasGroup="true" title="动画名" :data="animateList"></e-select></div>
              <div class="line"><e-input-number @query="animationDurationChange" :args="item" :defaultNum="item.duration" title="时长" :step="0.5"></e-input-number></div>
              <div class="line"><e-input-number @query="animationDelayChange" :args="item" :defaultNum="item.delay" title="延迟" :step="0.5"></e-input-number></div>
              <div class="line"><e-input-number @query="animationCountChange" :args="item" :min="1" :defaultNum="item.count" title="重复"></e-input-number></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </scroll>
      <div v-show="currentElementIndex === -1 && currentTabIndex === 1">
        <el-collapse value="1">
            <el-collapse-item name="1" title="全局设置">
              <div class="line"><e-select ref="pageDirection" @select="sceneChange" keyName="direction" :data="pageDirectionList" title="翻页方向"></e-select></div>
              <div class="line"><e-input-number ref="pageAutoPlay" @query="sceneChange" keyName="autoPlay" title="单页时长"></e-input-number></div>
              <div class="line"><e-input-number ref="pageSpeed" @query="sceneChange" keyName="speed" title="切换速度"></e-input-number></div>
              <div class="line"><e-switch ref="pageLoop" @change="sceneChange" keyName="loop" title="循环"></e-switch></div>
            </el-collapse-item>
          </el-collapse>
      </div> 
      <scroll :data="[]" v-show="currentElementIndex !== -1 &&currentTabIndex === 2" :preventDefault="false" class="properties-list">
        <div class="list-inner">
          <edit-text v-show="currentElementType === 'text'"></edit-text>
          <edit-picture v-show="currentElementType === 'picture'"></edit-picture>
          <edit-album v-show="currentElementType === 'album'"></edit-album>
          <edit-music v-show="currentElementType === 'music'"></edit-music>
        </div>
      </scroll>
      <div v-show="currentElementIndex === -1 && currentTabIndex === 2">
        请选择元素进行编辑
      </div> 
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ETabs from 'base/e-tabs/e-tabs'
  import Scroll from 'base/scroll/scroll'
  import EInput from 'base/e-input/e-input'
  import ESelect from 'base/e-select/e-select'
  import EInputColor from 'base/e-input-color/e-input-color'
  import EInputNumber from 'base/e-input-number/e-input-number'
  import ESwitch from 'base/e-switch/e-switch'
  import EditText from 'components/edit-text/edit-text'
  import EditPicture from 'components/edit-picture/edit-picture'
  import EditAlbum from 'components/edit-album/edit-album'
  import EditMusic from 'components/edit-music/edit-music'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {borderStyleList, animateList, scaleList, pageDirectionList, ANIMATION_ID_LENGTH} from 'common/js/config'
  import {createOnlyId} from 'common/js/util'
  import Animation from 'common/js/animation'
  import {previewAnimation, previewAnimations} from 'common/js/dom'

  export default {
    data() {
      return {
        styleListActiveNames: ['1', '2', '3', '4'],
        tabs: [
          {name: '外观'},
          {name: '动画'},
          {name: '编辑'}
        ],
        currentTabIndex: 0,
        borderStyleList: borderStyleList,
        animateList: animateList,
        pageDirectionList: pageDirectionList,
        scaleList: scaleList
      }
    },
    mounted() {
      setTimeout(() => {
        this.$refs.pageDirection.setQuery(this.scene.direction)
        this.$refs.pageAutoPlay.setQuery(this.scene.autoPlay)
        this.$refs.pageSpeed.setQuery(this.scene.speed)
        this.$refs.pageLoop.setQuery(this.scene.loop)
      }, 20)
    },
    methods: {
      switchTab(index) {
        this.currentTabIndex = index
      },
      changeStyleCollapse() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$refs.styleList.refresh()
        }, 300)
      },
      styleHandlesChange(css) {
        if (this.currentElementIndex === -1) {
          return
        }
        this.setCurrentElementCss(css)
      },
      addAnimate() {
        let list = this.currentElementAnimations
        let id = createOnlyId({
          list,
          len: ANIMATION_ID_LENGTH
        })
        let animation = new Animation({id})
        this.addAnimation(animation)
      },
      removeAnimation(animation) {
        this.deleteAnimation(animation)
      },
      animationStyleCollapse() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$refs.animationList.refresh()
        }, 300)
      },
      animationNameChange(obj) {
        let animation = Object.assign({}, obj.args)
        let name = obj.label
        animation.name = name
        this.setAnimation(animation)
      },
      animationDurationChange(obj) {
        let animation = Object.assign({}, obj.args)
        let duration = obj.query
        animation.duration = duration
        this.setAnimation(animation)
      },
      animationDelayChange(obj) {
        let animation = Object.assign({}, obj.args)
        let delay = obj.query
        animation.delay = delay
        this.setAnimation(animation)
      },
      animationCountChange(obj) {
        let animation = Object.assign({}, obj.args)
        let count = obj.query
        animation.count = count
        this.setAnimation(animation)
      },
      previewAnimation(animation) {
        let id = this.currentElement.id
        animation = Object.assign({}, animation)
        previewAnimation(id, animation)
      },
      previewAnimations() {
        let id = this.currentElement.id
        let animations = this.currentElementAnimations.slice()
        previewAnimations(id, animations)
      },
      sceneChange(query) {
        this.setScene(query)
      },
      sceneScaleChange(scale) {
        this.setScale(scale)
      },
      _setHandles(css) {
        this.$refs.xAxis.setQuery(css.left)
        this.$refs.yAxis.setQuery(css.top)
        this.$refs.eleWidth.setQuery(css.width)
        this.$refs.eleHeight.setQuery(css.height)
        this.$refs.eleRotate.setQuery(css.rotate)
        this.$refs.bgColor.setQuery(css.backgroundColor)
        this.$refs.opacity.setQuery(css.opacity)
        this.$refs.borderStyle.setQuery(css.borderStyle)
        this.$refs.borderWidth.setQuery(css.borderWidth)
        this.$refs.borderRadius.setQuery(css.borderRadius)
        this.$refs.borderColor.setQuery(css.borderColor)
        this.$refs.boxShadowX.setQuery(css.boxShadowX)
        this.$refs.boxShadowY.setQuery(css.boxShadowY)
        this.$refs.boxShadowSize.setQuery(css.boxShadowSize)
        this.$refs.boxShadowColor.setQuery(css.boxShadowColor)
        this.$refs.boxShadowBlur.setQuery(css.boxShadowBlur)
      },
      ...mapMutations({
        setCurrentElementCss: 'SET_CURRENT_ELEMENT_CSS',
        setScene: 'SET_SCENE',
        setScale: 'SET_SCALE'
      }),
      ...mapActions(['addAnimation', 'deleteAnimation', 'setAnimation'])
    },
    computed: {
      ...mapGetters(['scene', 'scale', 'currentElement', 'currentElementIndex', 'currentElementCss', 'currentElementAnimations', 'currentElementType'])
    },
    watch: {
      currentElement(ele, oldEle) {
        if (!ele.id) {
          return
        }
        let css = ele.css
        this._setHandles(css)
      },
      currentElementCss: {
        handler: function(css, oldCss) {
          if (!this.currentElement.id) {
            return
          }
          this._setHandles(css)
        },
        deep: true
      }
    },
    components: {
      ETabs,
      Scroll,
      EInput,
      ESelect,
      EInputColor,
      EInputNumber,
      ESwitch,
      EditAlbum,
      EditText,
      EditPicture,
      EditMusic
    }
  }
</script>

<style>
  .list-wrapper .el-collapse-item__content .line:not(:nth-last-child(1)){
    padding: 0 0 18px 0;
  }
  .list-wrapper .el-collapse-item__content .line:nth-last-child(1){
    padding: 0 0 8px 0;
  }
  .list-wrapper .el-collapse-item__header .aniamtion-item-title{
    display: inline-flex;
    justify-content: space-between;
    width: 270px;
  }
</style>


<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .edit-handles
    position: relative
    height: 100%
    background-color: $color-panel-background
    .list-wrapper
      position: absolute
      top: 40px
      bottom: 0
      width: 100%
      background-color: $color-background-l
      .properties-list
        position: relative
        padding: 0 4px
        height: 100%
        overflow: hidden
      .style-list
        position: relative
        padding: 0 4px
        height: 100%
        overflow: hidden
      .animation-list
        position: relative
        padding: 0 4px
        height: 100%
        overflow: hidden
        .list-inner
          .animation-btns
            display: flex
            padding: 10px 15px 0
            width: 100%
            justify-content: space-between

</style>
