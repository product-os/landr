const webpackIsomorphicCompiler = require('webpack-isomorphic-compiler')
const loadExport = require('./utils/load-export')
const fs = require('fs-jetpack')
const getCompilers = require('./utils/get-compilers')

const getScriptTags = (stats) => {
  const assets = stats.client.compilation.assets
  return Object.keys(assets).sort().map(key => `/${key}`)
}

module.exports = async (locals, pages) => {
  const {
    clientCompiler,
    serverCompiler
  } = getCompilers(locals.landrConfig)

  try {
    const compiler = webpackIsomorphicCompiler(clientCompiler, serverCompiler)

    compiler
    .on('begin', () => console.log('Compilation started'))
    .on('end', (stats) => {
      console.log('Compilation finished successfully')
    })
    .on('error', (err) => {
      console.log('Compilation failed')
      console.log(err.message)
      console.log(err.stats.toString())
    })

    const stats = await compiler.run()
    const renderer = await loadExport(compiler)

    const files = pages.map((page) => {
      return renderer.default(page.path, getScriptTags(stats), locals)
      .then(source => {
        return fs.writeAsync(`${serverCompiler.options.output.path}/${page.path}index.html`, source)
      })
    })

    return Promise.all(files)
  } catch (err) {
    throw err
  }
}
