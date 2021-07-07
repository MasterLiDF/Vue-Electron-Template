import request from '@/utils/http'

// export const login = () => request({
//     url:'/',
//     method:'get'
// })

export function login() {
  return request({
    url: '/',
    method: 'get'
  })
}

// 首页轮播图
export function getHomeBanner() {
  return request({
    url: '/banner',
    method: 'get'
  })
}

//首页推荐歌单
export function getPersonalized() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}
