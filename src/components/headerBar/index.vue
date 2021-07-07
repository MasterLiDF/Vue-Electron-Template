<!-- 顶部组件 -->
<template>
  <div id="headerBar">
    <!-- logo -->
    <div class="leftWrap">
      <div
        class="logoImg"
        :style="setBackgroundSvg('logo')"
        @click="goPage('')"
      ></div>
    </div>
    <!-- search -->
    <div class="midWrap">
      <div class="routerContr">
        <span class="btn btn-left" @click="routerHis(0)"> 后退 </span>
        <span class="btn btn-right" @click="routerHis(1)"> 前进 </span>
      </div>
    </div>
    <!-- info&&setting -->
    <div class="rightWrap"></div>
  </div>
</template>

<script>
export default {
  name: 'headerBar',
  data() {
    return {}
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
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
    goPage(path) {
      this.$router.push({ path: `/${path}` })
    },
    routerHis(bool) {
      if (bool) {
        // 前进
        this.$router.go(1)
      } else {
        this.$router.back()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
#headerBar {
  height: $headBar-height;
  background: $red;
  color: white;
}
.leftWrap {
  @include flex(center, center);
  width: 100px;
  height: 100%;
  float: left;
  .logoImg {
    width: 100%;
    height: 40px;
    margin-left: $pagePadding;
    background-position: center !important;
  }
}
.midWrap {
  // margin: 0 300px 0 200px;
  display: inline-block;
  margin-left: 200px;
  width: 400px;
  height: 100%;
  @include flex(space-between, center);
  .routerContr {
    @include flex(space-between, center);
    .btn {
      display: inline-block;
      width: 40px;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
      border: 1px solid #fff;
      border-radius: 6px;
      text-align: center;
      padding: 0px 4px;
      margin-right: 10px;
    }
  }
}
.rightWrap {
  width: 200px;
  height: 100%;
  float: right;
}
</style>