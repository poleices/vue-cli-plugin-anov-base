module.exports = (api,options,rootOptions) => {
  // 渲染模版
  const chalk = require('chalk');
  const log = require('../src/utils/log');

  const { pageType,UIType,useWSocket,usePermission  } = options

  let dependencies =  {}
  let devDependencies =  {}
  // 自定义cli命令
  let scripts = {
     'add-component': 'vue-cli-service add-component'
  }
  //** web */
  if(pageType === 'web'){
    Object.assign(dependencies,{
      "axios": "0.18.1",
      "core-js": "3.6.5",
      "element-ui": "2.13.2",
      "js-cookie": "2.2.0",
      "normalize.css": "7.0.0",
      "nprogress": "0.2.0",
      "path-to-regexp": "2.4.0",
      "vue": "2.6.10",
      "vue-router": "3.0.6",
      "vuex": "3.1.0"
    })
    Object.assign(devDependencies,{
      "@vue/cli-plugin-babel": "4.4.4",
      "@vue/cli-plugin-eslint": "4.4.4",
      "@vue/cli-plugin-unit-jest": "4.4.4",
      "@vue/cli-service": "4.4.4",
      "@vue/test-utils": "1.0.0-beta.29",
      "autoprefixer": "9.5.1",
      "babel-eslint": "10.1.0",
      "babel-jest": "23.6.0",
      "babel-plugin-dynamic-import-node": "2.3.3",
      "chalk": "2.4.2",
      "connect": "3.6.6",
      "eslint": "6.7.2",
      "eslint-plugin-vue": "6.2.2",
      "html-webpack-plugin": "3.2.0",
      "mockjs": "1.0.1-beta3",
      "runjs": "4.3.2",
      "sass": "1.26.8",
      "sass-loader": "8.0.2",
      "script-ext-html-webpack-plugin": "2.1.3",
      "serve-static": "1.13.2",
      "svg-sprite-loader": "4.1.3",
      "svgo": "1.2.2",
      "vue-template-compiler": "2.6.10"
    })
    
    api.render('./web-minisize-template',{
      ...options
    })
    
    // api.injectImports(api.entryFile, 
    //   `import '@/style/index.scss'`)
     // package.json 添加统一包
   
    if(UIType === 'element'){
      Object.assign(dependencies,{
      })
      // api.injectImports(api.entryFile, 
      //   `import ElementUI from 'element-ui'`)
      // api.injectImports(api.entryFile, 
      //   `import 'element-ui/lib/theme-chalk/index.css'`)
      // api.injectImports(api.entryFile, 
      //   `import "@/style/element-variables.scss";`)
    }
  }else if(pageType === 'mobile'){
    Object.assign(dependencies,{
      "axios": "^0.21.1",
      "core-js": "^3.6.4",
      "echarts": "^4.6.0",
      "highlight.js": "^10.5.0",
      "lodash-es": "^4.17.15",
      "vant": "^2.5.4",
      "vue": "^2.6.12",
      "vue-router": "^3.5.1",
      "vuex": "^3.6.2"
    })
    Object.assign(devDependencies,{
        "@babel/plugin-proposal-optional-chaining": "^7.8.3",
        "@vue/cli-plugin-babel": "^4.2.0",
        "@vue/cli-plugin-eslint": "^4.2.0",
        "@vue/cli-service": "^4.2.0",
        "@vue/eslint-config-prettier": "^6.0.0",
        "babel-eslint": "^10.0.3",
        "babel-plugin-import": "^1.13.0",
        "babel-plugin-transform-imports": "^2.0.0",
        "babel-plugin-transform-remove-console": "^6.9.4",
        "eslint": "^6.7.2",
        "eslint-config-prettier": "^6.10.0",
        "eslint-plugin-prettier": "^3.1.2",
        "eslint-plugin-vue": "^6.1.2",
        "postcss-aspect-ratio-mini": "^1.0.1",
        "postcss-preset-env": "^6.7.0",
        "postcss-px-to-viewport": "^1.1.1",
        "postcss-write-svg": "github:jonathantneal/postcss-write-svg",
        "prettier": "^1.19.1",
        "sass": "^1.25.0",
        "sass-loader": "^8.0.2",
        "stylelint": "^13.9.0",
        "stylelint-config-standard": "^20.0.0",
        "tailwindcss": "^1.9.6",
        "vue-template-compiler": "^2.6.12",
        "webpack-bundle-analyzer": "^4.3.0"
    })
    scripts = {}
    api.render('./mobileTemplate',{
      ...options
    })
  }
 
  if(useWSocket){
    api.render('./wsTemplate')
  }
  /**配置 package.json */
  api.extendPackage({
    dependencies: dependencies,
    devDependencies:devDependencies,
    scripts: scripts
  })

  console.log('');
  log.success(`Success: 模版已生成.`);
  console.log('');
  console.log('新增命令:');
  console.log(`   ${chalk.green.bold('创建页面:')}`);
  console.log(`   ${chalk.cyan('npm run add-component')}`);
  console.log('');
  console.log(`${chalk.green.bold('Enjoy it!')}`);
  console.log('');

  //** import end   插入use */
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
    // fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
  });

}
