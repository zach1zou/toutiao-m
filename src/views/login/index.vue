<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" @click-right="backToPrePage">
      <template #right>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="手机号"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="[
          { pattern, message: '请输入正确的手机号', trigger: 'onChange' }
        ]"
      >
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
          <!-- 验证码倒计时 -->
          <van-count-down :time="time" v-if="isshow" @finish="isshow = false" />
          <van-button
            size="small"
            type="info"
            native-type="button"
            v-else
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="btn">
        <van-button block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendCodes } from '@/api/user'
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
      },
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      time: 5 * 1000,
      isshow: false
    }
  },
  methods: {
    // 点击返回上一次
    backToPrePage() {
      this.$router.back()
    },
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
        // console.log(res)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // console.log('登录成功',res);
        this.$router.push('/index')
      } catch (err) {
        // console.log('登录失败', err)
        // this.$toast.fail('登录失败')
        const status = err.response.status
        let message = '登录失败'
        if (status === 400) {
          message = err.response.data.message
          this.$toast.fail(message)
        }
        this.$toast.fail('登录失败')
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate('手机号')
        // 发送验证码
        await sendCodes(this.user.mobile)
        // 显示倒计时
        this.isshow = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404) {
            this.$toast.fail(error.response.data.message)
          } else if (status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
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
.van-icon-cross {
  color: white;
}
.toutiao {
  font-size: 0.5rem;
}
</style>
