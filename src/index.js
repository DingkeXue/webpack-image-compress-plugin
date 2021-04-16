const Https = require('https')
const Url = require('url')
const Chalk = require('chalk')
const Ora = require('ora')
const { DefaultHeader } = require('../utils/header')
const { IMG_TEST } = require('../utils/regexp')
const { ByteSize } = require('trample/node')
const { RawSource } = require("webpack-sources")
const pluginName = 'WebpackImageCompressPlugin'


module.exports = class WebpackImageCompressPlugin {
  constructor (options) {
    this._options = Object.assign({
      log: true,
      compress: true,
      concurrency: 20
    }, options)
  }

  apply(compiler) {
    // webpack verison >= 4
    if (compiler.hooks && this._options.compress) {
      const isWebpack4 = compiler.webpack ? false : typeof compiler.resolvers !== 'undefined';
      if (isWebpack4) {
        compiler.hooks.emit.tapPromise(pluginName, compilation => {
          return Promise.resolve(this.handleImgAssets(compilation))
        })
      } else { // webpack 5
        compiler.hooks.compilation.tap(pluginName, compilation => {
          compilation.hooks.processAssets.tapPromise(pluginName, () => {
            return Promise.resolve(this.handleImgAssets(compilation))
          })
        })
      }
    } else if (compiler.plugin && this._options.compress) {
      compiler.plugin('emit', compilation => {
        this.handleImgAssets(compilation)
      })
    } else {
      console.log(`The webpack version number supported by img-compress-plugin is 3-5！, install: https://webpack.js.org/`)
    }
  }

  async handleImgAssets(compilation) {
    const ImgAssets = compilation.assets
    const images = Object.keys(compilation.assets).filter(asset => IMG_TEST.test(asset))
    if (!images.length) {
      return Promise.resolve()
    }
    const imgPromises = images.map(img => this.compressImg(ImgAssets, img))
    const spinner = Ora('Start compressing......').start()
    await this.PromiseLimit(imgPromises, this._options.concurrency).then(res => {
      spinner.stop()
      this._options.log && res && res.forEach(msg => console.log(msg))
    })
  }

  PromiseLimit(pomiseArr, limit = 20) {
    let i = 0;
    const result = [];
    const executing = [];
    const queue = function() {
      if (i === pomiseArr.length) return Promise.all(executing);
      const p = pomiseArr[i++];
      result.push(p);
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        return Promise.race(executing).then(
          () => queue(),
          e => Promise.reject(e)
        );
      }
      return Promise.resolve().then(() => queue());
    };
    return queue().then(() => Promise.all(result));
  }
  

  async compressImg(assets, key) {
    try {
      const file = assets[key].source()
      const originData = await this.uploadImg(file)
      const compressedData = await this.downloadImg(originData.output.url)
      assets[key] = new RawSource(Buffer.alloc(compressedData.length, compressedData, 'binary'))
      const oldSize = Chalk.red(ByteSize(originData.input.size))
      const newSize = Chalk.green(ByteSize(originData.output.size))
      const msg = `Compressed ${[Chalk.yellowBright(key)]} completed! Old Size: ${oldSize}, New Size: ${newSize}`
      return new Promise((resolve, reject) => resolve(msg))
    } catch (error) {
      const msg = `Compressed [${Chalk.yellowBright(key)}] failed! ${Chalk.red(error)}`;
			return new Promise((resolve, reject) => resolve(msg))
    }
  }

  uploadImg(source) {
    const header = DefaultHeader()
    return new Promise((resolve, reject) => {
      const req = Https.request(header, res => res.on('data', data => {
        const resObj = JSON.parse(data.toString())
        resObj.error ? reject(resObj.message) : resolve(resObj)
      }))
      req.write(source, 'binary')
      req.on('error', e => reject(e))
      req.end()
    })
  }

  downloadImg(url) {
    const URL = new Url.URL(url)
    return new Promise((resolve, reject) => {
      const req = Https.request(URL, res => {
        let file = ''
        res.setEncoding('binary')
        res.on('data', data => file += data)
        res.on('end', () => resolve(file))
      })
      req.on('error', e => reject(e))
      req.end()
    })
  }
}