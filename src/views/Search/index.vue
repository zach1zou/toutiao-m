<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="visibleSearchSuggestions"
        background="#3296fa"
        class="search"
      />
    </form>
    <component
      :is="componentName"
      :keyword="keywords"
      :searchHistoryList="keywordArr"
      :result="results"
    ></component>
  </div>
</template>
<script>
import { getResultListApi } from '@/api/search'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  data() {
    return {
      keywords: '',
      isShowSearchResults: false,
      keywordArr: [],
      results: []
    }
  },
  methods: {
    async onSearch() {
      // 搜索建议
      this.keywordArr.push(this.keywords)
      this.$store.commit('setHistory', this.keywordArr)
      // 搜索结果
      this.isShowSearchResults = true
      const { data } = await getResultListApi(1, 10, this.keywords)

      this.results = data.data.results
    },
    visibleSearchSuggestions() {
      this.isShowSearchResults = false
    }
    // gotoResults(keywords) {
    //  keywords = keywords
    // }
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggest'
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.search {
  [role='button'] {
    color: white;
  }
}
</style>
