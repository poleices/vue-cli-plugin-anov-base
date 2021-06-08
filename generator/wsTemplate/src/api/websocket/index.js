import WS from './ws'

const wsUrl = 'ws://172.16.xx.xx:8005/' // 可改为真实的websocket 接口
const wsConnections = new Map()
const STATUS = {
  SUCCESS: 0,
  STOP: 1,
  END: 2
}
// let cashData = []
// 成功之后的数据处理 -可根据具体 数据格式进行处理 handleData函数需二次开发者自写
const handleData = (key, v, currentPth) => {
  return new Promise((resolve, reject) => {
    if (v.status != STATUS.STOP) {
      resolve({ status: v.status, msg: v.msg })
    } else {
      delete wsConnections[key]
      destroy(key)
      resolve({ status: v.status })
    }
  })
}
// 链接websocket
const connected = (key, opt) => {
  return new Promise((resolve, reject) => {
    let current = wsConnections.get(key)
    if (current) resolve()
    current = new WS(Object.assign({
      url: opt.path || wsUrl,
      successHandler: v => {
        handleData(key, v, opt.path).then(res => {
          opt.callBack(res)
        })
      },
      errorHandler: () => {
      },
      openHandler: () => {
        resolve('success')
      }
    }, opt))
    wsConnections.set(key, current)
  })
}
// 页面切换时 会调用 数据源的init方法
const init = (key, opt) => {
  return new Promise((resolve, reject) => {
    const currentConnection = wsConnections.get(key)
    if (currentConnection && currentConnection.socket) {
      resolve('success')
      console.log('websocket already connect')
    } else {
      console.log('websocket init')
      connected(key, opt).then(() => {
        resolve('success')
      })
    }
  })
}
const destroy = (key) => {
  try {
    let current = wsConnections.get(key)
    current.closeConnect()
    current = null
    delete wsConnections[key]
  } catch (e) {
    console.log(e)
  }
  console.log('websocket destroy')
}
const protocal = window.location.protocol == 'http:' ? 'ws' : 'wss'
const BASE_URL = window.location.port ? `${protocal}://${window.location.hostname}:${window.location.port}/ws/common/` : `${protocal}://${window.location.hostname}/ws/common/`


export { init, destroy, BASE_URL, STATUS }
