<!-- 推荐歌单 -->
<template>
  <div id="ReSongList">
    推荐歌单
    <div class="listWrap" v-if="sList.length">
      <div
        class="item"
        v-for="(v, ind) in sList"
        :key="ind"
        @click="goSongList(v)"
      >
        <img class="img" :src="v.picUrl" alt="" />
        <div class="listName">{{ v.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalized } from '@/api/homeApi.js'

export default {
  name: 'ReSongList',
  data() {
    return {
      sList: [],
    }
  },
  created() {
    this._getPersonalized()
  },
  mounted() {},
  methods: {
    // 获取推荐歌单
    async _getPersonalized() {
      let result = await getPersonalized()
      if (result.data) {
        this.sList = result.data.result || []
        console.log('推荐歌单：', this.sList)
      }
    },
    // 跳转歌单
    goSongList(item) {
      let _item = JSON.stringify(item) || item
      this.$router.push({
        path: '/songList',
        query: { detail: _item },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.listWrap {
  @include flex(center, center);
  .item {
    // width: 150px;
    width: 18%;
    height: 190px;
    // border: 1px solid #000;
    margin: 1%;
    .img {
      // width: 150px;
      width: 100%;
      // height: 150px;
    }
    .listName {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      color: #000;
    }
  }
}
</style>