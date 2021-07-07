// 歌曲列表 添加/移除喜欢 添加/移除歌单等

import request from '@/utils/http'

//歌单列表
export function getSongList({id}) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params:{id}
  })
}

//获取歌曲url
export function getSongUrl(id) {
  return request({
    url: '/music/url',
    method: 'get',
    params:{id}
  })
}