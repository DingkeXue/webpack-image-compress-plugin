# Webpack-Image-Compress-Plugin

[![author](https://img.shields.io/badge/author-DingkeXue-f66.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![node](https://img.shields.io/badge/node-%3E%3D%2010.0.0-3c9.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![npm](https://img.shields.io/badge/npm-%3E%3D%205.6.0-3c9.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)
[![license](https://img.shields.io/badge/license-MIT-09f.svg)](https://github.com/DingkeXue/webpack-image-compress-plugin)

English | [简体中文](./README.zh-CN.md)

```
A webpack plugin to compress images(png|jpe?g) by using tinypng.com

You can view the specific compression information through the log, 
and you can control the number of concurrent requests
```

## Install
```
$ npm i webpack-image-compress-plugin --save-dev
```

## Usage

**webpack.config.js**
```js
const WebpackImageCompressPlugin = require('webpack-image-compress-plugin')

module.exports = {
  //... your config
  plugins: [
    new WebpackImageCompressPlugin({
      log: true, // Boolean ===> Show compressed information on the console (default: true)
      compress: process.env.NODE_ENV === "production", // Boolean ===> Whether to enable compression (default: true)
      concurrency: 20 // Number ===> The number of concurrent requests (default: 20)
    })
  ]
}
```

**vue.config.js**
```js
const WebpackImageCompressPlugin = require('webpack-image-compress-plugin')

module.exports = {
  //... your config
  configureWebpack: {
    plugins: [
      new WebpackImageCompressPlugin({
        log: true, // Boolean ===> Show compressed information on the console
        compress: process.env.NODE_ENV === "production", // Boolean ===> Whether to enable compression
        concurrency: 20 // Number ===> The number of concurrent requests (default: 20)
      })
    ]
  }
}
```

## License

[MIT](./LICENSE)


## Others
You can submit [Issue](https://github.com/DingkeXue/webpack-image-compress-plugin/issues) or follow me or Star⭐