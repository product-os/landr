const path = require('path');

const modifyWebpackConfig = (gatsby, pluginOpts) => {
  let webpackConfig = gatsby.config;
  const stage = gatsby.stage;

  webpackConfig.merge({
    resolve: {
      modulesDirectories: [
        path.resolve(`${pluginOpts.userDir}`),
        path.resolve(`${__dirname}/../`),
        path.resolve(`${pluginOpts.userDir}/node_modules`),
        path.resolve(`${__dirname}/../node_modules`)
      ]
    }
  });

  return webpackConfig;
};

module.exports = modifyWebpackConfig;
