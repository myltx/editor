<template>
  <div class="picture-panel">
    <div class="tabs">
      <e-tabs @switch="switchTabs" :currentIndex="currentTabIndex" :vertical="true" :data="tabs"></e-tabs>
      <div class="upload">
        <input ref="upload" type="file" @change="uploadPicture" multiple accept="image/jpeg,image/gif,image/png">
        <span class="text">上传图片</span>
      </div>
    </div>
    <div class="wrapper">
      <div class="list-inner" v-if="currentTabIndex === 0">
        <picture-list @select="selectPicture" :data="prodList"></picture-list>
        <div class="pagination">
          <el-pagination @current-change="prodListChange" layout="prev, pager, next, jumper" :page-size="prodListSize" :total="prodListTotal">
          </el-pagination>
        </div>
      </div>
      <div class="list-inner" v-if="currentTabIndex === 1">
        <picture-list @select="selectPicture" ref="uploadList" @clear="showClearConfirm" @delete="showDeleteConfirm" :data="uploadList" :isControl="true"></picture-list>
        <div class="pagination">
          <el-pagination @current-change="uploadListChange" layout="prev, pager, next, jumper" :page-size="uploadListSize" :total="uploadListTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <confirm ref="confirmClear" @confirm="clearUploadList" text="是否清空所有上传的图片" confirmBtnText="清空"></confirm>
    <confirm ref="confirmDelete" @confirm="deletePicture" text="是否删除这些图片" confirmBtnText="删除"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import ETabs from 'base/e-tabs/e-tabs'
  import PictureList from 'base/picture-list/picture-list'
  import Confirm from 'base/confirm/confirm'
  import {getPictureProd, getPictureUpload, uploadPicture, deletePicture} from 'api/picture'
  import {ERR_OK} from 'api/config'

  // 图片列表每页的条目数
  const PROD_LIST_SIZE = 15
  const UPLOAD_LIST_SIZE = 15
  // 允许上传的单张图片大小，单位：Byte
  const PICTURE_MAX_SIZE = 3145728

  export default {
    data() {
      return {
        tabs: [
          {name: '图片库'},
          {name: '我的图库'}
        ],
        currentTabIndex: 0,
        prodList: [],
        prodListSize: PROD_LIST_SIZE,
        prodListTotal: 0,
        uploadList: [],
        uploadListTotal: 0,
        uploadListSize: UPLOAD_LIST_SIZE
      }
    },
    created() {
      let pageNo = 1
      this._getPictureProd({pageNo, pageSize: PROD_LIST_SIZE})
      this._getPictureUpload({pageNo, pageSize: UPLOAD_LIST_SIZE})
    },
    methods: {
      switchTabs(index) {
        this.currentTabIndex = index
        if (index === 0) {
          this.$refs.uploadList && this.$refs.uploadList.hideDelete()
        }
      },
      prodListChange(currentPage) {
        this._getPictureProd({pageNo: currentPage, pageSize: PROD_LIST_SIZE})
      },
      uploadListChange(currentPage) {
        this._getPictureUpload({pageNo: currentPage, pageSize: UPLOAD_LIST_SIZE})
      },
      uploadPicture() {
        let files = this.$refs.upload.files
        let len = files.length
        if (len > 5) {
          this.$message.error('最多上传5张图片')
          return
        }
        for (let i = 0; i < len; i++) {
          let file = files[i]
          if (file.size > PICTURE_MAX_SIZE) {
            this.$message.error('单张图片最大不能超过3M')
            this.$refs.upload.value = null
            continue
          }
          uploadPicture(this._convertToForm(file)).then((res) => {
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
            console.log('发生错误：uploadPicture2：' + err)
          })
        }
      },
      selectPicture(picture) {
        this.$emit('select', picture)
      },
      showClearConfirm() {
        this.$refs.confirmClear.show()
      },
      clearUploadList() {
        this.uploadList = []
        this.$refs.uploadList.hideDelete()
      },
      showDeleteConfirm(pictureList) {
        this._pictureList = pictureList
        this.$refs.confirmDelete.show()
      },
      deletePicture() {
        deletePicture(this._pictureList.slice()).then((res) => {
          if (res.code === ERR_OK) {
            let pageNo = 1
            let pageSize = 15
            this.$refs.uploadList.hideDelete()
            this._getPictureUpload({pageNo, pageSize})
          }
        }).catch((err) => {
          console.log('发生错误：deletePicture2：' + err)
        })
      },
      _getPictureProd({pageNo, pageSize}) {
        getPictureProd({pageNo, pageSize}).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.total === 0) {
              this.prodList = []
              this.prodListTotal = 0
              return
            }
            this.prodList = res.data.list
            this.prodListTotal = res.data.total
          }
        }).catch((err) => {
          console.log('发生错误：getPictureProd2：' + err)
        })
      },
      _getPictureUpload({pageNo, pageSize}) {
        getPictureUpload({pageNo, pageSize}).then((res) => {
          if (res.code === ERR_OK) {
            if (res.data.total === 0) {
              this.uploadList = []
              this.uploadListTotal = 0
              return
            }
            this.uploadList = res.data.list
            this.uploadListTotal = res.data.total
          }
        }).catch((err) => {
          console.log('发生错误：getPictureUpload2：' + err)
        })
      },
      _convertToForm(data) {
        let formData = new FormData()
        formData.append('picture', data)
        return formData
      }
    },
    components: {
      ETabs,
      PictureList,
      Confirm
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .picture-panel
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

