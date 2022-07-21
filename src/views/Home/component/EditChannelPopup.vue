<template>
  <div>
    <van-popup
      v-model="isshow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
    >
      <div class="popupMain">
        <div class="myChannel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in myChannels"
              :key="item.id"
              :class="{ activeChannels: item.name === '推荐' }"
              @click="deleteChannel(item, index)"
            >
              <template #icon
                ><van-icon
                  name="cross"
                  v-show="isEdit && item.name !== '推荐'"
                ></van-icon
              ></template>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="recommendChannel">
          <van-cell title="推荐频道"> </van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              icon="plus"
              :text="i.name"
              v-for="i in recommendChannels"
              :key="i.id"
              @click="addChannel(i)"
            >
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channer'

export default {
  props: {
    myChannels: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      isshow: false,
      AllChannelsList: [],
      isEdit: false
    }
  },
  methods: {
    async getAllChannelsList() {
      const { data } = await getAllChannels()
      this.AllChannelsList = data.data.channels

      console.log(this.AllChannelsList)
    },
    deleteChannel(channels, index) {
      if (this.isEdit && channels.name !== '推荐') {
        return this.$emit('deleteChannels', channels.id)
      }
      if (!this.isEdit) {
        this.isshow = false
        return this.$emit('changeChannels', index)
      }
    },
    addChannel(channel) {
      this.$emit('AddChannels', { ...channel })
    }
  },
  mounted() {
    this.getAllChannelsList()
  },
  updated() {},
  beforeDestroy() {},
  filters: {},
  computed: {
    recommendChannels() {
      return this.AllChannelsList.filter((item) => {
        const res = this.myChannels.find((i) => i.id === item.id)
        if (res) {
          return false
        } else {
          return true
        }
      })
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.activeChannels {
  /deep/.van-grid-item__text {
    color: pink;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.027rem solid red;
  }
  // 我的频道
  .myChannel {
    /deep/.van-grid-item__content {
      position: relative;
      background-color: skyblue;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(30%, -30%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 48px;
          height: 48px;
          width: 48px;
        }
      }
    }
  }
  // 推荐频道
  .recommendChannel {
    // 推荐频道加号样式
    /deep/.van-grid-item__content {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
