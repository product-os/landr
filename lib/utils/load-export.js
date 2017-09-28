'use strict'
// shamelessly taken from https://github.com/moxystudio/webpack-isomorphic-dev-middleware/blob/master/lib/util/compilationResolver.js

const path = require('path')
const requireFromString = require('require-from-string')

function getServerFile (webpackConfig, stats) {
  const statsJson = stats.toJson({
    chunks: false,
    modules: false,
    children: false,
    assets: false,
    version: false
  })

  for (const key in statsJson.entrypoints) {
    return path.resolve(`${webpackConfig.output.path}/${statsJson.entrypoints[key].assets[0]}`)
  }

    /* istanbul ignore next */
  throw new Error('Unable to get built server file')
}

function loadExports (compiler) {
  const { webpackConfig, webpackCompiler } = compiler.server

    // Get the absolute path for the server file (bundle)
  const serverFile = getServerFile(webpackConfig, compiler.getStats().server)
    // Read the file contents
  return new Promise((resolve, reject) => {
    webpackCompiler.inputFileSystem.readFile(serverFile, (err, buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(buffer.toString())
      }
    })
  })
    // Eval as a nodejs module
    .then((source) => requireFromString(source, serverFile))
    .catch((err) => {
        // Add extra info to the error
      err.detail = 'The error above was thrown while trying to load the built server file:\n'
      err.detail += path.relative('', serverFile)
      throw err
    })
}

module.exports = loadExports
