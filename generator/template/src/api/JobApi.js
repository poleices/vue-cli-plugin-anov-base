// import HttpHandler from '@/api/common/HttpHandler'
import ApiInterceptor from '@/api/common/apiInterceptor'

// const domain = 'http://mockjs.com'
const proxyPre = '/api'
// const proxyPre = 'http://mockjs.com/api'

// const domain = ''
// 基础运维开放平台接口
export default class JobApi extends ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
  getJobList(data) {
    const url = `${proxyPre}/jobManagement/post-json/jobList`
    return this.afterIntercept(this.POST, url, data)
  }
  jobOutLine(data) {
    const url = `${proxyPre}/jobManagement/post-json/jobOffLine`
    return this.afterIntercept(this.POST, url, data)
  }
}

