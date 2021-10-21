const path = require('path')

function resolve(dir) {
  // __dirname 执行的 js 文件的绝对路径
  // join 使用操作系统连接符拼接地址
  return path.join(__dirname, dir)
}

module.exports = {
  // 如https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  // 也可设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
  // 相对路径的 publicPath 有一些使用上的限制。在以下情况下，应当避免使用相对 publicPath:
  // 1-当使用基于 HTML5 history.pushState 的路由时；
  // 2-当使用 pages 选项构建多页面应用时。
  // publicPath: './', // Vue CLI 3.3 前为 baseUrl
  // publicPath: process.env.MODE_ENV === 'production' ? '/my-app' : './', // Vue CLI 3.3 前为 baseUrl
  publicPath: process.env.MODE_ENV === 'production' ? '/' : './', // Vue CLI 3.3 前为 baseUrl

  outputDir: './dist',

  pages: {
    index: {
      entry: 'src/main.js', // page 的入口
      template: 'public/index.html', // 模板来源
      filename: 'GameGem.html', // 在 dist/index.html 的输出
      title: 'index', // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }

    // todoList: {
    //   entry: 'src/main-todoList.js', // page 的入口
    //   template: 'public/todoList.html', // 模板来源
    //   filename: 'todoList.html', // 在 dist/index.html 的输出
    //   title: 'todo list', // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ['chunk-vendors', 'chunk-common', 'todoList']
    // }
    // subpage: 'src/main-subpage.js'
  },

  lintOnSave: false,

  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

  // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...

      // -> devtool start
      // config.devtool = 'eval' // 1 -build: fast -rebuild: fastest 每个模块被转化为字符串，在模块尾部添加 //# souceURL（指明eval前文件）后，被 eval 包裹起来
      // config.devtool = 'source-map' // 2 -build: slowest -rebuild: slowest 产生一个单独的 source-map 文件，功能最完全
      // config.devtool = 'hidden-source-map' // 3 -build: slowest -rebuild: slowest 打包结果与 source-map 一致，但是 .map 文件结尾不显示 //# sourceMappingURL
      // config.devtool = 'inline-source-map' // 4 -build: slowest -rebuild: slowest 为打包前的每个文件添加 sourcemap 的 dataUrl，追加到打包后文件内容的结尾；此处，dataUrl 包含一个文件完整 sourcemap 信息的 Base64 格式化后的字符串
      config.devtool = 'eval-source-map' // 5 -build: slowest -rebuild: ok 使用 eval 打包源文件模块，直接在源文件中写入干净完整的 source-map，不影响构建速度，但影响执行速度和安全，建议开发环境中使用，生产阶段不要使用
      // config.devtool = 'cheap-source-map' // 6 -build: slowest -rebuild: ok 同 source-map，但不包含列信息，不包含 loader 的 sourcemap 如 babel 的 sourcemap
      // config.devtool = 'cheap-module-source-map' // 7 -build: slow -rebuild: slow 会产生一个不带映射到列的单独的 map 文件，开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便
      // config.devtool = 'eval-cheap-module-source-map' // 8 -build: slow -rebuild: fast 不会产生单独的 map 文件，（与 eval-source-map 类似）但开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便
      // config.devtool = '...' // 9 其他配置参考 webpack 官网

      // 以下选项适合开发环境：
      //  eval
      //    - 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。
      //  eval-source-map * * * * *
      //    - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。
      //  eval-cheap-source-map
      //    - 类似 eval-source-map，每个模块使用 eval() 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 eval devtool。
      //  eval-cheap-module-source-map
      //    - 类似 eval-cheap-source-map，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

      // 以下选项适合生产环境：
      //  (none)（省略 devtool 选项）* * * * *
      //    - 不生成 source map。这是一个不错的选择。
      //  source-map
      //    - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。
      //  hidden-source-map
      //    - 与 source-map 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用。
      //  nosources-source-map
      //    - 创建的 source map 不包含 sourcesContent(源代码内容)。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。
      // -> devtool end
    }
  },

  chainWebpack: config => {
    // 链式操作

    // 会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set('~assets', resolve('src/assets'))
    config.resolve.alias.set('~components', resolve('src/components'))
    config.resolve.alias.set('~views', resolve('src/views'))

    config.resolve.alias.set('~managers', resolve('src/models/managers'))
    config.resolve.alias.set('~services', resolve('src/models/services'))
    config.resolve.alias.set('~utils', resolve('src/models/utils'))
  },

  css: {
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       require('postcss-plugin-px2rem')({
    //         rootValue: 75, // 即 1 rem = x px; iphone6 为基准 750 的设计稿，使用 75【 750 / 10 = 75】
    //         // unitPrecision: 5, //允 许REM单位增长到的十进制数字
    //         // propWhiteList: [],  // 默认值是一个空数组，这意味着禁用白名单并启用所有属性
    //         // propBlackList: [], // 黑名单
    //         exclude: /(node_module)/, //默认 false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //
    //         // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。使用 selectorBlackList字段，来过滤
    //         // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px
    //         // selectorBlackList: [], //要忽略并保留为px的选择器 忽略转换正则匹配项
    //
    //         // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用 ignoreidentifier 后，replace 将自动设置为 true
    //         // replace: true, // （布尔值）替换包含 REM 的规则，而不是添加回退
    //         mediaQuery: false, //（布尔值）允许在媒体查询中转换 px
    //         minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
    //       })
    //     ]
    //   }
    // }
  },

  devServer: {
    // 原因：新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。
    // 解决：webpack.dev.conf.js添加配置 disableHostCheck: true,
    disableHostCheck: true,

    host: '0.0.0.0', // 0.0.0.0
    port: 1234,
    open: true,
    https: false,
    hot: true,
    hotOnly: false,
    // openPage: '/different/page',

    // proxy: 'http://localhost:4000',
    proxy: {
      // '/api': {
      //   target: '<url>', // target host
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/api/old-path': '/api/new-path', // rewrite path
      //     '^/api/remove/path': '/path' // remove base path
      //   }
      // },
      // '/yourApi': {
      //   target: 'https://your.service.com/',
      //   changeOrigin: true // 是否跨域
      // },
      '/offerwall': {
        target: 'http://localhost:8080/',
        changeOrigin: true // 是否跨域
      }
    }
  }
}
