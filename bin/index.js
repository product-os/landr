#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const scrutinizer = require('scrutinizer');
const gitInfo = require('gitinfo');
const ghPages = require('gh-pages');

const { log } = console;
const rootPath = process.cwd();
const landrPath = path.resolve(__dirname, '..');

// Get the git repo metadata
const ghHelper = gitInfo({
  defaultBranchName: 'master',
  gitPath: path.resolve(rootPath, '.git'),
});

const githubUrl = ghHelper.getGithubUrl();
const sshUrl = githubUrl.replace('https://', 'git@') + '.git';

// Fetch the scrutinizer data
const generateConfiguration = async () => {
  // TODO: do local search first
  const results = await scrutinizer.remote(sshUrl, {
    reference: 'master',
    progress: state =>
      log(chalk.blue(`Fetching data: ${state.percentage}% ...`)),
  });

  // Persist the website config
  results.githubUrl = githubUrl;
  const body = `module.exports=${JSON.stringify(results)}`;

  fs.writeFileSync(landrPath + '/theme/config.js', body);
};

// Install the dependencies that React-Static needs, and build the app
const buildFiles = async () => {
  await shell.cd('theme');

  log(chalk.yellow('Removing node_modules'));
  await shell.rm('-rf', './node_modules');

  let useYarn = !!shell.which('yarn');

  if (useYarn) {
    log(chalk.blue('Installing dependencies'));
    await shell.exec('yarn install');

    log(chalk.blue('Building'));
    await shell.exec('yarn build');
  } else {
    log(chalk.blue('Installing dependencies'));
    await shell.exec('npm install');

    log(chalk.blue('Building'));
    await shell.exec('npm run build');
  }
};

const deploy = async () => {
  await ghPages.publish('dist', {
    message: 'Deployed by landr 🏠',
    branch: 'gh-pages',
    repo: githubUrl,
  });
};

const run = async () => {
  if (!process.env.GITHUB_TOKEN) {
    // TODO: fallback to local if there isn't any token
    log(chalk.red('Please provide a `GITHUB_TOKEN`'));
    return;
  }

  // Verify that all the shell commands are called relatively to the Landr directory
  if (rootPath !== landrPath) {
    shell.cd(landrPath);
  }

  try {
    await generateConfiguration();
    await buildFiles();
    await deploy();
    log(chalk.green('Website successfully build and deployed 🏠`'));
  } catch (e) {
    log(chalk.red(e));
  }
};

run();
