import { getSongUrl } from '@/api/songApi.js'

const base64 =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

// 播放器状态
const musicState = {
  0: '停止播放',
  1: '正在播放',
  2: '暂停播放'
}

// initial state
const state = {
  playState: 0,
  musicInfo: {
    id: -1,
    url: '',
    name: '',
    singer: '',
    albumPic: base64,
    album: '专辑'
  },
  playList:[],  //播放列表
}

//  getters
const getters = {}

//  actions
const actions = {
  getMusicUrl({ state, commit }, item) {
    return getSongUrl(item.id).then(res => {
      let url = res.data.data[0].url
      let obj = { url }
      obj = Object.assign(item, obj)
      commit('setMusicInfo',obj)
    })
  }
}

//  mutations
const mutations = {
  // 设置当前播放的音乐信息
  setMusicInfo(state,data) {
    state.musicInfo = Object.assign({}, data)
  },
  setPlayState(state,val) {
    if (val < 0) return
    state.playState = val
  },
  setPlayList(state,arr){
    state.playList = arr||[];
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
