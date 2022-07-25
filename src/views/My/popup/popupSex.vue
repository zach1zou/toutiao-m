<template>
  <div>
    <van-popup v-model="isshow" :style="{ height: '40%' }" position="bottom">
      <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
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
      columns: ['男', '女'],
      sexs: this.sex
    }
  },
  methods: {
    onCancel() {
      this.isshow = false
    },
    // 点击保存的时候
    async onConfirm(value, index) {
      console.log(value, index, this.Info)
      const sexs = index + ''

      await ChangeUserInfoApi(
        this.Info.name,
        sexs,
        this.Info.birthday,
        this.Info.realName,
        this.Info.intro
      )

      this.$set(this.$parent.info, 'gender', sexs)
      // this.$parent.info.gender = sexs

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
