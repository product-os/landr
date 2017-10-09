const webpack = require('webpack')
const path = require('path')
const LandrRootDir = path.resolve(__dirname, '../../../')
const StatsPlugin = require('stats-webpack-plugin')

const getPlugins = (config, stage) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev
          ? JSON.stringify('development')
          : JSON.stringify('production')
      },
      __PATH_PREFIX__: JSON.stringify(config.pathPrefix)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]

  if (stage === 'client') {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // Specify the common bundle's name.
        minChunks: function(module, count) {
          return module.context && module.context.indexOf('node_modules') >= 0
        }
      })
    )
  }

  if (!config.dev && stage === 'client') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
          beautify: false
        }
      })
    )
    plugins.push(new StatsPlugin('stats.json'))
  }

  return plugins
}

const getOutput = (config, stage) => {
  switch (stage) {
    case 'server':
      return {
        filename: 'static.js',
        path: config.distDir,
        publicPath: config.dev
          ? 'http://localhost:3000/'
          : config.pathPrefix ? `${config.pathPrefix}/` : '/',
        libraryTarget: 'commonjs2'
      }
    case 'client':
      return {
        filename: config.dev ? '[name].js' : '[name]-[hash].js',
        publicPath: config.dev
          ? 'http://localhost:3000/'
          : config.pathPrefix ? `${config.pathPrefix}/` : '/',
        path: config.distDir
      }
  }
}

module.exports = (config, stage) => {
  return {
    target: stage === 'server' ? 'node' : 'web',
    devtool: config.dev ? 'cheap-eval-source-map' : 'source-map',
    entry: `${__dirname}/entry.js`,
    output: getOutput(config, stage),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              'babel-preset-env',
              'babel-preset-react',
              'babel-preset-stage-0'
            ].map(require.resolve),
            plugins: ['babel-plugin-styled-components'].map(require.resolve)
          }
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      symlinks: true,
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        pages: `${LandrRootDir}/lib/themes/${config.theme}/pages`,
        components: `${LandrRootDir}/lib/themes/${config.theme}/components`,
        theme: `${LandrRootDir}/lib/themes/${config.theme}/theme`,
        static: `${config.dir}/www/static`,
        images: `${LandrRootDir}/lib/core/utils/images`
      },
      modules: [
        `${LandrRootDir}/node_modules`
      ]
    },
    resolveLoader: {
      modules: [`${LandrRootDir}/node_modules`]
    },
    plugins: getPlugins(config, stage)
  }
}
