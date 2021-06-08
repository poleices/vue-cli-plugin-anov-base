const GET = 'get'
const POST = 'post'
const UPLOAD = 'upload'
const DOWNLOAD = 'download'

import HttpHandler from '@/api/common/HttpHandler'
import newHttp from '@/api/common/http'

const CODE = {
  UNLOGIN: 1500
}
export default class ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    this.GET = GET
    this.POST = POST
    this.UPLOAD = UPLOAD
    this.DOWNLOAD = DOWNLOAD
    this.http = new HttpHandler()
  }
  /**
   *
   * @param {*} method 新接口规范 不必须
   * @param {*} url 接口地址
   * @param {*} data 数据obj
   * @param {*} ifNew 是否按新接口规范调用
   */
  afterIntercept(method = 'get', url, data, ifNew = false) {
    //  使用新接口规范调用的接口
    if (ifNew) {
      return new Promise((resolve, reject) => {
        newHttp(url, data).then(res => {
          if (res.code === 0 || res.code === CODE.UNLOGIN) {
            resolve(res)
          } else {
            reject(res.msg)
          }
        })
      })
    }
    if (method === GET) {
      return new Promise((resolve, reject) => {
        this.http.get(url, data).then(res => {
          if (res.code === 0 || res.code === CODE.UNLOGIN) {
            resolve(res)
          } else {
            reject(res.msg)
          }
        })
      })
    }
    if (method === POST) {
      return new Promise((resolve, reject) => {
        this.http.post(url, data).then(res => {
          if (res.code === 0 || res.code === CODE.UNLOGIN) {
            resolve(res)
          } else {
            reject(res.msg)
          }
        })
      })
    }
    if (method === UPLOAD) {
      return new Promise((resolve, reject) => {
        this.http
          .upload(url, data)
          .then(res => {
            if (res.code === 0 || res.code === CODE.UNLOGIN) {
              resolve(res)
            } else {
              reject(res.msg)
            }
          })
          .catch(() => {
            reject('服务器请求失败')
          })
      })
    }
    if (method === DOWNLOAD) {
      this.http
        .download(url, data)
    }
  }
}
