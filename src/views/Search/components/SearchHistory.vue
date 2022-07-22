<template>
  <div>
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #default>
        <van-icon name="delete-o" v-if="ishow" @click="isshowFn" />
        <div v-else>
          <span @click="clearHistory" style="padding-right: 20px"
            >全部删除</span
          >
          <span @click="comture">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-show="isDelete"
      v-for="(item, index) in setSearchList"
      :key="index"
      @click="goToSuggestResult(item)"
    >
      <template #title>
        <div>
          {{ item }}
        </div>
      </template>
      <template #right-icon>
        <van-icon name="close" v-show="close" @click="deleteOne(index)" />
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: () => ''
    },
    searchHistoryList: { type: Array, default: () => [] }
  },
  components: {},
  data() {
    return {
      isDelete: true,
      ishow: true,
      close: false,
      setSearchList: []
    }
  },
  methods: {
    searchHistory() {
      this.setSearchList = this.searchHistoryList.concat(
        this.$store.state.history
      )
      this.setSearchList = [...new Set(this.setSearchList)]
    },
    clearHistory() {
      this.$store.commit('RemoveHistory', this.$store.state.history)
      this.isDelete = true
      this.$parent.keywordArr = []
      this.setSearchList = []
    },
    isshowFn() {
      this.ishow = !this.ishow
      this.close = true
    },
    comture() {
      this.ishow = !this.ishow
      this.close = false
    },
    deleteOne(index) {
      this.$parent.keywordArr.splice(index, 1)
    },
    goToSuggestResult(item) {
      this.$parent.keywords = item
    }
  },
  mounted() {
    this.searchHistory()
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
