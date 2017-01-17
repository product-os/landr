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
const webpackConfigGenerator = require('./webpack.config.js');

/**
 * @summary Runs webpack and returns the compiler
 * @function
 * @public
 *
 * @param {Object} argv - Arguments from the cli
 * @returns {Promise} - Resolves to Webpack compiler
 *
 * @example
 *lander.getCompiler({ port: 3000, silent: true}).then((compiler) => {
    do stuff with compiler
  });
 */

exports.getCompiler = (argv) => {
  return new Promise((resolve, reject) => {
    if (!argv) {
      reject('No argv set');
    }
    const webpackConfig = webpackConfigGenerator(argv);
    const compiler = webpack(webpackConfig);
    compiler.run = Promise.promisify(compiler.run);
    resolve(compiler);
  });
};

/**
* @summary Runs WebpackDevServer for supplied compiler
* @function
* @public
*
* @param {Object} argv - Arguments from the cli
* @param {Object} compiler - A webpack compiler
* @returns {Promise} - Resolves to webpack server
*
* @throws Throws if the server.listen() fails.
*
* @example
* lander.serve({ port: 3000, silent: true}, compiler).then(() => {
*   console.log('You compiled source is served.');
* });
*/

exports.serve = (argv, compiler) => {
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

  server.listen = Promise.promisify(server.listen);
  return server.listen(argv.port, 'localhost').then(() => {
    return server;
  });
};
