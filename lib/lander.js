/* eslint-disable */
'use strict';
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))
const handlebars = require('handlebars')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const engine = require('./hbs')(handlebars)

const renderlayout = (layoutName, content) => {
  return engine.compile(engine.partials[layoutName])(content)
}

const renderBlocks = (blocks, globalContext) => {
  return blocks.reduce((accumulator, b) => {
    let tmpl = engine.compile(engine.partials[b.template])
    return accumulator + tmpl({
      global: globalContext,
      partial: b.context
    })
  }, '')
}

module.exports.build = (instance) => {
  let { config } = instance
  return fs.outputFileAsync(`${process.cwd()}/.lander/index.html`,
    renderlayout('layout', {
      global: config.global,
      contents: renderBlocks(config.blocks, config.global)
    })).then(html => {
      return {
        config: config
      }
    })
}

module.exports.compile = (instance) => {
  let { config } = instance
  var webpackConfig = require('./webpack.config.js')(config)
  var compiler = webpack(webpackConfig)
  return new Promise(function(resolve, reject) {
    compiler.run(function(err, stats) {
        if (err) {
          reject(err)
        }
        resolve({
          config: config,
          compiler: compiler
        })
    });
  });
}

module.exports.serve = (instance) => {
  let { config, compiler } = instance
  return new Promise(function(resolve, reject) {
    let server = new WebpackDevServer(compiler, {
      quiet: false,
      stats: { colors: true },
      port: 8080,
      noInfo: false,
      contentBase: `${process.cwd()}/.lander`,
      compress: true
    })
    server.listen(8080, "localhost", function() {
      resolve()
    });
  })
}
