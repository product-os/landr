const webpackIsomorphicCompiler = require('webpack-isomorphic-compiler')
const loadExport = require('./utils/load-export')
const fs = require('fs-jetpack')
const getCompilers = require('./utils/get-compilers')

const getScriptTags = (stats) => {
  const assets = stats.client.compilation.assets
  return Object.keys(assets).sort().map(key => `/${key}`)
}

const cleanDistDir = (dir) => {
  return fs.dirAsync(dir, { empty: true })
}

/**
* @summary Runs webpack build
* @public
* @function
*
* @param {Object} locals - props supplied to react app
* @param {Array} pages - pages array used to generate routes
*
* @returns {Promise}
* @example
* build({}, [
*   {
*    path: '/',
*    component: 'Index',
*    exact: true
*    }
* ]).then(_ => console.log('Built'))
*/
module.exports = async ({
  config,
  locals,
  pages
}) => {
  try {
    const {
      clientCompiler,
      serverCompiler
    } = getCompilers(config)

    // clean dir
    await cleanDistDir(config.distDir)
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
      return renderer.default({
        path: page.path,
        assets: getScriptTags(stats),
        locals: Object.assign(locals, { config }),
        pages
      })
      .then(source => {
        return fs.writeAsync(`${serverCompiler.options.output.path}/${page.path}index.html`, source)
      })
    })

    return Promise.all(files)
  } catch (err) {
    throw err
  }
}
