/* eslint-disable */
const glob = require('glob')
const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let cwd = process.cwd()
let entries = _.concat(
  'jquery',
  glob.sync(`${__dirname}/static/scss/*.scss`),
  glob.sync(`${__dirname}/static/js/*.js`), // lander scripts
  glob.sync(`${cwd}/.lander/js/*.js`) // users scripts
)

module.exports = [{
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
  resolve: {
    alias: {
      'lander': path.join(__dirname, 'templates'),
      'landerCustom': path.join(cwd, '/.lander/templates'),
      'config': `${cwd}/lander.conf.js`
    }
  },
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
      },
      {
        test: /\.handlebars$/,
        loader: `handlebars-loader`,
        query: {
          partialDirs: [
              path.join(__dirname, 'templates', 'partials')
          ],
          helperDirs: [
              path.join(__dirname, 'templates', 'helpers')
          ]
        }
      }
    ]
  },
  devServer: {
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/entry.js`
    }),
    new ExtractTextPlugin(`bundle.css`),
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'Tether': 'tether',
      'window.Tether': 'tether'
    }),
  ],
}]
