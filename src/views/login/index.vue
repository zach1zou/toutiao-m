<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field name="手机号" placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        center
        clearable
        placeholder="请输入短信验证码"
        v-model="user.code"
        name="验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <template #button>
          <van-button size="small" type="info">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="btn">
        <van-button block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login } from '@/api/user'
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
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // 1.获取用户表单
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 3.提交表单验证
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await login(user)
        // console.log('登录成功',res);
        this.$router.push('/index')
      } catch (err) {
        console.log('登录失败', err)
      }
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
<style lang="less" scoped>
.btn {
  .van-button--default {
    background-color: #6db4fb;
    border: none;
    color: white;
  }
}
</style>
