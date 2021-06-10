module.exports = (api,options,rootOptions) => {
  // 渲染模版
  console.log(options);
  console.log(rootOptions);
  const { pageType,useWSocket, UIType } = options

  let dependencies =  {
    "axios": "0.18.1",
    "lodash": "^4.17.20",
    "jquery": "^3.6.0"
  }
  let devDependencies =  {}
  let scripts = {}
  if(pageType === 'web'){
    api.render('./template',{
      ...options
    })
     // package.json 添加统一包
     Object.assign(dependencies,{
      "element-ui": "^2.13.0"
    })
    if(UIType === 'element'){
      Object.assign(dependencies,{
        "element-ui": "^2.13.0",
      })
      api.injectImports(api.entryFile, 
        `import ElementUI from 'element-ui'
        import 'element-ui/lib/theme-chalk/index.css'
        `)
    }
  }
  if(pageType === 'mobile'){
    Object.assign(dependencies,{
      "lodash-es": "^4.17.15",
      "echarts": "^4.6.0",
      "highlight.js": "^10.5.0",
      "vant": "^2.5.4"
    })
    Object.assign(devDependencies,{
      "@babel/plugin-proposal-optional-chaining": "^7.8.3",
      "babel-plugin-import": "^1.13.0",
      "babel-plugin-transform-imports": "^2.0.0",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "eslint-config-prettier": "^6.10.0",
      "postcss-aspect-ratio-mini": "^1.0.1",
      "postcss-preset-env": "^6.7.0",
      "postcss-px-to-viewport": "^1.1.1",
      "postcss-write-svg": "github:jonathantneal/postcss-write-svg",
      "sass": "^1.25.0",
      "stylelint": "^13.9.0",
      "stylelint-config-standard": "^20.0.0",
      "tailwindcss": "^1.9.6",
      "webpack-bundle-analyzer": "^4.3.0"
    })
    scripts = {
      // "serve": "vue-cli-service serve",
      // "build": "vue-cli-service build --mode build",
      // "build:dev": "vue-cli-service build --mode build:dev",
      // "build:analyze": "vue-cli-service build --mode build --analyze",
      // "analyze": "npm_config_report=true npm run build:dev",
      // "lint": "vue-cli-service lint"
    }
   
    api.render('./mobileTemplate',{
      ...options
    })
  }
 
  if(useWSocket){
    api.render('./wsTemplate')
  }
  
  api.extendPackage({
    dependencies: dependencies,
    devDependencies:devDependencies,
    scripts: scripts
  })

  api.onCreateComplete(() => {
    let rxLines = ``;
    if(pageType === 'web' && UIType === 'element'){
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
