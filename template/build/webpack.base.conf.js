var path = require('path')
var utils = require('./utils')
var config = require('./config')
var webpack = require('webpack')
var os = require('os')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

var base = {
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': utils.resolve('src'),
      /* assets */
      '@assets': utils.resolve('src/assets'),
      /* less */
      '@less': utils.resolve('src/assets/less'),
      /* js */
      '@js': utils.resolve('src/assets/js'),
      /* plugins */
      '@plugins': utils.resolve('src/assets/plugins'),
      /* views */
      '@views': utils.resolve('src/views'),
      /* bootstrap 相关 */
      'bootstrap': utils.resolve('node_modules/bootstrap/dist/js/bootstrap.min'),
      'bootstrap_css': utils.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css'),
      'cloud_ui': utils.resolve('node_modules/cloud-broker-ui/dist/css/cloud-ui.min.css'),

      //nprogress
      'nprogress_css': utils.resolve('node_modules/nprogress/nprogress.css'),

      // 项目公用
      'lang': utils.resolve('src/modules/lang/zh-cn'),
      'config': utils.resolve('src/modules/config'),
      'variable': utils.resolve('src/assets/less/variable.less'),
      'utils': utils.resolve('node_modules/cloud-utils/dist/cloud-utils.min'),
      'mixins': utils.resolve('node_modules/magicless/magicless.less'),
      /* components */
      'locale_zh':utils.resolve('src/assets/js/vendor/angular-locale_zh-cn')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src/modules')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=happybabel'],
        include: [utils.resolve('src/modules'), utils.resolve('test')]
      },
      {
        test: /\.html$/,
        use: ['happypack/loader?id=happyhtml'],
        include: config.directory.src,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    /* 全局shimming */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),

    //开启 happypack 的线程池
    //原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),

    new HappyPack({
      id: 'happyhtml',
      loaders: ['raw-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
}

if(process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.modules + '/main.js'
  }
}

module.exports = base;
