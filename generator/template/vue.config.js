'use strict'
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'MOON' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8887 // dev port

const testProxy = 'http://172.16.21.73:8190' // test

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'platform/static',
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/spark/api': {
        target: testProxy,
        changeOrigin: true,
        pathRewrite: {
          '/spark/api': ''
        }
      },
      '/api': {
        target: testProxy,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
      '/ws': {
        target: testProxy,
        changeOrigin: true,
        pathRewrite: {
          '': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  // chainWebpack(config) {
  //   config.plugins.delete('preload') // TODO: need test
  //   config.plugins.delete('prefetch') // TODO: need test
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/icons'))
  //     .end()

  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolve('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()

  //   // set preserveWhitespace
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       options.compilerOptions.preserveWhitespace = true
  //       return options
  //     })
  //     .end()

  //   config
  //     // https://webpack.js.org/configuration/devtool/#development
  //     .when(process.env.NODE_ENV === 'development', config =>
  //       config.devtool('cheap-source-map')
  //     )

  //   config.when(process.env.NODE_ENV !== 'development', config => {
  //     config
  //       .plugin('ScriptExtHtmlWebpackPlugin')
  //       .after('html')
  //       .use('script-ext-html-webpack-plugin', [
  //         {
  //           // `runtime` must same as runtimeChunk name. default is `runtime`
  //           inline: /runtime\..*\.js$/
  //         }
  //       ])
  //       .end()
  //     config.optimization.splitChunks({
  //       chunks: 'all',
  //       cacheGroups: {
  //         libs: {
  //           name: 'chunk-libs',
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: 10,
  //           chunks: 'initial' // only package third parties that are initially dependent
  //         },
  //         elementUI: {
  //           name: 'chunk-elementUI', // split elementUI into a single package
  //           priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //           test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //         },
  //         commons: {
  //           name: 'chunk-commons',
  //           test: resolve('src/components'), // can customize your rules
  //           minChunks: 3, //  minimum common number
  //           priority: 5,
  //           reuseExistingChunk: true
  //         }
  //       }
  //     })
  //     config.optimization.runtimeChunk('single')
  //   })
  // },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'font-size-base': '12px',
            'heading-color': '#FFFFFF',
            'text-color': '#C6C6C6',
            'border-radius-base': '2px',
            'border-color-base': '#656565',
            'input-placeholder-color': '#555555',
            'component-background': '#2b2b2b',
            'item-hover-bg': '#525252',
            'tree-directory-selected-bg': '#525252',
            'item-active-bg': '#525252',
            'select-item-active-bg': '#525252',
            'tabs-card-head-background': '#525252',
            'tabs-card-height': '32px',
            'tabs-card-active-color': '#2b2b2b',
            'table-bg': '#393939',
            'table-header-bg': '#525252',
            'table-header-color': '#C6C6C6',
            'table-row-hover-bg': '#525252',
            'table-selected-row-bg': '#525252',
            'input-addon-bg': '#2b2b2b',
            'table-header-sort-bg': '#525252'
          },
          javascriptEnabled: true
        }
      }
    }
  }
}
