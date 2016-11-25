/* eslint-disable */
/* eslint-disable */
const glob = require('glob')
const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');

module.exports = (config) => {
  let cwd = process.cwd()
  let entries = _.concat(
    'jquery',
    glob.sync(`${__dirname}/static/scss/*.scss`),
    glob.sync(`${__dirname}/static/js/*.js`), // lander scripts
    glob.sync(`${cwd}/.lander/js/*.js`) // users scripts
  )
  return {
    entry: entries,
    output: {
        path: `${cwd}/.lander`,
        filename: 'bundle.js'
    },
    resolveLoader: {
      // tell webpack where to look for loaders
      root: [
        path.resolve(__dirname, '../loaders'),
        path.resolve(__dirname, '../node_modules')
      ]
    },
    postcss: [autoprefixer],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style", "css!sass")
        },
        // Bootstrap 4
        {
          test: /bootstrap\/js\/src\/.*\.js$/,
          loaders: [
            'imports?jQuery=jquery,Tether=tether',
            'babel?babelrc=true',
          ],
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(`bundle.css`),
      new webpack.ProvidePlugin({
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'Tether': 'tether',
        'window.Tether': 'tether'
      }),
    ],
  }
}
