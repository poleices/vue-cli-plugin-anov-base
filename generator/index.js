module.exports = (api,options) => {
  // 渲染模版
  api.render('./template')
  console.log(options);
  // package.json 添加统一包
  api.extendPackage({
    dependencies: {
      "axios": "0.18.1",
      "lodash": "^4.17.20",
      "jquery": "^3.6.0"
    },
    scripts: {
    }
  })
  // 
  api.injectImports(api.entryFile, `import router from './router'`)

}

module.exports.hooks = (api) => {
  // 文件被写入硬盘后调用
  api.afterInvoke(() => {
    const { EOL } = require('os')
    const fs = require('fs')
    const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/render/))
    lines[renderIndex] += `${EOL}  router,`

    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
  })
}