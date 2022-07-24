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
          <button
            @click="isfollow(DetailInfo.is_followed)"
            :class="{ follow: DetailInfo.is_followed }"
          >
            {{ DetailInfo.is_followed ? '取消关注' : '+关注' }}
          </button>
        </template>
      </van-cell>
    </div>

    <div class="readPreference">
      <div v-html="DetailInfo.content"></div>
    </div>
    <van-divider>正文结束</van-divider>
    <!-- 评论 -->

    <div
      class="CommentAuthor"
      v-for="(item, index) in commentInfo"
      :key="index"
    >
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
              <button>回复{{ item.reply_count }}</button>
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

      <van-divider />
    </div>
    <p class="over">没有更多了</p>

    <!-- 底部 -->
    <div class="bottomContainer">
      <button @click="show = true">写评论</button>
      <div><van-icon name="comment-o" :badge="commentInfo.length" /></div>
      <div><van-icon name="star-o" /></div>
      <div><van-icon name="good-job-o" /></div>
      <div><van-icon name="share-o" /></div>
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
        <button @click="comment">发布</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getArticleDetailApi } from '@/api/news'
import {
  getCommentListApi,
  PostCommentListApi,
  getCommentlikingsApi
} from '@/api/comment'
import { followingsApi, NotfollowingsApi } from '@/api/user'
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
      show: false,
      message: '',
      commentId: '',
      ChangeColor: 'black',
      aut_id: ''
    }
  },
  methods: {
    // 获取文章细节信息
    async getArticleDetailInfo() {
      const artId = this.$router.history.current.params.articleId

      const { data } = await getArticleDetailApi(artId)

      this.DetailInfo = data.data
      this.aut_id = data.data.aut_id
      console.log(this.DetailInfo, '文章细节')
    },
    // 获取评论信息
    async getCommentList() {
      const artId = this.$router.history.current.params.articleId
      console.log(artId, '获取评论ID')
      const { data } = await getCommentListApi('a', artId)

      this.commentInfo = data.data.results
      console.log(this.commentInfo)
    },
    onClickLeft() {
      this.$router.back()
    },
    // 对文章或者评论进行评论
    async comment() {
      const artId = this.$router.history.current.params.articleId
      console.log(artId)
      const { data } = await PostCommentListApi(artId, this.message)
      console.log(data, '文章评论进行评论数据')

      console.log(data.data.new_obj)
      this.show = false
      this.commentInfo.unshift(data.data.new_obj)
    },
    // 对评论或评论回复点赞
    async replyFollowed(id, index) {
      console.log(id, '评论id')
      try {
        const res = await getCommentlikingsApi(id)
        console.log(res, '点赞')
        if (res.status === 201) {
          this.$toast.success('点赞成功')
          // console.log(this.$refs.goodIcon, '点赞图标')

          // this.$refs.goodIcon[index].style.color =
          //   this.commentInfo[index].is_liking === true ? 'red' : 'black'
        }
      } catch (error) {
        this.$toast.fail('点赞失败')
      } finally {
        this.commentInfo[index].is_liking = !this.commentInfo[index].is_liking
      }
    },
    // 关注和取消关注
    async isfollow(follow) {
      try {
        console.log(this.DetailInfo.aut_id, 'follow')

        if (follow) {
          await NotfollowingsApi(this.DetailInfo.aut_id)
          this.$toast.success('取消关注')
          this.DetailInfo.is_followed = false
        } else {
          // console.log(this.DetailInfo.is_followed, 'follow')

          await followingsApi(this.DetailInfo.aut_id)
          this.$toast.success('关注成功')
          this.DetailInfo.is_followed = true
        }
      } catch (error) {
      } finally {
        // this.DetailInfo.is_followed = !this.DetailInfo.is_followed
        // this.follow = !this.follow
      }
    }
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
      color: white !important;
      background: rgb(50, 150, 250) !important;
      border-color: rgb(50, 150, 250) !important;
      border-radius: 30px;
      width: 160px;
      height: 60px;
      border: none;
      &.follow {
        background: white !important;
        border: #3a3a3a 1px solid !important;
        color: black !important;
      }
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
/deep/.liking {
  color: red !important;
}
</style>
