#!/usr/bin/env node
const program = require('commander');
const Promise = require('bluebird');
const packageJson = require('../../package.json');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
const eject = require('../eject');
const ghpages = Promise.promisifyAll(require('gh-pages'));
const repoDir = process.cwd();
const utils = require('./utils');
const gitInfo = require('gitinfo')({
  gitPath: repoDir
})
gitInfo.getConfig();
const defaultHost = 'localhost';
const directory = path.resolve(`${__dirname}/../../`);
utils.changeCWD(directory);
program.version(packageJson.version).usage('[command] [options]');

program
  .command('develop')
  .description(
    'Start development server. Watches files and rebuilds and hot reloads ' +
      'if something changes'
  )
  .option(
    '-H, --host <url>',
    `Set host. Defaults to ${defaultHost}`,
    defaultHost
  )
  .option('-p, --port <port>', 'Set port. Defaults to 8000', '8000')
  .option('-o, --open', 'Open the site in your browser for you.')
  .action(command => {
    const develop = require('gatsby/dist/utils/develop');
    const p = Object.assign(command, { directory });
    Promise.each([
      utils.isGitRepo(),
      Promise.all(utils.writeConfigFiles(config, repoDir, gitInfo)),
      develop(p)
    ], () => {})
    .catch(utils.handleError);
  });

program
  .command('build')
  .description('Build a Gatsby project.')
  .option(
    '--prefix-paths',
    'Build site with link paths prefixed (set prefix in your config).'
  )
  .action(command => {
    process.env.NODE_ENV = 'production';
    const build = require('gatsby/dist/utils/build');
    const p = Object.assign(command, { directory });
    Promise.each([
      utils.isGitRepo(),
      Promise.all(utils.writeConfigFiles(config, repoDir, gitInfo)),
      build(p),
    ], () => {})
    .then(() => {
      process.exit()
    })
    .catch(utils.handleError);
  });

program
  .command('serve')
  .description('Serve built site.')
  .option(
    '-H, --host <url>',
    `Set host. Defaults to ${defaultHost}`,
    defaultHost
  )
  .option('-p, --port <port>', 'Set port. Defaults to 9000', '9000')
  .option('-o, --open', 'Open the site in your browser for you.')
  .action(command => {
    utils.changeCWD(directory)
    const serve = require('gatsby/dist/utils/serve');
    const p = Object.assign(command, { directory });
    serve(p)
  });

program
  .command('deploy')
  .description('Deploy built site to gh-pages')
  .option(
    '--prefix-paths',
    'Build site with link paths prefixed (set prefix in your config).'
  )
  .action(command => {
    process.env.NODE_ENV = 'production';
    const build = require('gatsby/dist/utils/build');
    const p = Object.assign(command, { directory });
    Promise.each([
      utils.isGitRepo(),
      Promise.all(utils.writeConfigFiles(config, repoDir, gitInfo)),
      build(p),
      ghpages.publishAsync(`${__dirname}/../../public`),
    ], () => {})
    .then(() => {
      process.exit()
    })
    .catch(utils.handleError);
  });

program
  .command('eject')
  .description('Eject a page, component or global styles')
  .option(
    '-c, --component <name>',
    'Eject a single component. Will write to <rootDir>/www/component/<name>.js'
  )
  .option(
    '-s, --style',
    'Eject a global styles. Will write to <rootDir>/www/styles/index.scss'
  )
  .option(
    '-p, --page <name>',
    'Eject a page. Will write to <rootDir>/www/pages/<name>.js'
  )
  .action(command => {
    let type;
    let name;
    if (command.page) {
      type = 'page';
      name = command.page;
    }

    if (command.style) {
      (type = 'style'), (name = 'index');
    }

    if (command.component) {
      type = 'component';
      name = command.component;
    }

    eject[type](repoDir, name).then(() => {
      console.log('Done!');
    });
  });

program
  .on('--help', () => {
    console.log(
      `To show subcommand help:

      landr [command] -h
      `
    );
  });

// If the user types an unknown sub-command, just display the help.
const subCmd = process.argv.slice(2, 3)[0];
let cmds = _.map(program.commands, '_name');
cmds = cmds.concat([`--version`, `-V`]);

if (!_.includes(cmds, subCmd)) {
  program.help();
} else {
  program.parse(process.argv);
}

process.on('unhandledRejection', err => {
  utils.handleError(err)
});
