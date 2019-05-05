<template>
  <ul class="plugins">
    <li><a @click.stop="selectAlbum" class="plugins-album">相册</a></li>
  </ul>
</template>

<script>
  export default {
    methods: {
      selectAlbum() {
        let album = {
          pictures: [
            {
              id: 1,
              filename: '默认图片',
              origin_url: 'http://localhost:8080/static/img102.png'
            },
            {
              id: 2,
              filename: '默认图片',
              origin_url: 'http://localhost:8080/static/img102.png'
            },
            {
              id: 3,
              filename: '默认图片',
              origin_url: 'http://localhost:8080/static/img102.png'
            }
          ]
        }
        this.$emit('selectAlbum', album)
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .plugins
    a
      display: block
      line-height: 50px
      color: $color-text-ll
      font-size: $font-size-medium-x
      padding: 0 10px
      &:hover
        background-color: $color-background-l
    .plugins-album
      text-align: center
</style>
