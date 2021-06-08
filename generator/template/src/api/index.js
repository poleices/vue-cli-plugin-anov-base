// import HttpHandler from '@/api/common/HttpHandler'
import ApiInterceptor from '@/api/common/apiInterceptor'
import { EDIT_TYPE } from '@/components/common/constant'

// const domain = 'http://mockjs.com'
const proxyPre = '/api'
// const proxyPre = 'http://mockjs.com/api'

// const domain = ''
// 基础运维开放平台接口
export default class Openserve extends ApiInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /** 框架获取 项目列表接口 */
  getProjectList(data) {
    const url = `${proxyPre}/sys/global/projectList`
    // const url = `http://mockjs.com/api/sys/global/projectList`
    return this.afterIntercept(this.GET, url, data)
  }

  getDirtoryList(data) {
    const url = `${proxyPre}/folder/menu/loadTree`
    return this.afterIntercept(this.POST, url, data)
  }
  addFile(data) {
    const url = `${proxyPre}/folder/menu/save`
    return this.afterIntercept(this.POST, url, data)
  }
  renameFolder(data) {
    const url = `${proxyPre}/sys/global/rename`
    return this.afterIntercept(this.POST, url, data)
  }
  removeFolder(data) {
    const url = `${proxyPre}/sys/global/remove`
    return this.afterIntercept(this.POST, url, data)
  }
  deleteSql(data) {
    const url = `${proxyPre}/tmp/sqlManage/get-url/deleteSql`
    return this.afterIntercept(this.GET, url, data)
  }
  createSql(data) {
    const url = `${proxyPre}/tmp/sqlManage/post-json/createSql`
    return this.afterIntercept(this.POST, url, data)
  }
  // 加锁解锁
  lockChange(data, type) {
    let url = `${proxyPre}/func/post-json/lockChange`

    if (type == EDIT_TYPE.SEARCH) {
      url = `${proxyPre}/tmp/sqlManage/post-json/lockChange`
    }

    return this.afterIntercept(this.GET, url, data)
  }

  // 获取 sql 内容
  getSqlContent(data) {
    const url = `${proxyPre}/tmp/sqlManage/get-url/info/${data}`
    return this.afterIntercept(this.GET, url)
  }
  //  编辑器-语法校验
  checkSql(data) {
    const url = `${proxyPre}/tmp/sqlManage/post-json/checkSql`
    return this.afterIntercept(this.POST, url, data)
  }
  saveSql(data) {
    const url = `${proxyPre}/tmp/sqlManage/post-json/saveSql`
    return this.afterIntercept(this.POST, url, data)
  }
  executeSql(data) {
    const url = `${proxyPre}/tmp/sqlManage/post-json/executeSql`
    return this.afterIntercept(this.POST, url, data)
  }
  forceStop(data) {
    const url = `${proxyPre}/tmp/sqlManage/get-url/forceStop`
    return this.afterIntercept(this.GET, url, data)
  }

  getSqlResource(data) {
    const url = `${proxyPre}/tmp/sqlManage/post-json/resourceEcho`
    return this.afterIntercept(this.GET, url, data)
  }
  getClusterList(data) {
    const url = `${proxyPre}/sys/global/post-json/clusterList`
    return this.afterIntercept(this.POST, url, data)
  }
  queueDbInfoList(data) {
    const url = `${proxyPre}/sys/global/post-json/queueDbInfoList`
    return this.afterIntercept(this.POST, url, data)
  }
  getName(data) {
    const url = `${proxyPre}/os/funcManage/post-json/getName`
    return this.afterIntercept(this.POST, url, data)
  }
  // 函数部分
  uploadJar(data) {
    const url = `${proxyPre}/os/funcManage/post-json/uploadJar`
    return this.afterIntercept(this.UPLOAD, url, data)
  }
  detailFunc(data) {
    const url = `${proxyPre}/os/funcManage/get-url/detailFunc`
    return this.afterIntercept(this.GET, url, data)
  }
  registFunc(data) {
    const url = `${proxyPre}/os/funcManage/post-json/registFunc`
    return this.afterIntercept(this.POST, url, data)
  }
  // 新增接口
  fetchDbList(data) {
    const url = `${proxyPre}/personalDataSource/post-json/getDataSource`
    return this.afterIntercept(this.POST, url, data)
  }
  coonectDataSource(data) {
    const url = `${proxyPre}/personalDataSource/post-json/connectDataSource`
    return this.afterIntercept(this.POST, url, data)
  }
  addSourceData(data) {
    const url = `${proxyPre}/personalDataSource/post-json/addDataSource`
    return this.afterIntercept(this.POST, url, data)
  }
  getDatabaseInfo(data) {
    const url = `${proxyPre}/personalDataSource/post-json/getDatabaseInfo`
    return this.afterIntercept(this.POST, url, data)
  }

  dataCreateSql(data) {
    const url = `${proxyPre}/model/sqlManage/post-json/createSql`
    return this.afterIntercept(this.POST, url, data)
  }
  dataGetSqlContent(data) {
    const url = `${proxyPre}/model/sqlManage/get-url/info/${data}`
    return this.afterIntercept(this.GET, url)
  }
  dataGetDirtoryList(data) {
    const url = `${proxyPre}/modelMenu/loadTree`

    return this.afterIntercept(this.POST, url, data)
  }
  dataSaveSql(data) {
    const url = `${proxyPre}/model/sqlManage/post-json/modelSaveSql`
    return this.afterIntercept(this.POST, url, data)
  }
  dataGetSqlResource(data) {
    const url = `${proxyPre}/model/sqlManage/post-json/resourceEcho`
    return this.afterIntercept(this.GET, url, data)
  }
  dataRemoveFolder(data) {
    const url = `${proxyPre}/model/global/remove`
    return this.afterIntercept(this.POST, url, data)
  }
  dataAddFile(data) {
    const url = `${proxyPre}/modelMenu/save`
    return this.afterIntercept(this.POST, url, data)
  }
  dataRenameFolder(data) {
    const url = `${proxyPre}/model/global/rename`
    return this.afterIntercept(this.POST, url, data)
  }
  jobPublish(data) {
    const url = `${proxyPre}/jobManagement/post-json/jobPublish`
    return this.afterIntercept(this.POST, url, data)
  }

  sparkRename(data) {
    const url = `${proxyPre}/spark/get-url/rename`
    return this.afterIntercept(this.GET, url, data)
  }
  searchSparkRename(data) {
    const url = `${proxyPre}/tmp/spark/get-url/rename`
    return this.afterIntercept(this.GET, url, data)
  }

  downloadFile(data) {
    const url = `${proxyPre}/park/get-url/downloadFile`
    return this.afterIntercept(this.DOWNLOAD, url, data)
  }
}

