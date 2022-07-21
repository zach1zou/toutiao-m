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
    <component :is="componentName" :keyword="keywords"> </component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  components: { SearchHistory, SearchResult, SearchSuggest },
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResults = true
    },
    visibleSearchSuggestions() {
      this.isShowSearchResults = false
    }
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
        return 'SearchResults'
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
