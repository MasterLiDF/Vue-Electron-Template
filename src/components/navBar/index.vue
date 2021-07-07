<!-- slideBar侧边栏 -->
<template>
  <div id="navBar">
    <div class="barWrap" v-for="(v, ind) in list" :key="ind">
      <div class="mainTitle">{{ v.mainTitle }}</div>
      <div class="listWrap">
        <div class="list" v-for="(cv, cind) in v.children" :key="cind">
          <span class="icon" :style="setBackgroundSvg(cv.iconName)"></span>
          <span class="title">{{ cv.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideBar',
  data() {
    return {
      list: [
        {
          mainTitle: '推荐',
          children: [
            { title: '发现音乐', iconName: 'music', link: '/' },
            { title: '私人FM', iconName: 'fm', link: '/' },
            { title: '视频', iconName: 'mv', link: '/' },
            { title: '朋友', iconName: 'friend', link: '/' },
          ],
        },
        {
          mainTitle: '我的音乐',
          children: [
            { title: '本地音乐', iconName: 'iTunes', link: '/' },
            { title: '下载管理', iconName: 'download', link: '/' },
          ],
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    setBackgroundSvg(svgName) {
      let url = require(`@/assets/svg/${svgName}.svg`)
      let str = {
        background: `url('${url}')  no-repeat`,
        'background-size': 'contain !important',
      }
      return str
    },
  },
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
#navBar {
  width: $nav-bar-width;
  height: 100%;
  background: $gray-main;
}
.barWrap {
  .mainTitle {
    margin: 0px 10px 10px;
    padding-top: 10px;
    color: $font-gary;
    font-size: $font-size-base;
  }
}
.list {
  @include flex(flex-start, center);
  margin: 6px 0;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 10px 0 20px;
}
.title {
  color: $font-darker;
  font-size: $font-size-base;
}
</style>