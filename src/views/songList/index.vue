<!-- 歌单 -->
<template>
  <div id="SongList" v-if="listDetail">
    <div class="listDesc">
      <div class="lWrap">
        <img class="songPic" :src="listDetail.picUrl" alt="" />
        <div class="desc">
          <div class="desc1">
            <div class="desc1-1">歌单</div>
            <div class="desc1-2">{{ listDetail.name }}</div>
          </div>
          <div class="desc2">
            <div>播放全部</div>
            <div>收藏</div>
          </div>
          <div class="desc3">
            <div>
              标签：<span>{{ listDetail.copywriter }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rWrap">
        <div class="rWrapl">
          <div>歌曲数</div>
          <div>{{ listDetail.trackCount }}</div>
        </div>
        <div class="rWrapr">
          <div>播放数</div>
          <div>{{ listDetail.playCount }}</div>
        </div>
      </div>
    </div>
    <div class="listWrap" v-if="playList.length">
      <div class="tabs">歌曲列表</div>
      <div class="listTable">
        <div class="tableHead">
          <div class="thIndex">&nbsp;</div>
          <div class="thControl">操作</div>
          <div class="thTitle">音乐标题</div>
          <div class="thSinger">歌手</div>
          <div class="thZj">专辑</div>
          <div class="thTime">时长</div>
        </div>
      </div>
      <div
        class="tableItem"
        v-for="(v, ind) in playList"
        :key="ind"
        @click="playMusic(v)"
      >
        <div class="thIndex">{{ String(ind + 1).padStart(2, '0') }}</div>
        <div class="thControl">喜欢/下载</div>
        <div class="thTitle">{{ v.name }}</div>
        <div class="thSinger">{{ v.ar[0].name }}</div>
        <div class="thZj">{{ v.al.name }}</div>
        <div class="thTime">{{ v.dt }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongList } from '@/api/songApi.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SongList',
  data() {
    return {
      listDetail: '',
    }
  },
  created() {
    let _listDetail = this.$route.query.detail
    this.listDetail = JSON.parse(_listDetail) || _listDetail
    this._getSongList(this.listDetail.id)
  },
  mounted() {},
  computed: {
    ...mapState({
      playList: (state) => state.Music.playList,
    }),
  },
  methods: {
    ...mapActions({
      getMusicUrl: 'Music/getMusicUrl',
    }),
    ...mapMutations({
      setPlayList: 'Music/setPlayList',
    }),
    async _getSongList(id) {
      let data = await getSongList({ id })
      data = data.data.playlist ? data.data.playlist : {}
      this.setPlayList(data.tracks || [])
      console.log('666', this.playList)
    },
    // 播放音乐
    async playMusic(item) {
      await this.getMusicUrl(item)
    },
  },
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
#SongList {
  font-size: $font-size-base;
}
.listDesc {
  height: 170px;
  position: relative;
  .lWrap {
    position: absolute;
    top: $pagePadding;
    left: $pagePadding;
    @include flex(flex-start, flex-start);
    .songPic {
      width: 150px;
      height: 150px;
    }
    .desc {
      margin: 20px 20px;
      & > div {
        margin-bottom: 10px;
        @include flex(flex-start, center);
      }
    }
    .desc1 {
      .desc1-1 {
        border: 1px solid $red-light;
        border-radius: 3px;
        padding: 1px 4px;
        color: $red-light;
        margin-right: 10px;
      }
      .desc1-2 {
        font-size: $font-size-big;
      }
    }
    .desc2 {
      & > div {
        margin-right: 10px;
        border: 1px solid $gray-lighter;
        border-radius: 3px;
        padding: 2px 4px;
        color: #000;
      }
    }
    .desc3 {
      color: #000;
      span {
        color: $primary;
      }
    }
  }
  .rWrap {
    width: 140px;
    position: absolute;
    top: $pagePadding;
    right: $pagePadding;
    @include flex(flex-end, center);
    text-align: right;
    & > div {
      margin-right: 10px;
    }
  }
}
.listWrap {
  .tabs {
    width: 60px;
    color: $red-light;
    border-bottom: 2px solid $red-light;
    text-align: center;
    font-size: $font-size-head;
    margin: 20px 0 20px 80px;
  }
  .listTable {
    font-size: $font-size-base;
    text-align: left;
  }
  .tableHead,
  .tableItem {
    height: 40px;
    line-height: 40px;
    border: 1px solid $gray-lighter;
    @include flex(space-between, center);
    flex: 1;
    & > div {
      border-right: 1px solid $gray-lighter;
      width: 80px;
      // display: inline-block;
    }
    .thTitle,
    .thSinger,
    .thZj {
      width: 20%;
    }
  }
  .tableItem {
    border: none;
    color: gray;
    cursor: pointer;
    &:nth-child(even) {
      background: $gray-main;
    }
    &:hover {
      background: $gray-main;
      color: #000;
    }
    .thIndex {
      text-align: center;
    }
  }
}
</style>