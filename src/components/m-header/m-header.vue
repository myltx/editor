<template>
  <div class="m-header">
    <div class="logo">logo</div>
    <transition name="fade">
      <div class="control-box" v-show="!previewFlag">
        <el-popover ref="text" placement="bottom" width="160" trigger="click">
          <dialog-text @select="addTextElement"></dialog-text>
        </el-popover>
        <el-popover ref="picture" @show="showPictureDialog" placement="bottom" width="674" trigger="click">
          <dialog-picture @select="addPictureElement" v-if="pictureDialog"></dialog-picture>
        </el-popover>
        <el-popover ref="shape" placement="bottom" width="200" trigger="click">
          <dialog-shape></dialog-shape>
        </el-popover>
        <el-popover ref="music" placement="bottom" width="674" trigger="click">
          <dialog-music></dialog-music>
        </el-popover>
        <el-popover ref="chart" placement="bottom" width="200" trigger="click">
          <dialog-chart></dialog-chart>
        </el-popover>
        <el-popover ref="video" placement="bottom" width="674" trigger="click">
          <dialog-video @select="addVideoElement"></dialog-video>
        </el-popover>
        <el-popover ref="plugins" placement="bottom" width="200" trigger="click">
          <dialog-plugins @selectAlbum="addAlbumElement"></dialog-plugins>
        </el-popover>
        <el-popover ref="template" placement="bottom" width="200" trigger="click">
          <dialog-template></dialog-template>
        </el-popover>
        <ul class="btn-group">
          <li class="item">
            <i class="icon icon-text"></i>
            <span class="text">文本</span>
            <el-button v-popover:text type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-pic"></i>
            <span class="text">图片</span>
            <el-button v-popover:picture type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-shape"></i>
            <span class="text">形状</span>
            <el-button v-popover:shape type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-music"></i>
            <span class="text">音乐</span>
            <el-button v-popover:music type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-list"></i>
            <span class="text">图表</span>
            <el-button v-popover:chart type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-video"></i>
            <span class="text">视频</span>
            <el-button v-popover:video type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-component"></i>
            <span class="text">插件</span>
            <el-button v-popover:plugins type="text" class="btn"></el-button>
          </li>
          <li class="item">
            <i class="icon icon-template"></i>
            <span class="text">模板</span>
            <el-button v-popover:template type="text" class="btn"></el-button>
          </li>
        </ul>
      </div>
    </transition>
    <div class="action-box">
      <ul class="btn-group">
        <li class="item" @click="save">
          <i class="icon icon-save"></i>
          <span class="text">保存</span>
        </li>
        <li class="item">
          <i class="icon icon-template"></i>
          <span class="text">保存模板</span>
        </li>
        <li class="item" v-show="!previewFlag" @click="preview">
          <i class="icon icon-preview"></i>
          <span class="text">预览</span>
        </li>
        <li class="item" v-show="previewFlag" @click="back">
          <i class="icon icon-back"></i>
          <span class="text">返回</span>
        </li>
        <li class="item" @click="showPublishConfirm">
          <i class="icon icon-publish"></i>
          <span class="text">发布</span>
        </li>
        <li class="item" @click="download">
          <i class="icon icon-publish"></i>
          <span class="text">下载</span>
        </li>
      </ul>
    </div>
    <confirm ref="publishConfirm" text="确定需要发布吗？" confirmBtnText="发布" @confirm="publish"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import DialogText from 'components/dialog-text/dialog-text'
  import DialogPicture from 'components/dialog-picture/dialog-picture'
  import DialogShape from 'components/dialog-shape/dialog-shape'
  import DialogMusic from 'components/dialog-music/dialog-music'
  import DialogChart from 'components/dialog-chart/dialog-chart'
  import DialogVideo from 'components/dialog-video/dialog-video'
  import DialogTemplate from 'components/dialog-template/dialog-template'
  import DialogPlugins from 'components/dialog-plugins/dialog-plugins'
  import Confirm from 'base/confirm/confirm'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {createElementText, createElementPicture, createElementAlbum, createElementVideo} from 'common/js/element'
  import {createOnlyId} from 'common/js/util'
  import {ELEMENT_ID_LENGTH, ELEMENT_ID_PERFIX} from 'common/js/config'
  import {ERR_OK} from 'api/config'
  import {save} from 'api/editor'

  export default {
    data() {
      return {
        pictureDialog: false
      }
    },
    created() {
      this.$router.afterEach((route) => {
        if (route.path === '/editor') {
          this.setPreviewFlag(false)
        } else if (route.path === '/preview') {
          this.setPreviewFlag(true)
        }
      })
    },
    methods: {
      addTextElement(data) {
        let id = this._createElementId(this.elementList)
        let elementText = createElementText({
          id,
          size: data.size,
          properties: {
            animations: [],
            text: data.text
          }
        })
        this.addElement(elementText)
        this._close('text')
      },
      addPictureElement(picture) {
        let id = this._createElementId(this.elementList)
        let elementPicture = createElementPicture({
          id,
          properties: {
            animations: [],
            origin_url: picture.origin_url
          }
        })
        this.addElement(elementPicture)
        this._close('picture')
      },
      addVideoElement(video) {
        let id = this._createElementId(this.elementList)
        let elementVideo = createElementVideo({
          id,
          properties: {
            animations: [],
            origin_url: video.origin_url,
            cover_url: video.cover_url
          }
        })
        this.addElement(elementVideo)
        this._close('video')
      },
      addAlbumElement(album) {
        let id = this._createElementId(this.elementList)
        let elementAlbum = createElementAlbum({
          id,
          properties: {
            animations: [],
            pictures: album.pictures,
            direction: 'vertical',
            loop: true,
            autoPlay: 2,
            speed: 1
          }
        })
        this.addElement(elementAlbum)
        this._close('plugins')
      },
      preview() {
        if (!this.previewFlag) {
          this.$router.push('preview')
        }
      },
      back() {
        this.$router.back()
      },
      showPictureDialog() {
        this.pictureDialog = true
      },
      save() {
        save({scene: Object.assign({}, this.scene), pageList: this.pageList.slice()})
          .then((data) => {
            if (data.code === ERR_OK) {
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          }
        )
      },
      showPublishConfirm() {
        this.$refs.publishConfirm.show()
      },
      publish() {
        save({scene: Object.assign({}, this.scene), pageList: this.pageList.slice()})
          .then((data) => {
            if (data.code === ERR_OK) {
              this.$message.success(data.msg)
              location.href = `template.do?id=${data.id || 0}`
            } else {
              this.$message.error(data.msg)
            }
          }
        )
      },
      download() {
        save({scene: Object.assign({}, this.scene), pageList: this.pageList.slice()})
          .then((data) => {
            if (data.code === ERR_OK) {
              this.$message.success(data.msg)
              location.href = `download.do?id=${data.id}`
            } else {
              this.$message.error(data.msg)
            }
          }
        )
      },
      _close(type) {
        if (this.$refs[type]) {
          this.$refs[type].doClose()
        }
      },
      _createElementId(list) {
        return createOnlyId({
          list,
          len: ELEMENT_ID_LENGTH,
          perfix: ELEMENT_ID_PERFIX
        })
      },
      ...mapMutations({
        setPreviewFlag: 'SET_PREVIEW_FLAG'
      }),
      ...mapActions(['addElement'])
    },
    computed: {
      ...mapGetters(['previewFlag', 'elementList', 'scene', 'pageList'])
    },
    components: {
      DialogText,
      DialogPicture,
      DialogShape,
      DialogMusic,
      DialogChart,
      DialogVideo,
      DialogPlugins,
      DialogTemplate,
      Confirm
    }
  }
</script>


<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .m-header
    position: relative
    height: 50px
    background-color: $color-top-background
    .el-popover
      background-color: $color-dialog-background
    .logo
      display: flex
      align-items: center
      justify-content: center
      width: 200px
      height: 50px
      color: $color-text-l
      font-size: $font-size-large
      box-sizing: border-box
      border: 1px solid $color-text-l
    .control-box
      position: absolute
      top: 0
      left: 50%
      transform: translateX(-50%)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
    .action-box
      position: absolute
      top: 0
      right: 0
    .btn-group
      .item
        position: relative
        display: inline-flex
        flex-direction: column
        justify-content: center
        background-color: $color-top-background
        height: 50px
        padding: 0 10px
        transition: all .1s
        &:hover
          background-color: $color-background-l
        &:hover .icon, &:hover .text
          color: $color-text-ll
        .text
          text-align: center
          cursor: default
          color: $color-text-l
          font-size: $font-size-medium
          transition: all .1s
          padding: 4px 0
          extend-click2()
        .icon
          font-size: $font-size-medium-x
          text-align: center
          cursor: default
          color: $color-text-l
          transition: all .1s
        .btn
          position: absolute
          width: 100%
          height: 100%
          top: 0
          left: 0
          right: 0
          bottom: 0

</style>
