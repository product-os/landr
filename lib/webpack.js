const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const getPlugins = (config, data) => {
  const plugins = [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
      }
    }),
  ]

  if (config.env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin)
  }

  return plugins
}

module.exports = (config, data) => {
  return {
    entry: `${__dirname}/entry.js`,
    output: {
      filename: `bundle.js`,
      path: config.distDir,
      libraryTarget: 'umd'
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
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
        'pages': `${path.resolve(__dirname, '../node_modules')}/${config.theme}/pages`,
        'components': `${path.resolve(__dirname, '../node_modules')}/${config.theme}/components`,
        'theme': `${path.resolve(__dirname, '../node_modules')}/${config.theme}/theme`
      },
      modulesDirectories: ['node_modules'],
      fallback: [ path.resolve(__dirname, '../node_modules') ]
    },
    resolveLoader: {
      modulesDirectories: [ path.resolve(__dirname, '../node_modules'), 'node_modules' ]
    },
    plugins: getPlugins(config, data)
  }
}
