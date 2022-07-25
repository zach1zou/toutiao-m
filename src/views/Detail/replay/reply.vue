<template>
  <div>
    <!-- navBar -->
    <van-nav-bar title="暂无回复" left-arrow />
    <div class="replyFollowedContainer">
      <div class="CommentAuthorIcon">
        <img :src="item.aut_photo" alt="" />
      </div>
      <van-cell>
        <template #title>
          <div>{{ item.aut_name }}</div>
        </template>
        <template #label>
          <div class="pubdata">
            <div>{{ item.content }}</div>
            <div>
              <div>{{ item.pubdate }}</div>
              <button @click="Replyshow = true">
                回复{{ item.reply_count }}
              </button>
            </div>
          </div>
        </template>

        <template #default>
          <button
            @click="replyFollowed(item.com_id, index)"
            :class="{ liking: item.is_liking }"
          >
            <i class="good-icon"><van-icon name="good-job-o" /> </i>
            {{ item.is_liking ? '取消' : '赞' }}
          </button>
        </template>
      </van-cell>
    </div>
    <div class="wrapper">
      <!-- 评论 -->
      <van-button @click="commentReply" type="default">评论</van-button>
    </div>
    <!-- 弹出 -->
    <van-popup v-model="show" position="bottom" style="height: 120px">
      <div class="PopContainer">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <button @click="commentFn">发布</button>
      </div>
    </van-popup>
    <van-divider />
    <p class="over">没有更多了</p>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      show: false,
      message: ''
    }
  },
  methods: {
    // 对文章或者评论进行评论
    commentReply() {
      this.show = true
    },
    commentFn() {}
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
// 弹出
.PopContainer {
  display: flex;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .van-field {
    flex: 29;
    background-color: #f5f7f9;
  }
  button {
    color: #6ba3d8;
    font-size: 0.37333rem;
    background-color: white;
    border: none;
    flex: 6;
  }
}
.wrapper {
  width: 100%;
  height: 1.33333rem;
  position: fixed;
  bottom: 0;
  border-top: 0.01333rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  .van-button {
    width: 80%;
    border-radius: 40px;
    height: 80%;
  }
}
// 评论
.replyFollowedContainer {
  display: flex;

  /deep/.CommentAuthorIcon {
    flex: 0 0 100px;

    display: flex;

    justify-content: center;

    align-items: center;

    img {
      height: 60px;

      width: 60px;

      border-radius: 30px;
    }
  }
  .van-cell {
    button {
      color: black;
      border-radius: 30px;
      width: 160px;
      height: 60px;
      border: none;
      background-color: white;
    }
    .pubdata {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        button {
          border: 1px solid #eee;
        }
      }
    }
  }
}
.over {
  text-align: center;
  font-size: 30px;
  color: #969799;
  padding-bottom: 100px;
}
</style>
