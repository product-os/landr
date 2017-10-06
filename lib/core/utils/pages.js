// so works in browser
const pathParse = require('path-parse')
const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[pathParse(key).name] = r(key));
}

importAll(require.context('pages/', true, /\.js$/));

module.exports = cache;
