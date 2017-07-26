#!/usr/bin/env node
const program = require('commander');
const Promise = require('bluebird');
const packageJson = require('../../package.json');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
const { ejectFile, getOpts } = require('../eject');
const ghpages = Promise.promisifyAll(require('gh-pages'));
const repoDir = process.cwd();
const utils = require('./utils');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const gitInfo = require('gitinfo')({
  gitPath: repoDir,
  defaultBranchName: 'master'
});
gitInfo.getConfig();
const defaultHost = 'localhost';

// setup site build dir
const directory = `/tmp/landr/${gitInfo.getUsername()}/${gitInfo.getName()}`;

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
  .action(async command => {
    const develop = require('gatsby/dist/utils/develop');
    try {
      const p = Object.assign(command, { directory });
      await utils.isGitRepo(process.cwd());
      await utils.setupBuildDir(directory);
      await utils.writeConfigFiles(config, repoDir, gitInfo, directory);
      await develop(p);
    } catch (e) {
      utils.handleError(e);
    }
  });

program
  .command('build')
  .description('Build a Gatsby project.')
  .option(
    '--prefix-paths',
    'Build site with link paths prefixed (set prefix in your config).'
  )
  .action(async command => {
    process.env.UV_THREADPOOL_SIZE = 100;
    process.env.NODE_ENV = 'production';
    const build = require('gatsby/dist/utils/build');
    const p = Object.assign(command, { directory });
    try {
      const p = Object.assign(command, { directory });
      await utils.isGitRepo(process.cwd());
      await utils.setupBuildDir(directory);
      await utils.writeConfigFiles(config, repoDir, gitInfo, directory);
      await build(p);
      process.exit();
    } catch (e) {
      utils.handleError(e);
    }
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
    const serve = require('gatsby/dist/utils/serve');
    const p = Object.assign(command, { directory });
    serve(p);
  });

program
  .command('deploy')
  .description('Deploy built site to gh-pages')
  .option(
    '--prefix-paths',
    'Build site with link paths prefixed (set prefix in your config).'
  )
  .action(async command => {
    process.env.NODE_ENV = 'production';
    const build = require('gatsby/dist/utils/build');
    const p = Object.assign(command, { directory });
    try {
      const p = Object.assign(command, { directory });
      await utils.isGitRepo(process.cwd());
      await utils.setupBuildDir(directory);
      await utils.writeConfigFiles(config, repoDir, gitInfo, directory);
      await build(p);
      await ghpages.publishAsync(`${directory}/public`, {
        message: 'Deployed by landr 🏠',
        branch: 'gh-pages',
        repo: gitInfo.getGithubUrl()
      });
      process.exit();
    } catch (e) {
      utils.handleError(e);
    }
  });

program
  .command('eject')
  .description('Eject a page, component or global styles')
  .action(async command => {
    const choices = ['page', 'style', 'component', 'layout'];

    const { ejectType } = await inquirer.prompt({
      type: 'list',
      name: 'ejectType',
      message: 'What would you like to eject?',
      choices: choices
    });

    const opts = await getOpts(ejectType);

    const { file } = await inquirer.prompt({
      type: 'list',
      name: 'file',
      message: `Select a ${ejectType}`,
      choices: opts
    });

    await ejectFile(repoDir, ejectType, file);
  });

program.on('--help', () => {
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
  utils.handleError(err);
});
