#!/usr/bin/env node

/*
 * Copyright 2016 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specic language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @module landr
 */

const Promise = require('bluebird');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const webpackConfigGenerator = require('./webpack.config.js');

/**
 * @summary Runs webpack and returns the compiler
 * @function
 * @public
 *
 * @param {Object} argv - arguments from the cli
 * @returns {Promise} - Resolves to Webpack compiler
 *
 * @example
 *lander.getCompiler({ port: 3000, silent: true}).then((compiler) => {
    do stuff with compiler
  });
 */

module.exports.getCompiler = (argv) => {
  console.log(chalk.yellow('compiling...'));
  const webpackConfig = webpackConfigGenerator(argv);
  const compiler = webpack(webpackConfig);
  return new Promise((resolve) => {
    resolve(compiler);
  });
};

/**
* @summary Runs WebpackDevServer for supplied compiler
* @function
* @public
*
* @param {Object} argv - arguments from the cli
* @param {Object} compiler - A webpack compiler
* @returns {Promise} - Empty resolve
*
* @throws Throws if the server.listenAsync() fails.
*
* @example
* lander.serve({ port: 3000, silent: true}, compiler).then(() => {
*   console.log('You compiled source is served.');
* });
*/

module.exports.serve = (argv, compiler) => {
  const server = new WebpackDevServer(compiler, {
    quiet: argv.quiet,
    stats: {
      colors: true
    },
    inline: true,
    noInfo: false,
    contentBase: argv.buildDir,
    compress: true
  });

  // promisify All methods here because server.listen didn't work
  Promise.promisifyAll(server);

  return server.listenAsync(argv.port, 'localhost');
};
