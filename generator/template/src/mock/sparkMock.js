/* eslint-disable no-unused-vars */
// import { random } from 'lodash'

const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const CODE = 0 // 返回的状态码
Mock.setup({
  timeout: 1000
})
const obj = {
  configType: '物理机', // 类型
  costStatus: '计费中', // 计费状态
  costTotal: () => Random.natural(1000, 2000), // 费用元（）
  deliveryTime: () => Random.date('yyyy-MM-dd HH:mm:ss'), // 创建时间
  descInfo: () => Random.cparagraph(0, 10), // 用途
  endTime: () => Random.date('yyyy-MM-dd HH:mm:ss'), // 回收时间
  machineIp: () => Random.ip(), // IP地址
  projectLeaderName: () => Random.cname(), // 负责人
  projectName: () => Random.cword(4, 5), // 项目
  projectId: () => Random.integer(15),
  orderNum: () => Random.integer(15), // 工单ID
  modelName: () => Random.cword(2, 6),
  'tagVersion|1': ['v3.0', 'v4.0', 'v5.0'], // tag版本
  'versionName|1': ['v3.0', 'v4.0', 'v5.0'], // 版本名称
  'status|1': [1, 2, 3, 4, 5], // 运行状态
  telentName: () => Random.cname(),
  managerName: () => Random.cname(),
  'orderStatus|1': ['上线运行', '审核中', '运行失败'],
  'name': () => Random.cword(3, 4),
  'code': () => Random.word(10)
}

const SUCCESS = {
  code: CODE,
  data: {
  },
  message: '请求成功',
  success: true
}

Mock.mock(`${domain}/sys/global/projectList`, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: [{
      projectId: 414,
      projectName: 'kes项目'
    }, {
      projectId: 231,
      projectName: '大叔电器'
    }],
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(/mockjs.com\/api\/spark\/get-url\/getTaskDetail/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      namePrefix: '',
      nameSuffix: 'sparkname',
      gitPrefix: 'http://10.126.138.28/ChinaUnicomBigData/',
      gitSuffix: 'das',
      jarName: 'xxxx.jar (编译时间: 2020-01-01 10:10:10)',
      clusterId: '',
      queueId: '',
      className: 'asda',
      parameters: 'sadasd',
      instruction: 'as',
      director: 'admin'
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/spark/post-json/newTask`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      key: '1_1122'
    }
  })

  return list
})
Mock.mock(`${domain}/spark/post-json/compile`, 'post', _req => {
  // const list = Object.assign(SUCCESS, {
  //   data: {
  //     jarName: 'xxxx.jar (编译时间: 2020-01-01 10:10:10)'
  //   }
  // })
  const list = {
    code: 100,
    data: {
    },
    message: '请求成功',
    success: false
  }

  return list
})

Mock.mock(`${domain}/spark/post-json/saveTask`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
    }
  })

  return list
})
Mock.mock(`${domain}/spark/post-json/testTask`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: '测试成功'
  })

  return list
})
Mock.mock(/mockjs.com\/api\/spark\/get-url\/delete/, 'get', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
    }
  })

  return list
})
export default Mock
