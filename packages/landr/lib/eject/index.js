const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');

const resinComponentsDir = path.resolve(
  `${__dirname}/../../node_modules/gatsby-plugin-landr/`
);

const ejectFile = (userDirectory, type, file) => {
  return fs
    .copy(
      `${resinComponentsDir}/www/${type}/${file}`,
      `${userDirectory}/www/${type}/${file}`
    )
    .then(() => console.log('success!'));
};

const getOpts = type => {
  return fs.readdir(`${resinComponentsDir}/www/${type}`);
};

module.exports = {
  ejectFile: ejectFile,
  getOpts: getOpts
};
