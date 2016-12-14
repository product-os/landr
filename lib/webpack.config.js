'use strict'
const glob = require('glob')
const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPrefixPlugin = require('html-webpack-prefix-plugin')
const settings = require('./settings')

module.exports = (opts) => {
  const cwd = process.cwd()
  const entries = _.concat(
    'jquery',
    'font-awesome-sass-loader',
    glob.sync(`${__dirname}/static/scss/*.scss`),
    glob.sync(`${__dirname}/static/js/*.js`), // lander scripts
    glob.sync(`${cwd}/www/js/*.js`) // users scripts
  )

  if (opts.prod === false) {
    const linkPrefix = ''
    entries.push(`webpack-dev-server/client?http://localhost:${opts.port}`)
  } else {
    const linkPrefix = '/lander'
  }

  // config
  return [ {
    entry: entries,
    output: {
      path: settings.buildPath,
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        www: path.join(cwd, '/www'),
        config: `${cwd}/lander.conf.js`
      },
      fallback: [ path.resolve(cwd, "www/templates"), path.resolve(__dirname, "templates"), path.resolve(__dirname, 'templates') ],
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        },

        /*
        Bootstrap 4
        */
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /bootstrap\/js\/src\/.*\.js$/,
          loaders: [
            'imports?jQuery=jquery,Tether=tether',
            'babel?babelrc=true'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.handlebars$/,
          loader: 'handlebars-loader',
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
    plugins: [
      new HtmlWebpackPlugin({
        template: `${__dirname}/entry.js`,
        prefix: opts.prod ? settings.prefix : undefined,
        attrs : {
          'img:src' : true,
        },
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPrefixPlugin(),
      new ExtractTextPlugin('bundle.css'),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Tether: 'tether',
        'window.Tether': 'tether'
      })
    ]
  } ]
}
