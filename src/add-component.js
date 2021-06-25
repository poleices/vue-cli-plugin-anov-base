/**
 * @file Add Component 逻辑
 */
 'use strict';

 const fs = require('fs');
 const path = require('path');
 const glob = require('glob');
 const chalk = require('chalk');
 const inquirer = require('inquirer');
 
 const log = require('./utils/log');
 const suffix = require('./utils/suffix');
 
 module.exports = async (api) => {
   // 交互式命令行参数 获取组件信息
   const { componentName } = await inquirer.prompt([
     {
       name: 'componentName',
       type: 'input',
       message: `请输入新页面名称 ${chalk.yellow(
         '( PascalCase )'
       )}`,
       description: `请输入 ${chalk.yellow(
         'PascalCase'
       )}, 作为新文件名称.`,
       default: 'HelloWorld'
     }
   ]);
 
   // 组件名称校验
   if (!componentName.trim() || /[^A-Za-z0-9]/g.test(componentName)) {
     log.error(
       `Error: 请输入正确的名称. ${chalk.bold('( PascalCase )')}`
     );
     return;
   }
 
   /** 默认生成在 views 文件夹 */
   const baseDir = `${api.getCwd()}/src/views`;
   const existComponent = glob.sync(`${baseDir}/*`);
 
   const existComponentName = existComponent.map((name) =>
     name.replace(`${baseDir}/`, '')
   );
 
   // 判断组件是否已存在
   const isExist = existComponentName.some((name) => {
     const reg = new RegExp(
       `^(${componentName}.[vue|jsx|tsx])$|^(${componentName})$`,
       'g'
     );
     return reg.test(name);
   });
 
   if (isExist) {
     log.error(`Error: Component ${chalk.bold(componentName)} already exists.`);
     return;
   }
 
   // 交互式命令行 获取组件信息
   const {
     componentType,
   } = await inquirer.prompt([
     {
       name: 'componentType',
       type: 'list',
       message: `请选择文件类型. ${chalk.yellow(
         '( .vue / .tsx / .jsx )'
       )}`,
       choices: [
         { name: 'SFC (.vue)', value: 'sfc' },
         { name: 'TSX (.tsx)', value: 'tsx' , disabled:true},
         { name: 'JSX (.jsx)', value: 'jsx' , disabled:true}
       ],
       default: 'sfc'
     }
   ]);
 
   let src = path.resolve(
     __dirname,
     `../generator/serviceTemplate/Template${suffix(componentType)}`
   );
   let dist = `${baseDir}/${componentName}${suffix(componentType)}`;

 
   // 生成 SFC/TSX/JSX 及 CSS/SCSS/Sass/Less/Stylus
   try {
     const template = fs
       .readFileSync(src)
       .toString()
       .replace(/helloworld/gi, componentName);
     
      fs.writeFileSync(
        dist,
        template
      );
  
     log.success(
       `成功生成页面  ${chalk.bold(
         componentName
       )} 
       路径 ： 
       ${chalk.bold(dist)} `
     );
   } catch (e) {
     log.error(e);
     return;
   }
 };