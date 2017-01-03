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
 * @module landr.CLI
 */

const yargs = require('yargs');
const packageJSON = require('../package.json');
const commands = require('../lib/cli/commands');
const helpers = require('../lib/cli/helpers');

yargs
  .command('dev', 'Compiles + serves landr', {
    port: {
      describe: 'Set webpack server port',
      default: 3000,
      type: 'integer',
      alias: 'p'
    }
  }, (argv) => {
    commands.dev(argv).catch(helpers.showErrorAndQuit);
  })
  .command('deploy', 'Pushes compiled assets to gh-pages branch on remote', {
    prefix: {
      describe: 'Prefixes all links with supplied string',
      type: 'string',
      defualt: null
    }
  }, (argv) => {
    commands.deploy(argv).catch(helpers.showErrorAndQuit);
  })
  .usage('Usage: $0 [OPTIONS]')
  .help()
  .version(packageJSON.version)
  .options({
    help: {
      describe: 'show help',
      boolean: true,
      alias: 'h'
    },
    version: {
      describe: 'show version number',
      boolean: true,
      alias: 'v'
    },
    prod: {
      describe: 'Flag for production compile',
      default: false,
      boolean: true,
      global: true
    },
    quiet: {
      describe: 'Flag for displaying compile logs',
      default: true,
      boolean: true,
      global: true,
      alias: 'q'
    },
    buildDir: {
      describe: 'Webpack output path',
      type: 'string',
      default: `/tmp/${packageJSON.name}/build`,
      global: true
    }
  })
  .fail((err) => {
    // Prints to `stderr` by default
    helpers.showErrorAndQuit(err);
  })
  .argv;

process.on('uncaughtException', helpers.showErrorAndQuit);
process.on('unhandledRejection', helpers.showErrorAndQuit);
