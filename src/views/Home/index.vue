<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#3296fa"
      placeholder="搜索"
      @click="$router.push('/search')"
    />
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in ChannelsList" :key="item.id">
        <!-- 文章列表 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹框 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="ChannelsList"
      @deleteChannels="DeleteChannelsList"
      @changeChannels="ChangeChannelsList"
      @AddChannels="AddChannelsList"
    ></EditChannelPopup>
  </div>
</template>
<script>
import {
  getMyChannelByLocal,
  getUserChannels,
  setMyChannelByLocal,
  DelChannels,
  AddChannels
} from '@/api/channer'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from '@/views/Home/component/EditChannelPopup.vue'

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
  components: {
    ArticleList,
    EditChannelPopup
  },
  data() {
    return {
      value: '',
      ChannelsList: [],
      active: ''
    }
  },
  methods: {
    async getUserChannelsList() {
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelByLocal()
          if (myChannels) {
            this.ChannelsList = myChannels
          } else {
            const { data } = await getUserChannels()
            this.ChannelsList = data.data.channels
          }
        } else {
          const { data } = await getUserChannels()
          this.ChannelsList = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取数据列表')
      }
    },
    showPopup() {
      this.$refs.popup.isshow = true
    },
    async DeleteChannelsList(id) {
      this.ChannelsList = this.ChannelsList.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelByLocal(this.ChannelsList)
      } else {
        try {
          await DelChannels(id)
        } catch (error) {
          console.log(error)
          return this.$toast.fail('删除失败')
        }
        this.$toast.success('删除成功')
      }
    },
    async AddChannelsList(channels) {
      this.ChannelsList.push(channels)
      if (!this.isLogin) {
        setMyChannelByLocal(this.ChannelsList)
      } else {
        try {
          await AddChannels(channels.id, this.ChannelsList.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加成功')
    },
    ChangeChannelsList(index) {
      this.active = index
    }
  },
  mounted() {
    this.getUserChannelsList()
  },
  updated() {},
  beforeDestroy() {},
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },

  filters: {},

  watch: {}
}
</script>
<style lang="less" scoped>
.van-search {
  /deep/.van-search__content {
    color: #5babfb;
  }
  /deep/.van-field__control {
    // color: white;
    text-align: center;
  }
  /deep/.van-cell {
    // color: white;
    text-align: center;
  }
  /deep/.van-icon-search {
    position: relative;
  }
}
// tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  z-index: 999;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
//头部固定功能
// 头部固定的样式 .navbar { position: sticky; top: 0; left: 0; }
/deep/.van-tabs__wrap {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}
/deep/.van-tabs__content {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
