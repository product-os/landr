const fs = require('fs-extra');

exports.changeCWD = (directory) => {
  try {
    return process.chdir(directory);
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
}

exports.isGitRepo = dirPath => {
  if (!fs.exists(`${dirPath}/.git`)) {
    throw new Error('This is not a .git repo');
  }
  return Promise.resolve();
};

exports.handleError = err => {
  console.error('Oops, something when wrong :(', err);
  process.exit(1)
};

exports.writeConfigFiles = (config, repoDir, gitInfo) => {
  return Object.keys(config).map(file => {
    return fs.outputFile(
      `${__dirname}/../../${file}`,
      config[file](repoDir, gitInfo)
    );
  });
};
