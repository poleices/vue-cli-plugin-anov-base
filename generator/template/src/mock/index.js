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
  const list = { 'code': 0, 'msg': '操作成功', 'data': [{ 'projectName': 'dsfdsdsa', 'projectId': '231' }, { 'projectName': 'dsdssssss', 'projectId': '230' }, { 'projectName': 'test4', 'projectId': '229' }] }
  return list
})
Mock.mock(/mockjs.com\/api\/model\/sqlManage\/get-url\/info/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      sqlContent: () => `
        ${Random.cword(3, 4)}
          --kes sql
      --********************************************************************--
      --author:张三疯
      --create time:2020-09-07 16:25:55
      --********************************************************************--
      INSERT OVERWRITE TABLE dwa_d_cus_al_cust_info PARTITION(month_id='', day_id='')
      SELECT  t.user_id
              ,t.user_name
      FROM    table2 t
      WHERE   month_id = ''
      AND     day_id = ''
      AND     t.user_id IS NOT NULL
          `
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/folder/menu/save`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      id: 'xihu',
      name: '文件夹2-1',
      type: '3',
      isDir: false
    }
  })

  return list
})
Mock.mock(`${domain}/sys/global/rename`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      id: 'xihu23'
    }
  })

  return list
})
Mock.mock(/mockjs.com\/api\/tmp\/sqlManage\/get-url\/deleteSql/, 'get', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
    }
  })

  return list
})
Mock.mock(`${domain}}/model/sqlManage/post-json/createSql`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      key: '1_1'
    }
  })

  return list
})
Mock.mock(`${domain}/folder/menu/remove`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      id: 'xihu23'
    }
  })

  return list
})
Mock.mock(`${domain}/modelMenu/loadTree`, 'post', _req => {
  const list = Mock.mock(
    { 'code': 0,
      'msg': '操作成功',
      'data': [
        { 'parent_id': '0',
          'key': '1_0',
          'children': [
            { 'parent_id': '1',
              'key': '2_1',
              'children': [
                { 'parent_id': '2',
                  'key': '5_1',
                  'children': [
                    { 'parent_id': '5',
                      'key': '11_2',
                      'children': [],
                      'name': 'hivesql5',
                      'islocked': 0,
                      'id': '1',
                      'type': '2',
                      'isDir': 0 }
                  ],
                  'name': '文件夹1',
                  'islocked': 0,
                  'id': '5',
                  'type': '1',
                  'userName': '  ',
                  'isDir': 1 },
                { 'parent_id': '2',
                  'key': '1_2',
                  'children': [],
                  'name': 'funcTest1',
                  'islocked': 1,
                  'id': '2',
                  'type': '3',
                  'isDir': 0 }
              ],
              'name': '第一层文件夹',
              'islocked': 0,
              'id': '2',
              'type': 1,
              'userName': ' ',
              'isDir': 1
            },
            {
              'parent_id': '0',
              'key': '1_1',
              'name': 'kes-sqltest',
              'islocked': 0,
              'id': '1',
              'type': 11,
              'userName': ' ', 'isDir': 0
            },
            {
              'parent_id': '0',
              'key': '1_1122',
              'name': 'sparkTest',
              'islocked': 0,
              'id': '1',
              'type': 6,
              'userName': ' ', 'isDir': 0
            }
          ],
          'name': '模型开发',
          'islocked': 0,
          'id': '1',
          'type': 0,
          'userName': ' ',
          'isDir': 1
        },
        { 'parent_id': '1',
          'key': '223_1',
          'children': [
            { 'parent_id': '2',
              'key': '25_1',
              'children': [],
              'name': 'function1',
              'islocked': 0,
              'id': '5',
              'type': 10,
              'userName': '  ',
              'isDir': 0
            }
          ],
          'name': '函数',
          'islocked': 0,
          'id': '212',
          'type': 3,
          'userName': ' ',
          'isDir': 1
        },
        { 'parent_id': '1',
          'key': '225_1',
          'children': [
            { 'parent_id': '2',
              'key': '255_1',
              'children': [],
              'name': 'XXXXX.jar',
              'islocked': 0,
              'id': '5',
              'type': 4,
              'userName': '  ',
              'isDir': 1
            }
          ],
          'name': 'SDK',
          'islocked': 0,
          'id': '22',
          'type': 4,
          'userName': ' ',
          'isDir': 1
        },
        { 'parent_id': '1',
          'key': '2252_1',
          'children': [
            { 'parent_id': '2',
              'key': '2525_1',
              'children': [],
              'name': '测试数据库1',
              'islocked': 0,
              'id': '5',
              'type': 5,
              'userName': '  ',
              'isDir': 1
            }
          ],
          'name': '私有数据源',
          'islocked': 0,
          'id': '2223',
          'type': 5,
          'userName': ' ',
          'isDir': 1
        }
      ]
    }
  )
  // list = { 'code': 0, 'msg': '操作成功', 'data': [{ 'level': '0', 'key': '2_1', 'children': [{ 'level': '1', 'key': '1374962966537457666_1', 'children': [], 'parent_id': '2', 'lockUserId': '0', 'name': 'aa', 'islocked': 0, 'id': '1374962966537457666', 'create_user': '1240565882405978115', 'type': '1', 'userName': ' ', 'isDir': 1 }, { 'level': '1', 'key': '1395293638235463681_1', 'children': [], 'parent_id': '2', 'lockUserId': '0', 'name': 'test1', 'islocked': 0, 'id': '1395293638235463681', 'create_user': '1001', 'type': '1', 'userName': ' ', 'isDir': 1 }, { 'level': '2', 'key': '1395294540948066305_2', 'parent_id': '2', 'lockUserId': '0', 'name': 'desTest', 'islocked': 0, 'id': '1395294540948066305', 'create_user': '1001', 'type': '2', 'isDir': 0 }, { 'level': '2', 'key': '1395343833096609793_2', 'parent_id': '2', 'lockUserId': '0', 'name': 'desTest2', 'islocked': 0, 'id': '1395343833096609793', 'create_user': '1001', 'type': '2', 'isDir': 0 }], 'parent_id': '1', 'lockUserId': '0', 'name': '模型开发', 'islocked': 0, 'id': '2', 'create_user': '1', 'type': '1', 'userName': ' ', 'isDir': 1 }, { 'level': '0', 'key': '3_3', 'children': [], 'parent_id': '1', 'lockUserId': '0', 'name': '函数', 'islocked': 0, 'id': '3', 'create_user': '1', 'type': '3', 'userName': ' ', 'isDir': 1 }, { 'level': '0', 'key': '4_4', 'children': [], 'parent_id': '1', 'lockUserId': '0', 'name': 'jar包', 'islocked': 0, 'id': '4', 'create_user': '1', 'type': '4', 'userName': ' ', 'isDir': 1 }, { 'level': '0', 'key': '5_5', 'children': [{ 'level': '2', 'key': '1395289889991942145_5', 'parent_id': '5', 'lockUserId': '0', 'name': 'dev', 'islocked': 0, 'id': '1395289889991942145', 'create_user': 'admin', 'type': '5', 'userName': ' ', 'isDir': 0 }, { 'level': '2', 'key': '1395552959809040385_5', 'parent_id': '5', 'lockUserId': '0', 'name': 'dev2', 'islocked': 0, 'id': '1395552959809040385', 'create_user': 'admin', 'type': '5', 'userName': ' ', 'isDir': 0 }, { 'level': '2', 'key': '1395560530682949633_5', 'parent_id': '5', 'lockUserId': '0', 'name': 'adad', 'islocked': 0, 'id': '1395560530682949633', 'create_user': 'admin', 'type': '5', 'userName': ' ', 'isDir': 0 }], 'parent_id': '1', 'lockUserId': '0', 'name': '私有数据源', 'islocked': 0, 'id': '5', 'create_user': '1', 'type': '5', 'userName': ' ', 'isDir': 1 }, { 'level': '2', 'key': '1395289038046384129_2', 'parent_id': '1', 'lockUserId': '0', 'name': 'dasd', 'islocked': 0, 'id': '1395289038046384129', 'create_user': '1001', 'type': '2', 'isDir': 0 }] }

  return list
})
Mock.mock(/mockjs.com\/api\/tmp\/sqlManage\/post-json\/lockChange/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      lockUser: '张三',
      lockTime: '2020-10-23'
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(/mockjs.com\/api\/func\/post-json\/lockChange/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      lockUser: '张三',
      lockTime: '2020-10-23'
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(/mockjs.com\/api\/model\/sqlManage\/post-json\/resourceEcho/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      baseAttVo: {
        nodeName: () => Random.word(5),
        'nodeType|1': ['3', '3'],
        describe: () => Random.cword(15),
        parameter: () => Random.word(30)
      },
      resourceAttVo: {
        colonyId: '',
        placeId: '',
        dbTestId: ''
      },
      'hiveAttListVos|10-20': [{
        attributeName: () => Random.word(5),
        attributeValue: () => Random.word(5)
      }]
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/sys/global/post-json/clusterList`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      'clusterList|10': [{
        clusterId: () => Random.word(5),
        clusterName: () => Random.cword(5)
      }, {
        clusterId: () => Random.word(5),
        clusterName: () => Random.cword(5)
      }]

    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/sys/global/post-json/queueDbInfoList`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      'queueList|10': [{
        id: () => Random.word(15),
        queueName: () => Random.cword(5),
        clusterId: () => Random.word(15)
      },
      {
        id: () => Random.word(15),
        queueName: () => Random.cword(5),
        clusterId: 'asdsadasdadasd'
      },
      {
        id: () => Random.word(15),
        queueName: () => Random.cword(5),
        clusterId: 'asdsadasdadasd'
      }
      ],
      'dbList|10': [{
        databaseId: () => Random.word(15),
        databaseName: () => Random.cword(5),
        clusterId: () => Random.word(15)
      },
      {
        databaseId: () => Random.word(15),
        databaseName: () => Random.cword(5),
        clusterId: 'asdsadasdadasd'
      },
      {
        databaseId: () => Random.word(15),
        databaseName: () => Random.cword(5),
        clusterId: 'asdsadasdadasd'
      }]
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/tmp/sqlManage/post-json/checkSql`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {

    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/os/funcManage/post-json/getName`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      name: () => Random.word(10)
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/jobManagement/post-json/jobPublish`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      name: () => Random.word(10)
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/model/sqlManage/post-json/modelSaveSql`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/tmp/sqlManage/post-json/executeSql`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: '执行成功',
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/model/sqlManage/post-json/executeSql`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      'columnsVos': [
        {
          'label': 'serv_d_zh_test_input.imei_id',
          'key': 'serv_d_zh_test_input.imei_id'
        },
        {
          'label': 'serv_d_zh_test_input.imei',
          'key': 'serv_d_zh_test_input.imei'
        }
      ],
      'dataMap': [
        {
          'serv_d_zh_test_input.imei': null,
          'serv_d_zh_test_input.imei_id': 'm80000001|86280202051390'
        },
        {
          'serv_d_zh_test_input.imei': null,
          'serv_d_zh_test_input.imei_id': 'm80000002|86471002272241'
        },
        {
          'serv_d_zh_test_input.imei': null,
          'serv_d_zh_test_input.imei_id': 'm80000003|86471002292153'
        },
        {
          'serv_d_zh_test_input.imei': null,
          'serv_d_zh_test_input.imei_id': 'm80000004|86209302010294'
        },
        {
          'serv_d_zh_test_input.imei': null,
          'serv_d_zh_test_input.imei_id': 'm80000005|86373902818797'
        }
      ]

    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/os/funcManage/post-json/uploadJar`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      fileId: () => Random.cword(10),
      fileName: () => Random.word(10)
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(/mockjs.com\/api\/os\/funcManage\/get-url\/detailFunc/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
      funcName: () => Random.word(10),
      desc: () => Random.word(10),
      jarName: () => Random.word(5),
      className: () => Random.word(6),
      author: () => Random.name(3)
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/os/funcManage/post-json/registFunc`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(/mockjs.com\/api\/os\/funcManage\/get-url\/deleteFunc/, 'get', _req => {
  const list = Mock.mock({
    code: CODE,
    data: {
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/personalDataSource/post-json/getDataSource`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    'data|10': [{
      id: () => Random.word(5),
      label: () => Random.cword(5),
      sourceName: () => Random.cword(5),
      databaseName: () => Random.cword(5),
      'sourceType|1': ['1', '2']
    }],
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/personalDataSource/post-json/connectDataSource`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      status: 0
    }
  })

  return list
})
Mock.mock(`${domain}/personalDataSource/post-json/addDataSource`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      status: 0
    }
  })

  return list
})
Mock.mock(`${domain}/jobManagement/post-json/jobList`, 'post', _req => {
  const list = Mock.mock({
    code: CODE,
    'data': {
      totalCount: '200',
      page: 1,
      'list|100': [{
        jobId: () => Random.word(5),
        jobName: () => Random.cword(5),
        'jobStatus|1': ['0', '-1'],
        director: () => Random.cname(),
        'jobType|1': [1, 2],
        creater: () => Random.cname(),
        checkName: () => Random.cname(),
        publisher: () => Random.cname(),
        times: () => Random.integer(10, 1000),
        createTime: () => Random.date('yyyy-MM-dd HH:mm:ss'),
        updateTime: () => Random.date('yyyy-MM-dd HH:mm:ss')
      }]
    },
    message: '请求成功',
    success: true
  })

  return list
})
Mock.mock(`${domain}/jobManagement/post-json/jobOffLine`, 'post', _req => {
  const list = Object.assign(SUCCESS, {
    data: {
      status: 0
    }
  })

  return list
})

export default Mock
