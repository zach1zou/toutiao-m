<template>
  <div>
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      route
    >
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="text">{{
            !!$store.state.user.token ? '我的' : '未登录'
          }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  props: {
    arr: {
      type: Array,
      default: () => []
    },
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      active: 0
    }
  },
  methods: {},
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
/deep/ .van-tabbar-item__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .toutiao {
    font-size: 0.53rem;
  }
  .text {
    font-size: 0.33rem;
  }
}
</style>
