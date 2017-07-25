const path = require('path');
const Promise = require('bluebird');
const slash = require('slash');
const fs = Promise.promisifyAll(require('fs'));

const createLayouts = ({ graphql, boundActionCreators }, pluginOptions) => {
  const { createLayout } = boundActionCreators;

  return fs.readdirAsync(`${__dirname}/../www/layouts`).then(files => {
    return files.forEach(file => {
      let pagePath = path.resolve(`${__dirname}/../www/layouts/${file}`);

      if (fs.existsSync(`${pluginOptions.repoDir}/www/layouts/${file}`)) {
        pagePath = path.resolve(`${pluginOptions.repoDir}/www/layouts/${file}`);
      }

      createLayout({
        id: path.parse(file).name,
        component: slash(pagePath)
      });
    });
  });
};

module.exports = createLayouts;
