# Change Log
---

## 1.0.1

`2017-08-16`

- webpack 自动构建工具

  - `New` 引入`webpack.ProgressPlugin`打包进度条，有关配置在template/build/webpack.prod.conf.js文件里（98行）

  - `New` 引入`webpack-spritesmith`图片精灵功能，把需要合并的小图片拷贝至`src/assets/images/sprites`，执行命令行`npm run dll`，会在项目`src/assets/less/`自动生成`_sprite.css`（已在main.less里引用）。有关配置在template/build/webpack.dll.conf.js文件里（75行）

  - `New` 引入`imagemin-webpack-plugin`图片压缩功能，有关配置在template/build/webpack.prod.conf.js文件里（122行）

  - `New` 将相关第三方模块依赖（node_modules里的具体模块），依靠CommonsChunkPlugin功能，打包到vendor.js文件里，利于实现增量更新，有关配置在template/build/webpack.prod.conf.js文件里（70行）

 - `Improved` 添加生产环境中，去除js文件的日志信息功能，有关配置在template/build/webpack.prod.conf.js文件里（36行）
 
  - `Improved` html文件里需要引用的图片静态资源，新增copyfiles文件夹。这样就不需要每次手动在webpack.dll.conf.js添加

  - `Update` 更新package.json的`webpack`版本

- 项目src

  - `New` 采用es6语法
  
  - `New` 新增文件夹`business`至目录`modules`下，将具体业务模块放到这里

  - `New` 新增文件夹`copyfiles`和`sprites`至目录`assets/images`

  - `New` 新增文件夹`widget`至目录`assets/less`，主要放置web组件的样式文件，如button.less

  - `Update` 更新package.json的`webpack`版本

  - `Changed` 删除`font.less`，直接引用fonts文件夹下的iconfont.css。