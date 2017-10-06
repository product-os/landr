const express = require('express')
const app = express()
const webpackIsomorphicDevMiddleware = require(`webpack-isomorphic-dev-middleware`)
const getCompilers = require('./utils/get-compilers')

/**
* @summary Serves webpack compilers output
* @public
* @function
*
* @param {Object} locals - props supplied to react app
* @param {Array} pages - pages array used to generate routes
*
* @returns {Promise}
* @example
* serve({}, [
*   {
*    path: '/',
*    component: 'Index',
*    exact: true
*    }
* ]).then(_ => console.log('Freshly served'))
*/
module.exports = (locals) => {
  const {
    clientCompiler,
    serverCompiler
  } = getCompilers(locals.landrConfig)

  app.use('/static', express.static(`${locals.landrConfig.distDir}/static`))

  app.use(webpackIsomorphicDevMiddleware(clientCompiler, serverCompiler, {
    report: true
  }))

  const getScriptTags = (res) => {
    const assets = res.locals.isomorphicCompilation.stats.client.compilation.assets
    return Object.keys(assets).sort().map(key => `/${key}`)
  }

  app.use(async (req, res, next) => {
    // res.isomorphicCompilation contains `stats` & `exports` properties:
    // - `stats` contains the client & server stats
    // - `exports` contains the server render functions
    try {
      const render = res.locals.isomorphicCompilation.exports.default
      const source = await render(req.url, getScriptTags(res), locals)
      res.send(source)
    } catch (err) {
      next(err)
    }
  })

  app.listen(3000, _ => console.log('listening on 3000'))
}
