import qs from 'qs'
import axios from '@/api/common/HttpInterceptor'
import HttpConstant from './HttpConstant'

export default class HttpHandler {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  /**
   *
   * 自定义get请求
   *
   */
  get(url, params, config) {
    if (!params) {
      params = {}
    }
    return axios.get(url, { params: params }, config)
  }
  /**
   *
   * 自定义post请求
   *
   */
  post(url, params, type, config) {
    if (!params) {
      params = {}
    }
    if (!config) {
      config = {}
    }
    let configTmp = {
      'Content-Type': HttpConstant.APPLICATION_JSON_REQ
    }
    if (type == HttpConstant.FORM_DATA_REQ) {
      configTmp = Object.assign({}, config)
      configTmp['Content-Type'] = HttpConstant.FORM_DATA_REQ
      params = qs.stringify(params)
    } else if (type) {
      configTmp = Object.assign({}, config)
      configTmp['Content-Type'] = type
      params = qs.stringify(params)
    }
    return axios.post(url, params, { headers: configTmp })
  }
  /**
   *
   * 自定义put请求
   *
   */
  put(url, params, type, config) {
    if (!params) {
      params = {}
    }
    if (!config) {
      config = {}
    }
    if (type == HttpConstant.FORM_DATA_REQ) {
      const configTmp = Object.assign({}, config)
      configTmp['Content-Type'] = HttpConstant.FORM_DATA_REQ
      params = qs.stringify(params)
    }
    return axios.put(url, params, config)
  }
  /**
   *
   * 自定义文件上传方法
   *
   */
  upload(url, params) {
    const config = {
      'Content-Type': HttpConstant.MUL_FORM_REQ
    }
    const formData = new FormData() // 创建form对象

    for (const field in params) {
      // 多个文件 分别append
      if (field === 'files') {
        params[field].map(f => {
          formData.append(field, f)
        })
      } else if (params[field]) {
        formData.append(field, params[field])
      }
    }
    return axios.post(url, formData, config)
  }

  /**
   *
   * 自定义文件下载方法
   *
   */
  download(url, params) {
    var paramUrl = '?'
    for (const field in params) {
      if (params[field]) {
        paramUrl = paramUrl + field + '=' + params[field] + '&'
      }
    }
    paramUrl = paramUrl.substring(0, paramUrl.length - 1)
    console.log(url + paramUrl)
    window.location.href = url + paramUrl
  }

  /**
   *
   * 自定义文件预览方法
   *
   */
  preview(url, params) {
    let paramUrl = '?'
    for (const field in params) {
      if (params[field]) {
        paramUrl = paramUrl + field + '=' + params[field] + '&'
      }
    }
    paramUrl = paramUrl.substring(0, paramUrl.length - 1)
    window.open(url + paramUrl)
  }
}
