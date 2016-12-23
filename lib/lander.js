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
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @module Lander
 */

const Promise = require('bluebird');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports.compile = (argv) => {
  const webpackConfig = require('./webpack.config.js')(argv);
  const compiler = webpack(webpackConfig);
  return new Promise(function(resolve, reject) {
    compiler.run(function(err) {
      if (err) {
        reject(err);
      }
      resolve(compiler);
    });
  });
};

module.exports.serve = (argv, compiler) => {
  return new Promise(function(resolve) {
    const server = new WebpackDevServer(compiler, {
      quiet: false,
      stats: {
        colors: true
      },
      inline: true,
      noInfo: false,
      contentBase: argv.buildDir,
      compress: true
    });
    server.listen(argv.port, 'localhost', function() {
      resolve();
    });
  });
};
