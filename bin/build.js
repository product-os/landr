const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const scrutinizer = require('scrutinizer');

const {
  print,
  landrPath,
  runFromTheme,
  isUsingYarn,
  getGithubUrl,
} = require('./utils');

// Fetch the scrutinizer data
const generateConfiguration = async () => {
  if (!process.env.GITHUB_TOKEN) {
    // TODO: fallback to local if there isn't any token
    throw new Error('Please provide a `GITHUB_TOKEN`');
  }

  const githubUrl = getGithubUrl();
  // TODO: This should be handled in a nicer manner
  const sshUrl = githubUrl.replace('https://', 'git@') + '.git';

  // TODO: do local search first
  // FEATURE: should have the reference branch as a param/flag
  const results = await scrutinizer.remote(sshUrl, {
    reference: 'master',
    progress: ({ percentage }) =>
      print.info(`Fetching data: ${percentage}% ...`),
  });

  // Persist the website config
  results.githubUrl = githubUrl;
  const body = `module.exports=${JSON.stringify(results)}`;

  fs.writeFileSync(landrPath + '/theme/config.js', body);

  return results;
};

// Install the dependencies that React-Static needs, and build the app
const buildStaticWebsite = async () => {
  runFromTheme();
  const useYarn = isUsingYarn();

  print.info('Removing node_modules');
  shell.rm('-rf', './node_modules');

  print.info('Installing dependencies');
  shell.exec(useYarn ? 'yarn install' : 'npm install');

  print.info('Building');
  shell.exec(useYarn ? 'yarn build' : 'npm run build');
};

module.exports = { generateConfiguration, buildStaticWebsite };
