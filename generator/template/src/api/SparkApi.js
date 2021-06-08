// import HttpHandler from '@/api/common/HttpHandler'
import ApiInterceptor from '@/api/common/apiInterceptor'
import { EDIT_TYPE } from '@/components/common/constant'

// const domain = 'http://mockjs.com'
const proxyPre = '/api'
// const proxyPre = 'http://mockjs.com/api'

export default class SparkApi extends ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
  _checkType(type) {
    if (type == EDIT_TYPE.SEARCH) {
      return '/tmp'
    }
    return ''
  }
  addSpark(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/post-json/newTask`
    return this.afterIntercept(this.POST, url, data)
  }
  getTaskDetail(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/get-url/getTaskDetail`
    return this.afterIntercept(this.GET, url, data)
  }
  saveTask(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/post-json/saveTask`
    return this.afterIntercept(this.POST, url, data)
  }
  compile(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/post-json/compile`
    return this.afterIntercept(this.POST, url, data)
  }
  testTask(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/post-json/testTask`
    return this.afterIntercept(this.POST, url, data)
  }
  sparkDelete(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/get-url/delete`
    return this.afterIntercept(this.GET, url, data)
  }
  checkGit(data, type) {
    const url = `${proxyPre}${this._checkType(type)}/spark/get-url/validGit`
    return this.afterIntercept(this.GET, url, data)
  }
}

