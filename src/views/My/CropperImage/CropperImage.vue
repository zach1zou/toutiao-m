<template>
  <div>
    <img :src="sureSava" ref="img" width="100%" />
    <van-button type="info" @click="confirm">完成</van-button>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ChangeUserPhotoApi } from '@/api/user'

export default {
  props: ['sureSava', 'showimg'],
  components: {},
  data() {
    return {}
  },
  methods: {
    async confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(function(blob) {
        fm.append('sureSava', blob)
      })
      console.log(this.myCropper, 'myCropper')

      const res = await ChangeUserPhotoApi(this.myCropper.url)
      console.log(res.config.data, 'res')

      this.$emit('showimg', this.showimg)
    }
  },
  mounted() {
    const img = this.$refs.img
    // console.log(img.src, 'refimg')
    this.myCropper = new Cropper(img, {})
    // console.log(this.myCropper, 'myCropper')
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
