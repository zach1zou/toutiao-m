<template>
  <div>
    <van-cell>
      <template #title>
        <div>搜索结果</div>
      </template>
    </van-cell>
    <!-- 上下拉刷新。 -->
    <van-pull-refresh v-model="refreshing" @refresh="loadNextPage">
      <van-list
        v-model="loading"
        @load="loadNextPage"
        offset="100"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败"
      >
        <van-cell>
          <template #title>
            <div
              v-for="(item, index) in result"
              :key="index"
              class="ResultDiv"
              @click="goToResult(item)"
            >
              {{ item.title }}
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getResultListApi } from '@/api/search'

export default {
  props: {
    result: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      page: 1,
      pre_page: 10
    }
  },
  methods: {
    goToResult(item) {
      this.$router.push({
        name: 'detail',
        params: {
          articleId: item.art_id
        }
      })
    },
    async loadNextPage() {
      try {
        const { data } = await getResultListApi(
          this.page,
          this.pre_page,
          this.$parent.keywords
        )
        // console.log(data, '======')
        if (!data.data.page) {
          this.finished = true
        }
        if (this.refreshing === true) {
          this.$parent.results.unshift(...data.data.results)
        } else {
          this.$parent.results.push(...data.data.results)
        }
        this.page++
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
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
.ResultDiv {
  border-top: 1px solid #dbdbdb;
  padding: 20px 0;
}
</style>
