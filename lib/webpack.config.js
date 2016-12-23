'use strict';
const glob = require('glob');
const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPrefixPlugin = require('html-webpack-prefix-plugin');

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
      template: `${cwd}/lander.conf.js`,
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
        config: `${cwd}/lander.conf.js`
      },
      root: [ path.resolve(cwd, 'www/templates'), path.resolve(__dirname, 'templates'), path.resolve(__dirname, 'templates') ]
    },
    sassLoaderConfig: {
      includePaths: [ path.resolve(cwd, './www/scss') ]
    },
    resolveLoader: {
      // tell webpack where to look for loaders
      root: [
        path.resolve(cwd, 'www', 'loaders'),
        path.resolve(__dirname, 'loaders'),
        path.resolve(__dirname, 'node_modules')
      ]
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
