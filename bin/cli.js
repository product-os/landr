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
 * @module Lander.CLI
 */

const yargs = require('yargs');
const chalk = require('chalk');
const lander = require('../lib/lander');
const packageJSON = require('../package.json');
const ghpages = require('gh-pages');
const settings = require('../lib/settings');

const showErrorAndQuit = (error) => {
  console.error(chalk.red(error.message));
  console.error(chalk.red(error.stack));
  console.error('Join our Gitter channel if you need any help!');
  console.error('  https://gitter.im/resin-io/lander');
  process.exit(1);
};

const dev = (argv) => {
  console.log('compiling...');
  lander.compile(argv)
  .then((compiler) => {
    console.log(chalk.green('Compile successful'));
    return lander.serve(compiler, argv);
  })
  .then(() => {
    console.log(chalk.green(`Serving on port ${argv.port}`));
  })
  .catch((err) => {
    return showErrorAndQuit(err);
  });
};

const deploy = (argv) => {
  // always compile for prod
  console.log('Deploying...');
  argv.prod = true;
  lander.compile(argv)
  .then(() => {
    console.log(chalk.green('Compile successful'));
    ghpages.publish(settings.buildPath, (err) => {
      if (err) {
        throw err;
      }
      console.log(chalk.green('Successfully deployed'));
    });
  })
  .catch((err) => {
    return showErrorAndQuit(err);
  });
};

yargs
  .command('dev', 'Compiles + serves lander', {
    port: {
      default: 3000,
      type: 'integer',
      describe: 'Set webpack server port',
      alias: 'p'
    }
  }, dev)
  .command('deploy', 'Pushes compiled assets to gh-pages branch on remote', {}, deploy)
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
      default: false,
      boolean: true,
      describe: 'Flag for production compile',
      global: true
    }
  })
  .fail((err) => {
    // Prints to `stderr` by default
    console.error(err);
    yargs.showHelp();
    process.exit(1);
  })
  .argv;

process.on('uncaughtException', showErrorAndQuit);
