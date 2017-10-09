const webpack = require('webpack')
const generateConfig = require('./webpack')

module.exports = config => {
  const clientConfig = generateConfig(config, 'client')
  const serverConfig = generateConfig(config, 'server')
  const clientCompiler = webpack(clientConfig)
  const serverCompiler = webpack(serverConfig)

  return {
    clientCompiler,
    serverCompiler
  }
}
