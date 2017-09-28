const webpackIsomorphicCompiler = require('webpack-isomorphic-compiler')
const loadExport = require('../utils/load-export')
const fs = require('fs-jetpack')
const getCompilers = require('../utils/get-compilers')

const getScriptTags = (stats) => {
  const assets = stats.client.compilation.assets
  return Object.keys(assets).sort().map(key => `/${key}`)
}

module.exports = async (locals, paths) => {
  const {
    clientCompiler,
    serverCompiler
  } = getCompilers(locals.landrConfig)

  try {
    const compiler = webpackIsomorphicCompiler(clientCompiler, serverCompiler)
    const stats = await compiler.run()
    const renderer = await loadExport(compiler)

    const pages = paths.map((path) => {
      return renderer.default(path, getScriptTags(stats), locals)
      .then(source => {
        return fs.writeAsync(`${serverCompiler.options.output.path}/${path}index.html`, source)
      })
    })

    return Promise.all(pages)
  } catch (err) {
    console.log(err)
  }
}
