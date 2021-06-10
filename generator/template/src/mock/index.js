const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const CODE = 0 // 返回的状态码
Mock.setup({
  timeout: 1000
})
//demo
const obj = {
  costTotal: () => Random.natural(1000, 2000), 
  deliveryTime: () => Random.date('yyyy-MM-dd HH:mm:ss'),
  descInfo: () => Random.cparagraph(0, 10), 
  machineIp: () => Random.ip(),
  projectLeaderName: () => Random.cname(), 
  projectName: () => Random.cword(4, 5), 
  projectId: () => Random.integer(15),
  modelName: () => Random.cword(2, 6),
  'versionName|1': ['v3.0', 'v4.0', 'v5.0'], 
  'status|1': [1, 2, 3, 4, 5], // 运行状态
  managerName: () => Random.cname(),
  code: () => Random.word(10)
}

const SUCCESS = {
  code: CODE,
  data: {
  },
  message: '请求成功',
  success: true
}

Mock.mock(`${domain}/sys/global/projectList`, 'get', _req => {
  return {
    ...SUCCESS,
    obj:{
      ...obj
    }
  }
})
Mock.mock(/mockjs.com\/api\/model\/get-url\/info/, 'get', _req => {

  return {}
})
export default Mock
