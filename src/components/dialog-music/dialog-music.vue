<template>
  <div class="music-panel">
    <div class="tabs">
      <e-tabs @switch="switchTabs" :currentIndex="currentTabIndex" :vertical="true" :data="tabs"></e-tabs>
      <div class="upload">
        <input ref="upload" type="file" @change="uploadMusic" accept="audio/mpeg">
        <span class="text">上传音乐</span>
        <div ref="progress" class="progress"></div>
      </div>
    </div>
    <div class="wrapper">
      <div class="select-music">
        <span>已选择：</span>
        {{backMusic.filename}}
        <span class="icon" @click="changeBackMusic({})" v-show="backMusic.filename">
          <i title="清除" class="icon-delete"></i>
        </span>
      </div>
      <div class="list-inner" v-if="currentTabIndex === 0">
        <music-list :selectMusic="backMusic" :playingMusic="playingMusic" @play="playMusic" @select="changeBackMusic" :data="prodList"></music-list>
        <div class="pagination" v-show="prodListTotal !== 0">
          <el-pagination @current-change="prodListChange" layout="prev, pager, next, jumper" :page-size="prodListSize" :total="prodListTotal">
          </el-pagination>
        </div>
      </div>
      <div class="list-inner" v-if="currentTabIndex === 1">
        <music-list :selectMusic="backMusic" :playingMusic="playingMusic" @play="playMusic" @select="changeBackMusic" @delete="showDeleteConfirm" :isControl="true" :data="uploadList"></music-list>
        <div class="pagination" v-show="uploadListTotal !== 0">
          <el-pagination @current-change="uploadListChange" layout="prev, pager, next, jumper" :page-size="uploadListSize" :total="uploadListTotal">
          </el-pagination>
        </div>
      </div>
      <audio ref="audio"></audio>
    </div>
    <confirm ref="confirmDelete" @confirm="deleteMusic" text="是否删除这首歌曲" confirmBtnText="删除"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import ETabs from 'base/e-tabs/e-tabs'
  import Confirm from 'base/confirm/confirm'
  import MusicList from 'base/music-list/music-list'
  import {getMusicProd, getMusicUpload, deleteMusic, uploadMusic} from 'api/music'
  import {ERR_OK} from 'api/config'
  import {mapGetters, mapMutations} from 'vuex'
  
  const PROD_LIST_SIZE = 10
  const UPLOAD_LIST_SIZE = 10
  // 允许上传的音乐大小，单位：Byte
  const MUSIC_MAX_SIZE = 10485760
  
  export default {
    data() {
      return {
        tabs: [
          {name: '音乐库'},
          {name: '我的音乐'}
        ],
        currentTabIndex: 0,
        prodList: [],
        prodListTotal: 0,
        prodListSize: PROD_LIST_SIZE,
        uploadList: [],
        uploadListTotal: 0,
        uploadListSize: UPLOAD_LIST_SIZE,
        playingMusic: {}
      }
    },
    created() {
      let pageNo = 1
      let pageSize = 10
      this._getMusicProd({pageNo, pageSize})
      this._getMusicUpload({pageNo, pageSize})
    },
    methods: {
      switchTabs(index) {
        this.currentTabIndex = index
      },
      prodListChange(index) {
        let pageNo = index
        let pageSize = PROD_LIST_SIZE
        this._getMusicProd({pageNo, pageSize})
      },
      uploadListChange(index) {
        let pageNo = index
        let pageSize = UPLOAD_LIST_SIZE
        this._getMusicUpload({pageNo, pageSize})
      },
      playMusic(music) {
        let audio = this.$refs.audio
        if (this.playingMusic.origin_url === music.origin_url) {
          audio.pause()
          this.playingMusic = {}
        } else {
          audio.src = music.origin_url
          this.$refs.audio.play()
          this.playingMusic = music
        }
      },
      changeBackMusic(music) {
        this.setScene({backMusic: music})
      },
      deleteMusic() {
        deleteMusic(this._deleteMusic).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            let pageNo = 0
            let pageSize = UPLOAD_LIST_SIZE
            if (this._deleteMusic.origin_url === this.backMusic.origin_url) {
              this.changeBackMusic()
            }
            this._getMusicUpload({pageNo, pageSize})
          } else {
            this.$message.error(res.msg)
          }
        }).catch((err) => {
          console.log('发生错误：deleteMusic2：' + err)
        })
      },
      showDeleteConfirm(music) {
        this._deleteMusic = music
        this.$refs.confirmDelete.show()
      },
      uploadMusic() {
        let files = this.$refs.upload.files
        let file = files[0]
        if (file.size > MUSIC_MAX_SIZE) {
          this.$message.error('上传音乐最大不能超过10M')
          this.$refs.upload.value = null
          return
        }
        uploadMusic(this._convertToForm(file), this._progress).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data
            this.uploadList.unshift({id: data.id, filename: data.filename, origin_url: data.origin_url})
            if (this.uploadList.length > UPLOAD_LIST_SIZE) {
              this.uploadList.pop()
            }
            this.uploadListTotal++
            this.currentTabIndex = 1
          } else {
            this.$message.error(res.msg)
          }
          this.$refs.upload.value = null
        }).catch((err) => {
          console.log('发生错误：uploadMusic2：' + err)
        })
      },
      _progress(e) {
        this.$refs.progress.style.display = ''
        let percent = e.loaded / e.total
        this.$refs.progress.style.width = `${percent * 100}%`
        if (percent === 1) {
          setTimeout(() => {
            this.$refs.progress.style.display = 'none'
            this.$refs.progress.style.width = '0%'
          }, 500)
        }
      },
      _getMusicProd({pageNo, pageSize}) {
        getMusicProd({pageNo, pageSize}).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.total === 0) {
              this.prodList = []
              this.prodListTotal = 0
              return
            }
            this.prodList = res.data.list
            this.prodListTotal = res.data.total
          } else {
            this.$message(res.msg)
          }
        }).catch((err) => {
          console.log('发生错误：getMusicProd2：' + err)
        })
      },
      _getMusicUpload({pageNo, pageSize}) {
        getMusicUpload({pageNo, pageSize}).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.total === 0) {
              this.uploadList = []
              this.uploadListTotal = 0
              return
            }
            this.uploadList = res.data.list
            this.uploadListTotal = res.data.total
          } else {
            this.$message(res.msg)
          }
        }).catch((err) => {
          console.log('发生错误：getMusicUpload2：' + err)
        })
      },
      _convertToForm(data) {
        let formData = new FormData()
        formData.append('music', data)
        return formData
      },
      ...mapMutations({
        setScene: 'SET_SCENE'
      })
    },
    computed: {
      ...mapGetters(['backMusic'])
    },
    components: {
      ETabs,
      Confirm,
      MusicList
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .music-panel
    display: flex
    .tabs
      flex: 0 0 100px
      position: relative
      .upload
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 60px
        display: flex
        align-items: center
        justify-content: center
        background-color: $color-background-ll
        input
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: 2
          opacity: 0
        .text
          font-size: $font-size-medium
          z-index: 1
          text-align: center
        .progress
          position: absolute
          top: 0
          left: 0
          height: 100%
          background-color: $color-theme
          transition: all 0.5s
    .wrapper
      flex: 1
      background-color: $color-background-l
      padding: 0 10px 10px
      .select-music
        height: 36px
        line-height: 36px
        font-size: $font-size-medium
        color: $color-text-l
        padding: 0 5px
        border-bottom: 2px solid $color-background-d
        cursor: default
        .icon
          &:hover
            color: $color-theme
            cursor: pointer
      .pagination
        text-align: center
</style>

