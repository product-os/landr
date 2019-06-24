const shell = require('shelljs');
const { isUsingYarn, runFromTheme, print } = require('./utils');

const preview = () => {
  runFromTheme(); // move to the directory of React Static

  print.info('Starting a Landr preview');
  shell.exec(isUsingYarn() ? 'yarn serve' : 'npm run serve');
};

module.exports = preview;
