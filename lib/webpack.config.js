#!/usr/bin/env node
'use strict';

const glob = require('glob');
const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin = require('html-webpack-prefix-plugin');

/**
* @summary Returns a webpack configuration object
* @function
* @public
*
* @param {Object} argv - arguments from the cli
* @returns {Object} - Webpack configuration object
*
* @example
* const webpackConfig = require('./webpack.config.js')(argv);
*/

module.exports = (argv) => {
  const cwd = process.cwd();

  const entries = _.concat(
    'jquery',
    'font-awesome-sass-loader',
    glob.sync(`${__dirname}/static/scss/*.scss`),
    glob.sync(`${__dirname}/static/js/*.js`),
    glob.sync(`${cwd}/www/js/*.js`)
  );

  const plugins = [
    new HtmlWebpackPlugin({
      template: `${cwd}/landr.conf.js`,
      prefix: argv.prefix,
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
  ];

  if (!argv.prod) {
    entries.push(`webpack-dev-server/client?http://0.0.0.0:${argv.port}`);
  }

  // config
  return [ {
    entry: entries,
    output: {
      path: argv.buildDir,
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        www: path.join(cwd, '/www'),
        scripts: path.resolve(__dirname, 'templates', 'scripts'),
        config: `${cwd}/landr.conf.js`
      },
      root: [
        path.resolve(cwd, 'www/templates'),
        path.resolve(cwd, 'node_modules'),
        path.resolve(__dirname, 'templates'),
        path.resolve(__dirname, 'templates'),
        path.resolve(__dirname, '../node_modules')
      ],
      extensions: [ '', '.js', '.handlebars' ]
    },
    sassLoaderConfig: {
      includePaths: [ path.resolve(cwd, './www/scss') ]
    },
    resolveLoader: {
      root: [
        path.resolve(cwd, 'www', 'loaders'),
        path.resolve(cwd, 'node_modules'),
        path.resolve(__dirname, 'loaders'),
        path.resolve(__dirname, '../node_modules')
      ],
      packageMains: [ 'webpackLoader', 'webLoader', 'loader', 'main' ]
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass?config=sassLoaderConfig')
        },
        {
          loader: 'readme',
          test: /readme.md$/
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
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
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
    plugins: plugins
  } ];
};
