<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightedData"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestionListApi } from '@/api/search'
export default {
  props: {
    keyword: {
      type: String,
      default: () => ' '
    }
  },
  components: {},
  data() {
    return {
      suggestions: []
    }
  },
  methods: {
    async getSuggestion() {
      try {
        const res = await getSuggestionListApi(this.keyword)
        console.log(res.data.data.options)

        if (
          res.data.data.options.length === 0 ||
          res.data.data.options[0] == null
        ) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    highlightedData() {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red ">${match}</span>`)
      )
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.getSuggestion()
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
