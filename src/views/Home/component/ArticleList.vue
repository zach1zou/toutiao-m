<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="loadNextPage">
      <van-list
        @load="loadNextPage"
        offset="0"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleListApi } from '@/api/news'
import ArticleItem from '@/views/Home/component/ArticleItem'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleListApi(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        console.log(this.articles)
      } catch (error) {
        const status = error.response.status
        console.log(status, error.response.data.message)
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败')
        }
      }
    },
    async loadNextPage() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error('错误')
        // }
        const { data } = await getArticleListApi(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing === true) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp // 加载状态结束 this.loading = false this.error = true
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },
  mounted() {
    this.getArticleList()
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
