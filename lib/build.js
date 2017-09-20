const webpack = require('webpack')
// returns a Compiler instance

module.exports = (config) => {
  return new Promise(function (resolve, reject) {
    webpack(config, function (err, stats) {
      if (err) {
        resolve(err)
      } else {
        resolve(stats)
      }
    })
  })
}
