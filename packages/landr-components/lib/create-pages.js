const path = require('path');
const Promise = require('bluebird');
const slash = require('slash');
const fs = Promise.promisifyAll(require('fs'));

const createPages = ({ graphql, boundActionCreators }, pluginOptions) => {
  const { createPage } = boundActionCreators;

  return fs.readdirAsync(`${__dirname}/../www/pages`).then(files => {
    return files.forEach(file => {
      let pagePath = path.resolve(`${__dirname}/../www/pages/${file}`);

      if (fs.existsSync(`${pluginOptions.cwd}/www/pages/${file}`)) {
        pagePath = path.resolve(`${pluginOptions.cwd}/www/pages/${file}`);
      }

      // todo this doesn't take child folders into account.
      let routeName = path.parse(file).name;
      if (file === 'index.js') {
        routeName = '/';
      }

      createPage({
        path: routeName,
        component: slash(pagePath)
      });
    });
  });
};

module.exports = createPages;
