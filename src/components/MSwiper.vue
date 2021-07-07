<template>
  <div class="swiperBox">
    <van-swipe
      :touchable="false"
      :autoplay="5000"
      :loop="true"
      :width="width"
      :height="height"
      :vertical="vertical"
      :indicator-color="indicatorColor"
    >
      <van-swipe-item
        class="swiperItem"
        v-for="(image, index) in realSliderImg"
        :key="index"
      >
        <img class="msimg" :src="image.pic_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: {
    // 宽度
    width: {
      type: String,
      default: '100%',
    },
    //高度
    height: {
      type: String,
      default: 'auto',
    },
    //是否纵向滚动
    vertical: {
      type: Boolean,
      default: false,
    },
    // 默认显示图片
    defaultImgArr: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 实际需要展示的图片
    uiImgArr: {
      type: Array,
      default: () => {
        return []
      },
    },
    indicatorColor: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      // 这里应该是本地图片。如果服务器没有数据,则显示它。
      SwiperImg: [
        {
          id: 1,
          pic_url:
            'http://p1.music.126.net/lD5R-tPLwRBLKH--YQ_qcg==/109951166123918155.jpg?imageView&quality=89',
        },
        {
          id: 2,
          pic_url:
            'http://p1.music.126.net/X9oObuw2u0HAimURm91HDg==/109951166124747408.jpg?imageView&quality=89',
        },
      ],
    }
  },
  computed: {
    realSliderImg() {
      return this.uiImgArr.length
        ? this.uiImgArr
        : this.defaultImgArr.length
        ? this.defaultImgArr
        : this.SwiperImg
    },
  },
}
</script>
<style scoped lang="scss">
// 轮播图
.swiperBox {
  width: 100%;
  // height: 300px;
  height: 100%;
  overflow: hidden !important;
  .van-swipe {
    width: 100%;
    height: 100%;
  }
  .swiperItem {
    display: inline-block !important;
  }
  .msimg {
    display: block;
    width: 100% !important;
    pointer-events: none;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: #fff;
  }
}
</style>
