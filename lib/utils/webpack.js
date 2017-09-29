const webpack = require('webpack')
const path = require('path')
const LandrRootDir = path.resolve(__dirname, '../../')

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
    devtool: 'cheap-eval-source-map',
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
      symlinks: true,
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'pages': `${LandrRootDir}/lib/themes/${landrConfig.theme}/pages`,
        'components': `${LandrRootDir}/lib/themes/${landrConfig.theme}/components`,
        'theme': `${LandrRootDir}/lib/themes/${landrConfig.theme}/theme`
      },
      modules: [ `${LandrRootDir}/node_modules`, `/Users/gaudi/work/resin-components/node_modules` ]
    },
    resolveLoader: {
      modules: [ `${LandrRootDir}/node_modules` ]
    },
    plugins: getPlugins(landrConfig, stage)
  }
}
