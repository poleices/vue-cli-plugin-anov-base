/* eslint-disable no-undef */
import axios from 'axios'
import router from '@/router'
import StorageHandler from '@/utils/StorageHandler'
import SystemConfig from '@/config/SystemConfig'
import { clear } from '@/utils/auth'

const CODE = {
  UNLOGIN: 1500
}
// 默认请求响应超时时间 120s
axios.defaults.timeout = 1000 * 240
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    // 设置请求格式
    // 设置token
    const storageHandler = new StorageHandler()
    config.headers['Authorization'] = storageHandler.getLocalStorage('token')

    // 是否需要签名
    if (SystemConfig.sign) {
      const signHanler = new SignHanler()
      signHanler.handler(config)
    }
    return config
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
// HTTPresponse拦截
axios.interceptors.response.use(
  data => {
    // const msg = data.data.msg || data.data.message
    if (data.data.code === CODE.UNLOGIN) {
      router.push('/login')
    }
    return Promise.resolve(data.data)
  },
  error => {
    // const msg = error.response.data.msg || error.response.data.message
    if (error?.response?.status === 401) {
      storageClear()
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error.response.data.message)
    }
  }
)

function storageClear() {
  const storageHandler = new StorageHandler()
  clear()
  storageHandler.clearStorage()
  storageHandler.clearSessionStorage()
  storageHandler.removeLocalStorage('token')
}

export default axios
