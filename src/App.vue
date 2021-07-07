<template>
  <div id="appPage">
    <!-- 顶部 -->
    <headerBar />
    <!-- 中间内容区 -->
    <div class="midCont">
      <!-- 左侧导航栏 -->
      <div class="navWrap">
        <navBar />
      </div>
      <!-- 中间路由视图 -->
      <div class="routeWrap">
        <!-- 路由都可以用一级路由的形式。 -->
        <router-view />
      </div>
    </div>
    <!-- 底部的播放器工具条 -->
    <musicToolsBar />
  </div>
</template>
<script>
import headerBar from '@/components/headerBar'
import musicToolsBar from '@/components/musicToolsBar'
import navBar from '@/components/navBar'
export default {
  name: 'appPage',
  components: {
    headerBar,
    musicToolsBar,
    navBar,
  },
}
</script>
<style lang="scss">
#appPage {
  width: 100%;
  height: 100%;
}
.midCont {
  height: $main-height;
  position: relative;
  .navWrap {
    height: 100%;
    float: left;
  }
  .routeWrap {
    height: 100%;
    position: absolute;
    left: $nav-bar-width;
    right: 0px;
    background: $white;
    overflow: auto;
  }
}
</style>
