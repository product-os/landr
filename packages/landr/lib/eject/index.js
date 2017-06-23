const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');

const resinComponentsDir = path.resolve(
  `${__dirname}/../../node_modules/landr-components/`
);

const ejectFile = (userDirectory, file, type) => {
  return fs
    .copy(
      `${resinComponentsDir}/www/${type.name}/${file}.${type.ext}`,
      `${userDirectory}/www/${type.name}/${file}.${type.ext}`
    )
    .then(() => console.log('success!'));
};

module.exports = {
  page: (userDirectory, file) => {
    return ejectFile(userDirectory, file, {
      name: 'pages',
      ext: 'js'
    });
  },
  component: (userDirectory, file) => {
    return ejectFile(userDirectory, file, {
      name: 'components',
      ext: 'js'
    });
  },
  style: userDirectory => {
    return ejectFile(userDirectory, 'index', {
      name: 'styles',
      ext: 'scss'
    });
  }
};
