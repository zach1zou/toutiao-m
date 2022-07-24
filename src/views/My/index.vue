<template>
  <div>
    <header>
      <!-- 登录的盒子 -->
      <div class="user-info banner" v-if="isLogin">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              ></van-image>
              <span class="moblie">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button
                class="code-btn"
                size="mini"
                round
                @click="$router.push('/user')"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录 -->
      <div class="login-register banner" v-else>
        <div class="warp" @click="goLogin">
          <img src="@/assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <main>
      <div>
        <van-grid column-num="2" clickable class="grid">
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"> </span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"> </span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- cell -->
      <div>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'

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
      userInfo: {}
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({ title: '黑马头条', message: '是否退出该账号' })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    goLogin() {
      this.$router.push('/login')
    },
    async getUserList() {
      if (this.isLogin) {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    // 标识是否登录
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 400px;
  background: url(@/assets/images/banner.png) no-repeat 0 0 / cover;
}
// 用户信息
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
    .moblie {
      color: white;
    }
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    /deep/.van-grid-item__text {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    .toutiao {
      font-size: 0.6rem;
      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
// 底部
.login-btn {
  /deep/.van-button__text {
    color: red;
  }
}
.my {
  background: #f5f7f9;
  height: calc(100vh - 100px);
}

.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
