<!-- indexPage -->
<template>
  <div id="indexPage">
    <!-- 轮播图 -->
    <div class="homeSwiperWrap">
      <MSwiper />
    </div>
    <!-- 推荐歌单 -->
    <ReSongList />
  </div>
</template>

<script>
// import { getHomeBanner } from '@/api/homeApi.js'
import MSwiper from '@/components/MSwiper.vue'
import ReSongList from './ReSongList.vue'
export default {
  name: 'Index',
  components: {
    MSwiper,
    ReSongList,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.homeSwiperWrap {
  /* height: 150px; */
  margin: 0 10%;
  padding: 20px 0;
  @include flex(center, center);
}
</style>