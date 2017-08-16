var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SpritesmithPlugin = require('webpack-spritesmith')

// 需要dll打包进来的文件
var vendors = [
  'angular',
  'angular-cookies',
  'angular-messages',
  'angular-ui-bootstrap',
  'angular-ui-router',
  'angular-ui-validate',
  'bootstrap_css',
  'cloud_ui',
  'jquery',
  'locale_zh'
]

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    vendor: vendors
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: '#source-map',
  output: {
    path: config.directory.dll,
    filename: '[name].dll.js',
    // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      // path 定义 vendors 文件生成的位置
      // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      path: path.join(config.directory.root, 'vendor-manifest.json'),

      // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致 dll bundle 输出到那个全局变量上
      name: '[name]_library',

      // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
      context: config.directory.root
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      sourceMap: true
    }),

    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].dll.css'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // sprites图片精灵
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(config.directory.assets, './images/sprites/'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(config.directory.assets, './images/_sprites.png'),
        css: path.resolve(config.directory.assets, './less/_sprite.css'),
      },
      apiOptions: {
        cssImageRef: '../images/_sprites.png',
      },
      spritesmithOptions: {
        algorithm: 'top-down'
      }
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
