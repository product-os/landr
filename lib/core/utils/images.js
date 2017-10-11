const pathParse = require('path-parse')
const cache = {}

function importAll(r) {
  r.keys().forEach(key => (cache[pathParse(key).name] = r(key)))
}

importAll(require.context('static/', true, /\.(png|svg|jpg|gif|ico)$/))

module.exports = cache
