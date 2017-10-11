const express = require('express')
const compression = require('compression')
const app = express()
app.use(compression())
/**
* @summary Serves local static site
* @public
* @function
*
* @param {string} distDir - path to static assets
*
* @returns {Promise}
* @example
* view(distDir).then(_ => console.log('Freshly served'))
*/
module.exports = distDir => {
  app.use(express.static(distDir))
  app.listen(3000, _ => console.log('listening on 3000'))
}
