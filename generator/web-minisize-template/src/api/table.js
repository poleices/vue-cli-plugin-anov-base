import request from '@/utils/HttpUtil/http'

export function getList(params) {
  return request(
    '/vue-admin-template/table/list',
    'get',
    params
  )
}
