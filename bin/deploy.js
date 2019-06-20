const ghPages = require('gh-pages');

const { print, runFromTheme, getGithubUrl } = require('./utils');

const deploy = async () => {
  runFromTheme(); // move to the directory of React Static
  const githubUrl = getGithubUrl();

  await ghPages.publish('dist', {
    message: 'Deployed by landr 🏠',
    branch: 'gh-pages',
    repo: githubUrl,
  });

  print.success('Website successfully build and deployed 🏠');
};

module.exports = deploy;
