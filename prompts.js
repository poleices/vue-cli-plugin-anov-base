// 创建时 询问对话
// module.exports = [
//   {
//     type: 'input',
//     name: 'locale',
//     message: 'The locale of project localization.',
//     validate: input => !!input,
//     default: 'en'
//   }
//   // ...
// ]

// 将 `package.json` 作为参数传入函数
module.exports = pkg => {
  const prompts = [
    {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          validate: input => !!input
    },
    {
      name: 'pageType',
      type: 'list',
      message: '请选择模版类型',
      choices:[{
        name:'web',
        value:'web'
      },{
        name:'mobile',
        value:'mobile'
      },{
        name:'WX-miniProgram',
        value:'miniProgram',
        disabled:true
      }],
      default: 'web'
    },
    {
      name: 'UIType',
      type: 'list',
      message: '请选择UI模版',
      when:(opt) =>{
        if(opt.pageType === 'web'){
          return true
        }
        return false
      },
      choices:[{
        name:'element',
        value:'element'
      },{
        name:'ant-design',
        value:'ant',
        disabled:true
      }],
      default: 'element'
    },
    {
      type: 'confirm',
      name: 'useWSocket',
      message: '是否需要websocket配置 ?',
      default:true
    },
    {
      type: 'confirm',
      name: 'usePermission',
      message: '是否加载智慧树权限代码 ?',
      default:false
    }
  ]

  // 添加动态对话
  // if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
  //   prompts.push({
  //     type: 'confirm',
  //     name: 'useESLintPluginVueI18n',
  //     message: 'Use ESLint plugin for Vue I18n ?'
  //   })
  // }

  return prompts
}