const webpack = require('webpack')
const generateConfig = require('./webpack')

module.exports = (landrConfig) => {
  const clientConfig = generateConfig(landrConfig, 'client')
  const serverConfig = generateConfig(landrConfig, 'server')
  const clientCompiler = webpack(clientConfig)
  const serverCompiler = webpack(serverConfig)

  return {
    clientCompiler,
    serverCompiler
  }
}
