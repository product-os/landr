/* eslint-disable */
'use strict';
const Promise = require('bluebird')
const handlebars = require('handlebars')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports.compile = () => {
  var webpackConfig = require('./webpack.config.js')
  var compiler = webpack(webpackConfig)
  return new Promise(function(resolve, reject) {
    compiler.run(function(err, stats) {
      if (err) {
        reject(err)
      }
      resolve({ compiler: compiler })
    });
  });
}

module.exports.serve = (instance) => {
  let { compiler } = instance
  return new Promise(function(resolve, reject) {
    let server = new WebpackDevServer(compiler, {
      quiet: false,
      stats: { colors: true },
      port: 8080,
      noInfo: false,
      contentBase: `${process.cwd()}/www/dist`,
      compress: true
    })
    server.listen(8080, "localhost", function() {
      resolve()
    });
  })
}
