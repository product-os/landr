const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');

const resinComponentsDir = path.resolve(
  `${__dirname}/../../node_modules/gatsby-plugin-landr/`
);

const ejectFile = (userDirectory, type, file) => {
  return fs
    .copy(
      `${resinComponentsDir}/www/${type}s/${file}`,
      `${userDirectory}/www/${type}s/${file}`
    )
    .then(() => console.log('success!'));
};

const getOpts = type => {
  return fs.readdir(`${resinComponentsDir}/www/${type}s`);
};

module.exports = {
  ejectFile: ejectFile,
  getOpts: getOpts
};
