import request from '@/utils/HttpUtil/http'

export function login(data) {
  return request(
    '/vue-admin-template/user/login',
    'post',
    data
  )
}

export function getInfo(token) {
  return request(
    '/vue-admin-template/user/info',
    'get',
    { token }
  )
}

export function logout() {
  return request(
    '/vue-admin-template/user/logout',
    'post'
  )
}
