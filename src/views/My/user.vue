<template>
  <div>
    <div class="user-container">
      <!-- 上传文件 -->
      <input type="file" ref="file" hidden accept=".jpg,.png" multiple />
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <template #default>
          <div class="DivIcon">
            <img :src="info.photo" alt="" class="imgIcon" />
          </div>
        </template>
      </van-cell>
      <van-cell title="昵称" is-link @click="onShowName">
        <template #default>
          <div>{{ info.name }}</div>
        </template>
      </van-cell>

      <van-cell title="性别" is-link @click="onShowSex">
        <template #default> {{ info.gender == '0' ? '男' : '女' }}</template>
      </van-cell>
      <van-cell title="生日" is-link @click="onShowBirthday">
        <template #default> {{ info.birthday }}</template>
      </van-cell>
    </div>
    <!-- 头像弹出层 -->
    <van-popup
      v-model="showImg"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      :lazy-render="false"
    >
      <CropperImage
        v-if="showImg"
        :photo="photo"
        ref="CropperImage"
      ></CropperImage>
    </van-popup>
    <!-- 姓名弹出层 -->
    <Popup ref="popupInfo" :Info="info"></Popup>
    <!-- 性别弹出层 -->
    <PopupSex ref="popupSexInfo" :Info="info"></PopupSex>

    <!-- 生日弹出层 -->
    <popupBirthdayVue ref="popupBirthdayInfo" :Info="info"></popupBirthdayVue>
  </div>
</template>
<script>
import { getUserInfo, getUserInfoApi } from '@/api/user'
import Popup from './popup/popup.vue'
import CropperImage from './CropperImage/CropperImage.vue'
import PopupSex from './popup/popupSex.vue'
import popupBirthdayVue from './popup/popupBirthday.vue'

export default {
  props: {},
  components: { Popup, CropperImage, PopupSex, popupBirthdayVue },
  data() {
    return {
      userInfo: {},
      info: {},
      file: '',
      photo: '',
      showImg: false
    }
  },
  methods: {
    // 渲染初始列表
    async getUserList() {
      const {
        data: { data }
      } = await getUserInfo()
      this.userInfo = data
      console.log(this.userInfo, 'userInfo')
    },

    async getUserInfo() {
      const { data } = await getUserInfoApi()
      console.log(data.data, 'info')
      this.info = data.data
    },

    onClickLeft() {
      this.$router.back()
    },

    // 修改姓名
    onShowName() {
      this.$refs.popupInfo.isshow = true
    },
    // 修改性别
    onShowSex() {
      this.$refs.popupSexInfo.isshow = true
    },
    // 修改生日
    onShowBirthday() {
      this.$refs.popupBirthdayInfo.isshow = true
    }
  },
  mounted() {
    this.getUserList()
    this.getUserInfo()

    this.$refs.file.addEventListener('change', (e) => {
      let file = e.target.files[0]
      file = URL.createObjectURL(file)
      this.photo = file
      this.showImg = true
      this.$refs.file.value = ''
    })
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.user-container {
  /deep/.van-nav-bar__content {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: white;
    }
    .van-icon {
      color: white;
    }
  }
  .DivIcon {
    width: 60px;
    height: 60px;
    position: absolute;
    .imgIcon {
      border-radius: 50px;
      height: 50px;
      width: 50px;
      position: relative;
      left: 250px;
    }
  }
}
</style>
