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
const chalk = require('chalk');
const landr = require('../lib/landr');
const packageJSON = require('../package.json');
const Promise = require('bluebird');
const ghpages = Promise.promisifyAll(require('gh-pages'));
const fs = Promise.promisifyAll(require('fs-extra'));

const showErrorAndQuit = (error) => {
  console.error(chalk.red(error.message));
  console.error(chalk.red(error.stack));
  console.error('Join our Gitter channel if you need any help!');
  console.error('  https://gitter.im/resin-io/landr');
  process.exit(1);
};

const dev = (argv) => {
  landr.getCompiler(argv)
  .then((compiler) => {
    return landr.serve(argv, compiler);
  })
  .then(() => {
    console.log(chalk.green('Successfully compiled'));
    console.log(chalk.green(`Successfully serving on port: ${argv.port}`));
  })
  .catch((err) => {
    return showErrorAndQuit(err);
  });
};

const deploy = (argv) => {
  // always compile for prod
  argv.prod = true;
  fs.ensureDir(argv.buildDir);

  landr.getCompiler(argv)
  .then((compiler) => {
    // we have to run the compiler our selves because webpack dev server isn't doing it
    return Promise.promisify(compiler.run)();
  }).then(() => {
    console.log(chalk.green('Successfully compiled'));

    // gh-pages stores a cache we don't want this because it throws errors when deploying multiple repos.
    return fs.removeAsync(`${__dirname}/../node_modules/gh-pages/.cache`);
  })
  .then(() => {
    return ghpages.publishAsync(argv.buildDir);
  })
  .then(() => {
    console.log(chalk.green('Successfully deployed'));
  })
  .catch((err) => {
    return showErrorAndQuit(err);
  });
};

yargs
  .command('dev', 'Compiles + serves landr', {
    port: {
      describe: 'Set webpack server port',
      default: 3000,
      type: 'integer',
      alias: 'p'
    }
  }, dev)
  .command('deploy', 'Pushes compiled assets to gh-pages branch on remote', {
    prefix: {
      describe: 'Prefixes all links with supplied string',
      type: 'string',
      defualt: null
    }
  }, deploy)
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
      describe: 'Prefixes all links with supplied string',
      type: 'string',
      default: `/tmp/${packageJSON.name}/build`,
      global: true
    }
  })
  .fail((err) => {
    // Prints to `stderr` by default
    return showErrorAndQuit(err);
  })
  .argv;

process.on('uncaughtException', showErrorAndQuit);
