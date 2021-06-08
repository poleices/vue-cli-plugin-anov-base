// import HttpHandler from '@/api/common/HttpHandler'
import ApiInterceptor from '@/api/common/apiInterceptor'

// const domain = 'http://mockjs.com'
const proxyPre = '/api'
export default class Openserve extends ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  getProjectList(data) {
    const url = `${proxyPre}/projectList`
    return this.afterIntercept(this.GET, url, data)
  }

  getDirtoryList(data) {
    const url = `${proxyPre}/load`
    return this.afterIntercept(this.POST, url, data)
  }
}

