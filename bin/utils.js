const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const gitInfo = require('gitinfo');

const { log } = console;
const rootPath = process.cwd();
const landrPath = path.resolve(__dirname, '..');

const runFromLandr = () => shell.cd(landrPath);
const runFromTheme = () => shell.cd(path.resolve(landrPath, 'theme'));
const isUsingYarn = () => !!shell.which('yarn');

const print = {
  info: msg => log(chalk.blue(msg)),
  danger: msg => log(chalk.red(msg)),
  warning: msg => log(chalk.yellow(msg)),
  success: msg => log(chalk.green(msg)),
};

const getGithubUrl = () => {
  const ghHelper = gitInfo({
    defaultBranchName: 'master',
    gitPath: path.resolve(rootPath, '.git'),
  });

  return ghHelper.getGithubUrl();
};

module.exports = {
  landrPath,
  runFromLandr,
  runFromTheme,
  isUsingYarn,
  getGithubUrl,
  print,
};
