/**
 * @description webscoket 简单封装
 * @author zzg
 * @date 2019-05-08
 * @class WS
 */

class WS {
  constructor(opt) {
    this.config = {
      protocol: window.location.protocol == 'http:' ? 'ws://' : 'wss://',
      host: window.location.host,
      port: '8080',
      url: this.protocol + this.host + ':' + this.port,
      isHeart: true, // 是否开启心跳监测
      reconnecting: false, // 是否正在重连
      timeout: 10000, // 断线重连时间
      heartTime: 60000, // 心跳监测频率
      heartTimer: null,
      reConnectCount: -1, // 断线重连次数 -1 为一直重连
      successHandler(data) {
        console.log('ws数据调取成功')
      },
      errorHandler(data) {
        console.log('ws数据调取失败')
      },
      openHandler() {
        console.log('ws连接成功')
      }
    }
    this.webClose = false // 是否为客户端主动断开链接
    this.connectCount = 0 // 已重连次数
    Object.assign(this.config, opt)
    this.initWs()
  }
  // 初始化
  initWs() {
    window.WebSocket = window.WebSocket || window.MozWebSocket
    if (!window.WebSocket) {
      // 检测浏览器支持
      console.error('错误: 浏览器不支持websocket')
      return
    }
    this.socket = new WebSocket(this.config.url) // 创建连接并注册响应函数
    this.socket.onopen = e => {
      this.onopen(e)
    }
    this.socket.onmessage = e => {
      this.onmessage(e)
    }
    this.socket.onclose = e => {
      this.onclose(e)
      this.socket = null // 清理
      console.log('原socket实例已被清理')
    }
    this.socket.onerror = e => {
      this.onerror(e)
    }
    return this
  }
  // 四个事件
  onopen(e) {
    console.log('webscoket链接开启')
    this.config.isHeart && this.heartCheck()
    this.webClose = false
    this.connectCount = 0
    this.config.openHandler()
  }
  onmessage(e) {
    const dataSet = JSON.parse(e.data)
    if (dataSet.cmd == 'heartCheck') return
    try {
      this.handleEvent(dataSet)
    } catch (err) {
      console.log(err)
      return
    }
  }
  onerror(e) {
    console.log('webscoket错误')
    !this.webClose && this.reConnect()
  }
  onclose(e) {
    this.config.errorHandler(e)
    !this.webClose && this.reConnect()
    if (this.config.heartTimer) clearInterval(this.config.heartTimer)
    console.log('websocket链接已关闭')
  }
  // 重连
  reConnect() {
    if (this.config.reconnecting) return
    if (this.webClose) return
    this.config.reconnecting = true
    if (this.config.reConnectCount == -1) {
      setTimeout(() => {
        this.initWs()
        this.config.reconnecting = false
        this.connectCount++
        console.log('已重连', this.connectCount)
      }, this.config.timeout)
    } else {
      this.config.reConnectCount != this.connectCount &&
        setTimeout(() => {
          this.initWs()
          this.config.reconnecting = false
          this.connectCount++
          console.log('已重连', this.connectCount)
        }, this.config.timeout)
    }
  }
  // 事件处理
  handleEvent(data) {
    this.config.successHandler(data)
  }
  // 心跳监测
  heartCheck() {
    if (this.config.heartTimer) clearInterval(this.config.heartTimer)
    console.log('心跳监测开启')
    // const me = this
    this.config.heartTimer = setInterval(() => {
      this.socket.send('isOnline')
    }, this.config.heartTime)
  }
  // 主动断开链接
  closeConnect() {
    if (this.config.heartTimer) clearInterval(this.config.heartTimer)
    this.webClose = true
    this.socket.close()
    console.log('主动断开链接')
  }
}
export default WS
