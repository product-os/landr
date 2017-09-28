const webpack = require('webpack')
const path = require('path')

const getPlugins = (landrConfig, stage) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(landrConfig.env)
      }
    })
  ]

  if (stage === 'client') {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // Specify the common bundle's name.
        minChunks: function (module, count) {
          return module.context && module.context.indexOf('node_modules') >= 0
        }
      })
    )
  }

  if (landrConfig.env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin())
  }

  return plugins
}

const getOutput = (landrConfig, stage) => {
  switch (stage) {
    case 'server':
      return {
        filename: `static.js`,
        path: landrConfig.distDir,
        libraryTarget: 'commonjs2'
      }
    case 'client':
      return {
        filename: landrConfig.env === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: 'http://localhost:3000/',
        path: landrConfig.distDir
      }
  }
}

module.exports = (landrConfig, stage) => {
  return {
    entry: `${__dirname}/entry.js`,
    output: getOutput(landrConfig, stage),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-0'].map(require.resolve),
            plugins: ['babel-plugin-styled-components'].map(require.resolve)
          }
        }
      ]
    },
    resolve: {
      alias: {
        'pages': `${path.resolve(__dirname, 'themes')}/${landrConfig.theme}/pages`,
        'components': `${path.resolve(__dirname, 'themes')}/${landrConfig.theme}/components`,
        'theme': `${path.resolve(__dirname, 'themes')}/${landrConfig.theme}/theme`
      },
      modules: [path.resolve(__dirname, '../node_modules')]
    },
    resolveLoader: {
      modules: [ path.resolve(__dirname, '../node_modules')]
    },
    plugins: getPlugins(landrConfig, stage)
  }
}
