<!-- footBar -->
<template>
  <div id="musicToolsBar">
    <div class="toolsBarWrap">
      <div class="c1">
        <div class="c1-change c1-pre" @click="playPrev()">
          <div :style="setBackgroundSvg('prev')"></div>
        </div>
        <div class="c1-change c1-play" @click="playMusic()">
          <div v-if="playState == 1" :style="setBackgroundSvg('pause')"></div>
          <div v-else :style="setBackgroundSvg('play')"></div>
        </div>
        <div class="c1-change c1-next" @click="playNext()">
          <div :style="setBackgroundSvg('next')"></div>
        </div>
      </div>
      <div class="c2" style="width: 250px">
        <span>{{ currentTime | time }}</span>
        <van-slider
          class="slide-bar"
          v-model="currentTime"
          bar-height="10px"
          active-color="red"
          :min="0"
          :max="durationTime"
          @change="selectTime()"
        />
        <span>{{ durationTime | time }}</span>
      </div>
      <div class="c3">
        <div class="c3-voice" :style="setBackgroundSvg('voice-open')"></div>
        <div class="c3-voice-bar"></div>
      </div>
      <div class="c4">模式：随机播放</div>
    </div>
    <audio
      @canplay="play"
      @ended="playNext()"
      :src="musicInfo.url"
      id="audioPlay"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'musicToolsBar',
  data() {
    return {
      eleAudio: null,
      durationTime: 0,
      currentTime: 0,
      timer: null,
    }
  },
  created() {},
  mounted() {
    this.eleAudio = document.querySelector('#audioPlay')
  },
  computed: {
    ...mapState({
      musicInfo: (state) => state.Music.musicInfo,
      playState: (state) => state.Music.playState,
      playList: (state) => state.Music.playList,
    }),
  },
  watch: {
    /**
     * 播放列表为空 => playState:0(停止)
     * url变化 => playState:1(播放)
     */
    musicInfo(v) {
      let val = v.url ? 1 : 0
      this.setPlayState(val)
    },
  },
  filters: {
    // 时间字符格式化
    time(value) {
      var minute = Math.floor(value / 60)
      var second = Math.floor(value % 60)
      minute = String(minute).padStart(2, '0')
      second = String(second).padStart(2, '0')
      return minute + ':' + second
    },
  },
  methods: {
    ...mapActions({
      getMusicUrl: 'Music/getMusicUrl',
    }),
    ...mapMutations({
      setPlayState: 'Music/setPlayState',
    }),
    setBackgroundSvg(svgName) {
      let url = require(`@/assets/svg/${svgName}.svg`)
      let str = {
        background: `url('${url}')  no-repeat`,
        'background-size': 'contain !important',
      }
      return str
    },
    // 点击播放/暂停按钮
    playMusic() {
      if (!this.musicInfo.url) return
      switch (this.playState) {
        case 0:
          break
        case 1:
          this.setPlayState(2)
          this.pause()
          break
        case 2:
          this.setPlayState(1)
          this.play()
          break
      }
    },
    // 上一曲
    async playPrev() {
      if (!this.musicInfo.url) return
      let index = this.findIndexFromId()
      index = index == 0 ? this.playList.length - 1 : --index
      let item = this.playList[index]
      await this.getMusicUrl(item)
    },
    // 下一曲
    async playNext() {
      if (!this.musicInfo.url) return
      let index = this.findIndexFromId()
      let len = this.playList.length - 1
      index = index == len ? 0 : ++index
      let item = this.playList[index]
      await this.getMusicUrl(item)
    },
    play() {
      if (!this.eleAudio) return
      console.log(
        '正在播放：',
        this.musicInfo.name,
        '时长：',
        this.eleAudio.duration
      )
      this.eleAudio.play()
      this.durationTime = this.eleAudio.duration
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(() => {
        this.currentTime++
        if (this.currentTime >= this.durationTime) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    pause() {
      console.log('暂停播放')
      this.eleAudio && this.eleAudio.pause()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    stop() {
      if (!this.eleAudio) return
      this.eleAudio.currentTime = 0
      this.pause()
    },
    findIndexFromId() {
      if (!this.playList.length) return
      let index
      this.playList.map((v, k) => {
        if (v.id == this.musicInfo.id) {
          index = k
        }
      })
      return index
    },
    selectTime() {
      console.log('time changed')
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
#musicToolsBar {
  height: $footBar-height;
}
.toolsBarWrap {
  @include flex(space-around, center);
  height: 100%;
  background: #eee;
}
.c1,
.c2,
.c3,
.c4 {
  width: 200px;
}
.c1 {
  @include flex(space-around, center);
  .c1-change {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    div {
      height: 100%;
      background-size: contain !important;
    }
  }
  .c1-play {
    width: 26px;
    height: 26px;
  }
}
.c2 {
  @include flex(space-around, center);
  .slide-bar {
    width: 100px;
    background: #ccc;
    border-radius: 6px;
  }
}
.c3 {
  @include flex(space-around, center);
  .c3-voice {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .c3-voice-bar {
    width: 140px;
    height: 10px;
    border-radius: 6px;
    background: #eee;
    cursor: pointer;
  }
}
</style>