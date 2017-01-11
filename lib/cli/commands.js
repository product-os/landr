/*
 * Copyright 2016 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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
* @module Versionist.CLI.commands
**/

const landr = require('../landr');
const Promise = require('bluebird');
const ghpages = Promise.promisifyAll(require('gh-pages'));
const fs = Promise.promisifyAll(require('fs-extra'));
const chalk = require('chalk');

/**
* @summary Promise chain for compiling + serving website
* @function
* @public
*
* @param {Object} argv - arguments from the cli
* @returns {Promise} - Empty resolve
*
* @throws If try catch breaks the chain.
*
* @example
* lander.dev({ port: 3000, silent: true}).then(() => {
*   console.log('Your website is served');
* });
*/

exports.dev = (argv) => {
  return landr.getCompiler(argv)
  .then((compiler) => {
    console.log(chalk.yellow('compiling...'));
    return landr.serve(argv, compiler);
  })
  .then((server) => {
    console.log(chalk.green('Successfully compiled'));
    console.log(chalk.green(`You just got served on: ${argv.port}`));
    return server;
  });
};

/**
* @summary Promise chain for compiling + deploying website
* @function
* @public
*
* @param {Object} argv - arguments from the cli
* @param {Object} compiler - webpack compiler
* @returns {Promise} - Empty resolve
*
* @throws If try catch breaks the chain.
*
* @example
* lander.deploy({ port: 3000, silent: true}, compiler).then(() => {
*   console.log('Your website is deployed');
* });
*/

exports.deploy = (argv) => {
  // always compile for prod
  argv.prod = true;

  return Promise.all([
    fs.ensureDirAsync(argv.buildDir),

    // remove cached files, gh-pages throws if other files are found
    fs.removeAsync(`${__dirname}/../node_modules/gh-pages/.cache`)
  ])
  .then(() => {
    return landr.getCompiler(argv);
  })
  .then((compiler) => {
    console.log(chalk.yellow('compiling...'));
    return compiler.run();
  }).then(() => {
    console.log(chalk.green('Successfully compiled'));
    console.log(chalk.yellow('Deploying...'));
    return ghpages.publishAsync(argv.buildDir);
  })
  .then(() => {
    console.log(chalk.green('Successfully deployed'));
  });
};
