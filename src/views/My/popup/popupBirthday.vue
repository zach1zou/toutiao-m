<template>
  <div>
    <van-popup v-model="isshow" :style="{ height: '40%' }" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
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
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  methods: {
    onCancel() {
      this.isshow = false
    },
    // 点击保存的时候
    async onConfirm(value) {
      console.log(value, this.Info)

      const date = new Date(value)
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      const ymd = `${y}-${m}-${d}`

      await ChangeUserInfoApi(
        this.Info.name,
        this.Info.gender,
        ymd,
        this.Info.realName,
        this.Info.intro
      )

      this.$set(this.$parent.info, 'birthday', ymd)

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
