# Webpack-Image-Compress-Plugin

[![author](https://img.shields.io/badge/author-DingkeXue-f66.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![node](https://img.shields.io/badge/node-%3E%3D%2010.0.0-3c9.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![npm](https://img.shields.io/badge/npm-%3E%3D%205.6.0-3c9.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![license](https://img.shields.io/badge/license-MIT-09f.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)

中文 | [English](./README.md)

```
这是一个在打包构建过程中自动压缩项目所依赖图片的webpack插件（通过https://tinypng.com/网站）
你可以通过配置在控制台查看具体的压缩信息，同时你也可以控制压缩图片时的并发请求数
```

## 安装
```
$ npm i webpack-image-compress-plugin --save-dev
```

## 使用

**webpack.config.js**
```js
const WebpackImageCompressPlugin = require('webpack-image-compress-plugin')

// 使用默认配置
module.exports = {
  plugins: [new WebpackImageCompressPlugin()]
}
```

---------------------or---------------------- 

```js
// 自定义配置
module.exports = {
  //... 其它配置
  plugins: [
    new WebpackImageCompressPlugin({
      log: true, // 布尔值  是否在控制台打印压缩信息，默认为true
      compress: process.env.NODE_ENV === "production", // 布尔值  是否压缩图片
      concurrency: 20, // 整数  请求并发数
      minSize: 1024 * 10, // 整数  图像压缩的最小尺寸 （默认 10k）
      maxSize: 1024 * 100 // 整数  图像压缩的最大尺寸 （默认无限制）
    })
  ]
}
```

**vue.config.js**
```js
const WebpackImageCompressPlugin = require('webpack-image-compress-plugin')

module.exports = {
  //... 其它配置
  configureWebpack: {
    plugins: [
      new WebpackImageCompressPlugin({
        log: true, // 布尔值  是否在控制台打印压缩信息，默认为true
        compress: process.env.NODE_ENV === "production", // 布尔值  是否压缩图片 默认为true
        concurrency: 20, // 整数  请求并发数 默认为20
        minSize: 1024 * 10, // 整数  图像压缩的最小尺寸 （默认 10k）
        maxSize: 1024 * 100 // 整数  图像压缩的最大尺寸 （默认无限制）
      })
    ]
  }
}
```

## License

[MIT](./LICENSE)


## 其它
您可以在 [Issue](https://github.com/DingkeXue/webpack-image-compress-plugin/issues) 上`提出您的宝贵建议`，我会认真您的建议！
您如果愿意和我一起维护该项目，我会非常高兴，我们可以成为共同作者！
您可以`clone`到本地，根据自己的需求修改代码！
如果您喜欢，可以fork或者给个star ❥(^_-)