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
      name: 'locale',
      message: 'The locale of project localization.',
      validate: input => !!input,
      default: 'en'
    },
    {
      name: `addExampleRoutes`,
      type: 'confirm',
      message: 'Add example routes?',
      default: false
    }
  ]

  // 添加动态对话
  if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
    prompts.push({
      type: 'confirm',
      name: 'useESLintPluginVueI18n',
      message: 'Use ESLint plugin for Vue I18n ?'
    })
  }

  return prompts
}