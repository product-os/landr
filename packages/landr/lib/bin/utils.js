const fs = require('fs-extra');
const path = require('path');

exports.changeCWD = directory => {
  try {
    return process.chdir(directory);
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
};

exports.isGitRepo = dirPath => {
  if (!fs.exists(`${dirPath}/.git`)) {
    Promise.reject(Error('This is not a .git repo'));
  }
  return Promise.resolve();
};

exports.handleError = err => {
  console.error('Oops, something went wrong :(', err);
  process.exit(1);
};

exports.writeConfigFiles = (config, repoDir, gitInfo, dest) => {
  return Promise.all[
    Object.keys(config).map(file => {
      return fs.outputFile(
        `${dest}/${file}`,
        config[file](repoDir, path.resolve(`${__dirname}/../../`), gitInfo)
      );
    })
  ];
};

exports.setupBuildDir = directory => {
  return fs
    .ensureDir(directory)
    .then(() => fs.ensureDir(`${directory}/node_modules`))
    .then(() => exports.changeCWD(directory))
}
