<template>
  <div>
    <van-popup v-model="isshow" :style="{ height: '100%' }" position="bottom">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeftPop"
        @click-right="onClickRightPop"
      />
      <van-field
        v-model="uname"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
  </div>
</template>
<script>
import { ChangeUserInfoApi } from '@/api/user'

export default {
  props: {
    Info: { type: Object, default: () => {} }
  },
  components: {},
  data() {
    return {
      isshow: false,
      uname: ''
    }
  },
  methods: {
    onClickLeftPop() {
      this.isshow = false
    },
    // 点击保存的时候
    async onClickRightPop() {
      console.log(this.uname, this.Info)
      await ChangeUserInfoApi(
        this.uname,
        this.Info.gender,
        this.Info.birthday,
        this.Info.realName,
        this.Info.intro
      )

      this.$parent.info.name = this.uname
      this.isshow = false
    }
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
