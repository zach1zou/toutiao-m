<template>
  <div>
    <img :src="photo" ref="img" width="100%" />
    <van-button type="info" @click="confirm">完成</van-button>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ChangeUserPhotoApi } from '@/api/user'

export default {
  props: ['photo'],
  components: {},
  data() {
    return {
      imgSrc: ''
    }
  },
  methods: {
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async function(blob) {
        fm.append('photo', blob)
        await ChangeUserPhotoApi(fm)
      })

      this.$parent.$parent.showImg = false
      this.$parent.$parent.info.photo = this.imgSrc
    }
  },
  mounted() {
    const img = this.$refs.img
    console.log(img.src, 'refimgsrc')
    this.myCropper = new Cropper(img, {})
    // console.log(this.myCropper, 'myCropper')
    this.imgSrc = img.src
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
