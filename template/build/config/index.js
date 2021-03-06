var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../../', 'dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    // Imagemin
    // Set to `true` to turn it on
    // Before setting to `true`, make sure to:
    // npm install --save-dev imagemin-webpack-plugin
    productionImagemin: false
  },
  dev: {
    env: require('./dev.env'),
    port: 4000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  directory: {
    root: path.resolve(__dirname, '../../'),
    src: path.resolve(__dirname, '../../', 'src'),
    assets: path.resolve(__dirname, '../../src', 'assets'),
    dll: path.resolve(__dirname, '../../src/assets', 'dll'),
    vendor: path.resolve(__dirname, '../../src/assets/js', 'vendor'),
    modules: path.resolve(__dirname, '../../src', 'modules'),
    nodeModules: path.resolve(__dirname, '../../', 'node_modules')
  }
}
