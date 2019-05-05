<template>
  <div class="video-panel">
    <div class="tabs">
      <e-tabs :currentIndex="currentTabIndex" :vertical="true" :data="tabs"></e-tabs>
      <div class="upload">
        <input ref="upload" type="file" @change="uploadVideo" accept="video/mp4">
        <span class="text">上传视频</span>
      </div>
    </div>
    <div class="wrapper">
      <div class="list-inner">
        <video-list @select="selectVideo" @delete="showDeleteConfirm" ref="uploadList" :data="uploadList"></video-list>
        <div class="pagination">
          <el-pagination @current-change="uploadListChange" layout="prev, pager, next, jumper" :page-size="uploadListSize" :total="uploadListTotal">
          </el-pagination>
        </div> 
      </div>
    </div>
    <confirm ref="confirmDelete" @confirm="deleteVideo" text="是否删除这些视频" confirmBtnText="删除"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import ETabs from 'base/e-tabs/e-tabs'
  import Confirm from 'base/confirm/confirm'
  import VideoList from 'base/video-list/video-list'
  import {getVideoUpload, uploadVideo, deleteVideo} from 'api/video'
  import {ERR_OK} from 'api/config'

  // 图片列表每页的条目数
  const UPLOAD_LIST_SIZE = 15
  // 允许上传的单张图片大小，单位：Byte
  const VIDEO_MAX_SIZE = 104857600

  export default {
    data() {
      return {
        tabs: [{name: '我的视频'}],
        currentTabIndex: 0,
        uploadList: [],
        uploadListTotal: 0,
        uploadListSize: UPLOAD_LIST_SIZE
      }
    },
    created() {
      let pageNo = 1
      let pageSize = 10
      this._getVideoUpload({pageNo, pageSize})
    },
    methods: {
      uploadVideo() {
        let files = this.$refs.upload.files
        let file = files[0]
        if (file.size > VIDEO_MAX_SIZE) {
          this.$message.error('上传视频最大不能超过100M')
          this.$refs.upload.value = null
          return
        }
        this.uploadList.unshift({percent: ''})
        uploadVideo(this._convertToForm(file), this._progress).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data
            this.uploadList.shift()
            this.uploadList.unshift({id: data.id, filename: data.filename, origin_url: data.origin_url, cover_url: data.cover_url})
            if (this.uploadList.length > UPLOAD_LIST_SIZE) {
              this.uploadList.pop()
            }
            this.uploadListTotal++
          } else {
            this.$message.error(res.msg)
          }
          this.$refs.upload.value = null
        }).catch((err) => {
          console.log('发生错误：uploadMusic2：' + err)
        })
      },
      uploadListChange(currentPage) {
        this._getVideoUpload({pageNo: currentPage, pageSize: UPLOAD_LIST_SIZE})
      },
      showDeleteConfirm(videoList) {
        this._videoList = videoList
        this.$refs.confirmDelete.show()
      },
      deleteVideo() {
        deleteVideo(this._videoList.slice()).then((res) => {
          if (res.code === ERR_OK) {
            let pageNo = 1
            let pageSize = 15
            this.$refs.uploadList.hideDelete()
            this._getVideoUpload({pageNo, pageSize})
          }
        }).catch((err) => {
          console.log('发生错误：deleteVideo2：' + err)
        })
      },
      selectVideo(video) {
        this.$emit('select', video)
      },
      _getVideoUpload({pageNo, pageSize}) {
        getVideoUpload({pageNo, pageSize}).then((res) => {
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
          console.log('发生错误：getVideoUpload2：' + err)
        })
      },
      _convertToForm(data) {
        let formData = new FormData()
        formData.append('video', data)
        return formData
      },
      _progress(e) {
        let percent = e.loaded / e.total
        this.uploadList[0].percent = `${(percent * 100) >> 0}%`
      }
    },
    components: {
      ETabs,
      Confirm,
      VideoList
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .video-panel
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
    .wrapper
      flex: 1
      background-color: $color-background-l
      padding: 0 10px 10px
      .pagination
        text-align: center
</style>

