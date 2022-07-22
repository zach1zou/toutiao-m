<template>
  <div class="body">
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    <h1 class="DetailTitle">{{ DetailInfo.title }}</h1>
    <div class="DetailAuthor">
      <div class="DetailAuthorIcon">
        <img :src="DetailInfo.aut_photo" alt="" />
      </div>
      <van-cell :label="DetailInfo.pubdate" :title="DetailInfo.aut_name">
        <template #default>
          <button>+关注</button>
        </template>
      </van-cell>
    </div>

    <div class="readPreference">
      <div v-html="DetailInfo.content"></div>
    </div>
    <van-divider>正文结束</van-divider>
    <!-- 评论 -->

    <div class="CommentAuthor" v-for="item in commentInfo" :key="item.aut_id">
      <div class="CommentAuthorIcon">
        <img :src="item.aut_photo" alt="" />
      </div>
      <van-cell>
        <template #title>
          <div>{{ item.aut_name }}</div>
        </template>
        <template #label>
          <div class="pubdata">
            <div>{{ item.pubdate }}</div>
            <button>回复{{ item.reply_count }}</button>
          </div>
        </template>

        <template #default>
          <button @click="replyFollowed(item.com_id)">
            <i><van-icon name="good-job-o" /> </i> 赞
          </button>
        </template>
      </van-cell>

      <van-divider />
    </div>
    <p class="over">没有更多了</p>

    <!-- 底部 -->
    <div class="bottomContainer">
      <button @click="show = true">写评论</button>
      <div><van-icon name="comment-o" badge="9" /></div>
      <div><van-icon name="star-o" /></div>
      <div><van-icon name="good-job-o" /></div>
      <div><van-icon name="share-o" /></div>
    </div>
    <!-- 弹出 -->
    <van-action-sheet v-model="show" title="标题">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>
<script>
import { getArticleDetailApi } from '@/api/news'
import { getCommentListApi } from '@/api/comment'

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
      DetailInfo: {},
      commentInfo: [],
      show: false
    }
  },
  methods: {
    // 获取文章细节信息
    async getArticleDetailInfo() {
      const artId = this.$router.history.current.params.articleId

      const { data } = await getArticleDetailApi(artId)

      this.DetailInfo = data.data
    },
    // 获取评论信息
    async getCommentList() {
      const artId = this.$router.history.current.params.articleId
      console.log(artId)
      const { data } = await getCommentListApi('a', artId)

      this.commentInfo = data.data.results
      console.log(this.commentInfo)
    },
    onClickLeft() {
      this.$router.back()
    }
    // 写评论

    // 对文章评论或点赞
    // async replyFollowed(id) {
    //   console.log(id)
    //   const res = await getCommentlikingsApi(id)
    //   console.log(res)
    // }
  },
  mounted() {
    this.getArticleDetailInfo()
    this.getCommentList()
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.body {
  background: white;
  overflow: hidden;
}
.van-nav-bar {
  background-color: #3296fa;
  /deep/.van-icon {
    color: white;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
.DetailTitle {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.DetailAuthor {
  display: flex;
  .DetailAuthorIcon {
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
      color: white;
      background: rgb(50, 150, 250);
      border-color: rgb(50, 150, 250);
      border-radius: 30px;
      width: 160px;
      height: 60px;
      border: none;
    }
  }
}
.readPreference {
  padding: 0 30px;
  /deep/ h2 {
    font-size: 36px;
    border-bottom: 1px solid #eee;
    height: 50px;
  }
  /deep/p {
    font-size: 12px;
  }
  /deep/h3 {
    font-size: 30px;
  }
  /deep/h4 {
    font-size: 24px;
  }
  /deep/img {
    width: 100%;
  }
  /deep/ul li {
    font-size: 24px;
    code {
      background-color: #eee;
    }
  }
  /deep/a {
    display: block;
    height: 50px;
    width: 100vw;
    overflow: hidden;
  }
  /deep/pre {
    padding: 0.21333rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 0.04rem;
    word-wrap: normal;
    code {
      font-size: 80%;
    }
  }
}
.over {
  text-align: center;
  font-size: 30px;
  color: #969799;
  padding-bottom: 100px;
}
// 评论
.CommentAuthor {
  display: flex;

  .CommentAuthorIcon {
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
      button {
        border: 1px solid #eee;
      }
    }
  }
}
//底部
.bottomContainer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 100px;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: white;
  button {
    border-radius: 20px;
    margin: 0 20px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    background-color: white;
    border: 1px solid #eee;
    color: #969799;
  }
  div {
    flex: 1;
  }
}
</style>
