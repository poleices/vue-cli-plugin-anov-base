// import HttpHandler from '@/api/common/HttpHandler'
import ApiInterceptor from '@/api/common/apiInterceptor'

// const domain = 'http://mockjs.com'
const proxyPre = '/api'
// const proxyPre = 'http://mockjs.com/api'

export default class UdfApi extends ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
  addUdf(data) {
    const url = `${proxyPre}/func/post-json/addFunc`
    return this.afterIntercept(this.POST, url, data)
  }
  udfDetail(data) {
    const url = `${proxyPre}/func/get-json/funcDetail`
    return this.afterIntercept(this.GET, url, data)
  }
  compile(data) {
    const url = `${proxyPre}/func/post-json/funcCompile`
    return this.afterIntercept(this.POST, url, data)
  }
  udfDelete(data) {
    const url = `${proxyPre}/func/get-json/funcDel`
    return this.afterIntercept(this.GET, url, data)
  }
  getGitPre(data) {
    const url = `${proxyPre}/func/get-json/getGitPrefix`
    return this.afterIntercept(this.GET, url, data)
  }
  gitValid(data) {
    const url = `${proxyPre}/func/get-json/gitValid`
    return this.afterIntercept(this.GET, url, data)
  }
}

