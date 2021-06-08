module.exports = (api,options,rootOptions) => {
  // 渲染模版
  console.log(options);
  console.log(rootOptions);
  const { useWSocket, UIType } = options
  api.render('./template',{
    ...options
  })
  if(useWSocket){
    api.render('./wsTemplate')
  }
  
  // package.json 添加统一包
  let dependencies =  {
    "axios": "0.18.1",
    "lodash": "^4.17.20",
    "jquery": "^3.6.0"
  }
  if(UIType === 'element'){
     Object.assign(dependencies,{
      "element-ui": "^2.13.0"
     })
     api.injectImports(api.entryFile, 
      `import ElementUI from 'element-ui'
      import 'element-ui/lib/theme-chalk/index.css'
      `)
  }
  api.extendPackage({
    dependencies: dependencies,
    scripts: {
    }
  })

  api.onCreateComplete(() => {
    let rxLines = ``;
    if(UIType === 'element'){
      rxLines +=`\n\nVue.use(ElementUI)`
    }
    const fs = require('fs');
    const mainPath = api.resolve('./src/main.js');
    // 获取内容
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();
    // 注入import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += rxLines;
    // 修改应用
    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });

}
