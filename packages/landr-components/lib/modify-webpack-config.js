const path = require('path');

const modifyWebpackConfig = (gatsby, pluginOpts) => {
  let webpackConfig = gatsby.config;
  const stage = gatsby.stage;

  webpackConfig.merge({
    resolve: {
      modulesDirectories: [
        path.resolve(`${pluginOpts.cwd}/.landr`),
        path.resolve(`${pluginOpts.cwd}/node_modules/landr/node_modules`),
        path.resolve(`${pluginOpts.cwd}`),
        path.resolve(`${__dirname}/../`),
        path.resolve(`${pluginOpts.cwd}/node_modules`),
        path.resolve(`${pluginOpts.cwd}/packages/landr/node_modules`),
        path.resolve(`${pluginOpts.cwd}/packages/landr/node_modules/gatsby/node_modules`)
      ]
    }
  });

  return webpackConfig;
};

module.exports = modifyWebpackConfig;
