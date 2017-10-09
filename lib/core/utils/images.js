const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('static/', true, /\.(png|svg|jpg|gif|ico)$/));

module.exports = cache;
